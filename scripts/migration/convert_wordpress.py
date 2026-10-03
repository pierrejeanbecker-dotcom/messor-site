#!/usr/bin/env python3
"""Migration ponctuelle WordPress -> fichiers Markdown du site statique.

Lit l'export de l'API WordPress (scripts/migration/wp-export/*.json) et écrit :
  - src/content/pages/<chemin>.md
  - src/content/posts/<chemin>.md
  - scripts/migration/media-urls.txt (médias à télécharger dans public/medias)

Usage : python3 scripts/migration/convert_wordpress.py
Dépendances : pip install beautifulsoup4 lxml markdownify
"""
import html
import json
import re
from pathlib import Path
from urllib.parse import urlparse, unquote

from bs4 import BeautifulSoup, NavigableString, Tag
from markdownify import MarkdownConverter

ROOT = Path(__file__).resolve().parents[2]
EXPORT = ROOT / "scripts/migration/wp-export"
OUT_PAGES = ROOT / "src/content/pages"
OUT_POSTS = ROOT / "src/content/posts"
SITE = "https://messor.fr"

# Pages reconstruites à la main (nouveau design) ou générées automatiquement.
SKIP_PAGES = {"/", "/en/homepage", "/blog", "/en/blog-en"}

MEDIA = set()
# Anciennes adresses -> nouvelles (src/data/redirects.json, aussi utilisé pour le .htaccess)
REDIRECTS = {k.lower(): v for k, v in json.load(open(ROOT / "src/data/redirects.json")).items()}


# ---------------------------------------------------------------- utilitaires

def norm_url(url):
    """Rend une URL interne relative et remplace les médias WordPress."""
    if not url:
        return url
    url = html.unescape(url.strip())
    if url.startswith("//"):
        url = "https:" + url
    m = re.match(r"^https?://(www\.)?messor\.fr(/.*)?$", url)
    if m:
        path = m.group(2) or "/"
        if path.startswith("/wp-content/uploads/"):
            MEDIA.add(SITE + path.split("?")[0].split("#")[0])
            return "/medias/" + path[len("/wp-content/uploads/"):]
        path = re.sub(r"/+$", "", path) or "/"
        bare, sep, frag = path.partition("#")
        return REDIRECTS.get(bare.lower(), bare) + sep + frag
    return url


def img_src(img):
    for attr in ("data-lazy-src", "data-src", "src"):
        v = img.get(attr)
        if v and not v.startswith("data:"):
            return v
    return ""


def clean_inline(soup):
    """Normalise images, iframes et liens d'un fragment HTML."""
    for img in soup.find_all("img"):
        src = img_src(img)
        if not src:
            img.decompose()
            continue
        alt = img.get("alt", "")
        for a in list(img.attrs):
            del img[a]
        img["src"] = norm_url(src)
        img["alt"] = alt
    for fr in soup.find_all("iframe"):
        src = fr.get("data-src") or fr.get("src") or ""
        if src.startswith("data:"):
            src = fr.get("data-src", "")
        keep = {k: fr.get(k) for k in ("width", "height", "allow", "title") if fr.get(k)}
        for a in list(fr.attrs):
            del fr[a]
        fr["src"] = norm_url(src)
        fr["loading"] = "lazy"
        fr.attrs.update(keep)
    for a in soup.find_all("a"):
        if a.get("href"):
            a["href"] = norm_url(a["href"])
    for s in soup.find_all(["script", "style", "noscript", "svg"]):
        s.decompose()
    return soup


class MD(MarkdownConverter):
    def convert_iframe(self, el, text, *args, **kwargs):
        return "\n\n" + str(el) + "\n\n"

    def convert_table(self, el, text, *args, **kwargs):
        for t in el.find_all(True):
            for a in [a for a in t.attrs if a not in ("href", "colspan", "rowspan")]:
                del t[a]
        return "\n\n" + str(el) + "\n\n"

    def convert_figure(self, el, text, *args, **kwargs):
        return "\n\n" + text.strip() + "\n\n"

    def convert_figcaption(self, el, text, *args, **kwargs):
        return "\n\n*" + text.strip() + "*\n\n" if text.strip() else ""


def to_md(fragment_html):
    soup = clean_inline(BeautifulSoup(fragment_html, "lxml"))
    body = soup.body or soup
    md = MD(heading_style="ATX", bullets="-", strip=["span", "font"]).convert_soup(body)
    md = md.replace(" ", " ")
    md = re.sub(r"[ \t]+\n", "\n", md)
    md = re.sub(r"\n{3,}", "\n\n", md)
    # Pas de gras superflu dans les titres
    md = re.sub(r"^(#{1,6} )(.*)$", lambda m: m.group(1) + m.group(2).replace("**", "").strip(), md, flags=re.M)
    return md.strip()


def text_of(el):
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()


def yaml_str(s):
    return json.dumps(s or "", ensure_ascii=False)


def frontmatter(d):
    lines = ["---"]
    for k, v in d.items():
        if v is None or v == "" or v == [] or v is False:
            continue
        if isinstance(v, bool):
            lines.append(f"{k}: true")
        elif isinstance(v, list):
            lines.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
        elif isinstance(v, dict):
            lines.append(f"{k}:")
            for kk, vv in v.items():
                lines.append(f"  {kk}: {yaml_str(vv)}")
        else:
            lines.append(f"{k}: {yaml_str(v)}")
    lines.append("---")
    return "\n".join(lines)


# ------------------------------------------------------- conversion Elementor

def is_hidden_desktop(el):
    return "elementor-hidden-desktop" in (el.get("class") or [])


def children_elements(el):
    """Éléments Elementor enfants directs (sections, colonnes, conteneurs, widgets)."""
    out = []
    for c in el.find_all(True, recursive=False):
        if c.get("data-element_type"):
            if not is_hidden_desktop(c):
                out.append(c)
        else:
            out.extend(children_elements(c))
    return out


def widget_md(w, ctx):
    wt = w.get("data-widget_type", "")
    name = wt.split(".")[0]
    cont = w.find(class_="elementor-widget-container") or w

    if name in ("divider", "spacer", "icon", "theme-site-logo", "table-of-contents"):
        return ""
    if name == "heading" or name == "animated-headline":
        h = cont.find(re.compile(r"^h[1-6]$"))
        level = int(h.name[1]) if h else 2
        t = text_of(cont)
        if not t:
            return ""
        level = max(2, min(level, 4))
        if ctx.get("in_columns"):
            level = max(level, 3)
        a = cont.find("a")
        if a and a.get("href"):
            return f"{'#' * level} [{t}]({norm_url(a['href'])})"
        return f"{'#' * level} {t}"
    if name == "text-editor":
        return to_md(cont.decode_contents())
    if name == "image":
        img = cont.find("img")
        if not img or not img_src(img):
            return ""
        src = norm_url(img_src(img))
        alt = (img.get("alt") or "").replace("]", "")
        md = f"![{alt}]({src})"
        a = cont.find("a")
        if a and a.get("href"):
            md = f"[{md}]({norm_url(a['href'])})"
        return md
    if name == "button":
        a = cont.find("a")
        t = text_of(cont)
        if not a or not t:
            return ""
        href = norm_url(a.get("href", "#"))
        return f'<p class="btn-row"><a class="btn" href="{html.escape(href)}">{html.escape(t)}</a></p>'
    if name in ("toggle", "accordion", "tabs"):
        items = []
        titles = cont.select(".elementor-tab-title")
        for t in titles:
            if "elementor-tab-mobile-title" in (t.get("class") or []) and name == "tabs":
                continue
            cid = t.get("aria-controls")
            body = cont.find(id=cid) if cid else t.find_next(class_="elementor-tab-content")
            q = text_of(t)
            a = to_md(body.decode_contents()) if body else ""
            items.append((q, a))
        # dédoublonnage (les onglets ont un titre desktop + mobile)
        seen, out = set(), []
        for q, a in items:
            if q in seen:
                continue
            seen.add(q)
            out.append(f"<details>\n<summary>{html.escape(q)}</summary>\n\n{a}\n\n</details>")
        return "\n\n".join(out)
    if name == "icon-list":
        lis = []
        for li in cont.select("li"):
            t = text_of(li)
            a = li.find("a")
            if t:
                lis.append(f"- [{t}]({norm_url(a['href'])})" if a and a.get("href") else f"- {t}")
        return "\n".join(lis)
    if name == "testimonial-carousel":
        out = []
        for sl in cont.select(".swiper-slide"):
            q = sl.select_one(".elementor-testimonial__text")
            n = sl.select_one(".elementor-testimonial__name")
            r = sl.select_one(".elementor-testimonial__title")
            if not q:
                continue
            who = " — ".join(x for x in [text_of(n) if n else "", text_of(r) if r else ""] if x)
            out.append(f"> {text_of(q)}\n>\n> — {who}" if who else f"> {text_of(q)}")
        return "\n\n".join(dict.fromkeys(out))
    if name in ("image-carousel", "gallery"):
        imgs = []
        for img in cont.find_all("img"):
            src = img_src(img)
            if src:
                imgs.append(f'<img src="{html.escape(norm_url(src))}" alt="{html.escape(img.get("alt", ""))}" loading="lazy">')
        imgs = list(dict.fromkeys(imgs))
        return '<div class="logo-grid">\n' + "\n".join(imgs) + "\n</div>" if imgs else ""
    if name == "eael-interactive-circle":
        out = []
        for i, btn in enumerate(cont.select(".eael-circle-btn")):
            t = text_of(btn)
            ctn = cont.select(".eael-circle-btn-content")
            body = to_md(ctn[i].decode_contents()) if i < len(ctn) else ""
            body = re.sub(r"\s*\n+\s*", " ", body)
            out.append(f"- **{t}** — {body}" if body else f"- **{t}**")
        return "\n".join(out)
    if name == "video-playlist":
        try:
            settings = json.loads(w.get("data-settings", "{}"))
        except json.JSONDecodeError:
            settings = {}
        out = []
        for tab in settings.get("tabs", []):
            url = tab.get("youtube_url") or tab.get("vimeo_url") or ""
            m = re.search(r"(?:v=|youtu\.be/)([\w-]{6,})", url)
            if m:
                out.append(f"### {tab.get('title', '')}\n\n"
                           f'<iframe src="https://www.youtube-nocookie.com/embed/{m.group(1)}" '
                           f'title="{html.escape(tab.get("title", ""))}" loading="lazy" '
                           f'allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>')
        return "\n\n".join(out)
    if name == "google_maps":
        fr = cont.find("iframe")
        if fr:
            clean_inline(cont)
            return str(cont.find("iframe"))
        return ""
    if name in ("html", "shortcode"):
        frag = cont.find(class_="elementor-shortcode") or cont
        return to_md(frag.decode_contents())
    if name == "form":
        return ('<p class="btn-row"><a class="btn" href="CONTACT_URL">'
                "CONTACT_LABEL</a></p>")
    if name in ("posts", "eael-post-list"):
        ctx["latestPosts"] = True
        return ""
    if name == "lae-marquee-text":
        t = text_of(cont)
        return f"*{t}*" if t else ""
    # Widget inconnu : on garde le texte brut pour ne rien perdre.
    t = to_md(cont.decode_contents())
    if t:
        print("  widget non géré, texte conservé :", wt)
    return t


def element_md(el, ctx):
    et = el.get("data-element_type")
    if et == "widget":
        return widget_md(el, ctx)
    kids = children_elements(el)
    cols = [k for k in kids if k.get("data-element_type") == "column"]
    if not cols and et == "container":
        inner = [k for k in kids if k.get("data-element_type") == "container"]
        if len(inner) >= 2 and "e-flex" in " ".join(el.get("class") or []) and \
                "e-con-full" not in " ".join(el.get("class") or []):
            cols = inner
    if len(cols) >= 2:
        parts = []
        c2 = dict(ctx, in_columns=True)
        for c in cols:
            md = "\n\n".join(x for x in (element_md(k, c2) for k in children_elements(c)) if x)
            if md.strip():
                parts.append(md)
        ctx["latestPosts"] = ctx.get("latestPosts") or c2.get("latestPosts")
        if len(parts) >= 2:
            n = min(len(parts), 4)
            return f'<div class="cols cols-{n}">\n' + "\n".join(
                f"<div>\n\n{p}\n\n</div>" for p in parts) + "\n</div>"
        return "\n\n".join(parts)
    return "\n\n".join(x for x in (element_md(k, ctx) for k in kids) if x)


BOILERPLATE = re.compile(
    r"^(avez-vous des questions|do you have any questions|have any questions|blog$)", re.I)


def convert_elementor(content_html, lang):
    soup = BeautifulSoup(content_html, "lxml")
    root = soup.select_one(".elementor") or soup.body
    sections = children_elements(root)
    ctx = {}
    hero = {}
    blocks = []
    prevnext = {}
    for i, sec in enumerate(sections):
        heads = [text_of(h) for h in sec.find_all(re.compile(r"^h[1-6]$"))]
        widgets = [w.get("data-widget_type", "") for w in sec.find_all(attrs={"data-widget_type": True})]
        first = heads[0] if heads else ""
        # Navigation « Page précédente / Page suivante »
        btn_texts = [text_of(b) for b in sec.select(".elementor-button")]
        if any(re.match(r"(page précédente|page suivante|previous|next)", t, re.I) for t in btn_texts):
            for a in sec.select("a.elementor-button"):
                t = text_of(a).lower()
                label_el = None
                col = a.find_parent(attrs={"data-element_type": "column"}) or a.find_parent(
                    attrs={"data-element_type": "container"})
                if col:
                    label_el = col.find(re.compile(r"^h[1-6]$"))
                item = {"href": norm_url(a.get("href", "")), "label": text_of(label_el) if label_el else ""}
                if t.startswith(("page précédente", "previous")):
                    prevnext["prev"] = item
                elif t.startswith(("page suivante", "next")):
                    prevnext["next"] = item
            continue
        # Bloc « Contactez-nous » + « Blog » répétés en bas de page : remplacés par le gabarit.
        if BOILERPLATE.match(first):
            if any(w.startswith(("posts.", "eael-post-list")) for w in widgets) or "question" in first.lower():
                if any(w.startswith(("posts.", "eael-post-list")) for w in widgets):
                    ctx["latestPosts"] = True
                continue
        # Première section = en-tête de page (hero)
        if i == 0 and not hero:
            h = sec.find(re.compile(r"^h[1-6]$"))
            if h:
                hero["title"] = text_of(h)
                texts = [to_md(w.find(class_="elementor-widget-container").decode_contents())
                         for w in sec.find_all(attrs={"data-widget_type": "text-editor.default"})
                         if not is_hidden_desktop(w)]
                hero["lead"] = "\n\n".join(t for t in texts if t)
                img = sec.find("img")
                if img and img_src(img):
                    hero["image"] = norm_url(img_src(img))
                    hero["imageAlt"] = img.get("alt", "")
                others = [w for w in sec.find_all(attrs={"data-widget_type": True})
                          if w.get("data-widget_type").split(".")[0] not in
                          ("heading", "text-editor", "image", "button", "divider", "spacer", "icon")]
                extra_heads = sec.find_all(re.compile(r"^h[1-6]$"))[1:]
                if not others and not extra_heads:
                    continue
                # Section d'en-tête riche : on garde le reste dans le corps.
                h.decompose()
                for w in sec.find_all(attrs={"data-widget_type": "text-editor.default"}):
                    w.decompose()
                if hero.get("image"):
                    im = sec.find("img")
                    if im:
                        im.decompose()
        md = element_md(sec, ctx)
        if md.strip():
            blocks.append(md)
    body = "\n\n".join(blocks)
    contact = "/contactez-nous" if lang == "fr" else "/en/contact-us"
    body = body.replace("CONTACT_URL", contact).replace(
        "CONTACT_LABEL", "Contactez-nous" if lang == "fr" else "Contact us")
    body = re.sub(r"\n{3,}", "\n\n", body)
    return hero, body.strip(), prevnext, ctx.get("latestPosts", False)


# ---------------------------------------------------------------- principal

def path_of(link):
    p = urlparse(link).path
    return unquote(p).strip("/")


def lang_of(path):
    return "en" if path == "en" or path.startswith("en/") else "fr"


def excerpt_of(item, limit=220):
    """Extrait en texte brut, coupé proprement sur un mot."""
    txt = BeautifulSoup(item["excerpt"]["rendered"], "lxml").get_text(" ", strip=True)
    txt = re.sub(r"\s+", " ", txt).replace(" [...]", "").replace(" […]", "").strip()
    if len(txt) <= limit:
        return txt
    cut = txt[:limit].rsplit(" ", 1)[0].rstrip(",;:.")
    return cut + "…"


def seo(item):
    y = item.get("yoast_head_json") or {}
    img = (y.get("og_image") or [{}])[0].get("url", "")
    return y.get("title", ""), y.get("description", "") or y.get("og_description", ""), img


def strip_missing_media():
    """Retire les images absentes de public/medias (déjà cassées sur l'ancien site)."""
    medias = ROOT / "public/medias"
    if not medias.exists():
        return

    def exists(src):
        return (medias / unquote(src[len("/medias/"):])).exists()

    for f in list(OUT_PAGES.rglob("*.md")) + list(OUT_POSTS.rglob("*.md")):
        s = f.read_text(encoding="utf-8")
        s2 = re.sub(r"\[?!\[[^\]]*\]\((/medias/[^)]+)\)(?:\]\([^)]*\))?",
                    lambda m: m.group(0) if exists(m.group(1)) else "", s)
        s2 = re.sub(r'<img src="(/medias/[^"]+)"[^>]*>\n?',
                    lambda m: m.group(0) if exists(m.group(1)) else "", s2)
        s2 = re.sub(r'^(heroImage|image): "(/medias/[^"]+)"\n',
                    lambda m: m.group(0) if exists(m.group(2)) else "", s2, flags=re.M)
        if s2 != s:
            f.write_text(re.sub(r"\n{3,}", "\n\n", s2), encoding="utf-8")


def main():
    alternates = json.load(open(EXPORT / "alternates.json"))
    alt_by_path = {}
    for f, m in alternates.items():
        for lang, url in m.items():
            others = {l: path_of(u) for l, u in m.items() if l != lang and l != "x-default"}
            alt_by_path[path_of(url)] = others

    users = {u["id"]: u["name"] for u in json.load(open(EXPORT / "users.json"))}
    cats = {c["id"]: c for c in json.load(open(EXPORT / "categories.json"))}

    for kind, out_dir in (("pages", OUT_PAGES), ("posts", OUT_POSTS)):
        for item in json.load(open(EXPORT / f"{kind}.json")):
            path = path_of(item["link"])
            if "/" + path in SKIP_PAGES or (path == "" and "/" in SKIP_PAGES):
                continue
            lang = lang_of(path)
            title = html.unescape(item["title"]["rendered"])
            seo_title, desc, og_img = seo(item)
            content = item["content"]["rendered"]
            alt = alt_by_path.get(path, {})
            alt_path = next(iter(alt.values()), "") if alt else ""
            fm = {
                "title": title,
                "seoTitle": seo_title,
                "description": desc,
                "lang": lang,
                "permalink": "/" + path,
                "alternate": "/" + alt_path if alt_path else "",
            }
            if kind == "posts":
                cat_ids = [c for c in item.get("categories", []) if c in cats]
                cat = cats[cat_ids[0]]["slug"] if cat_ids else ""
                # La catégorie qui apparaît dans l'URL fait foi.
                seg = path.split("/")
                url_cat = seg[-2] if len(seg) >= 2 else cat
                fm.update({
                    "date": item["date"][:10],
                    "updated": item["modified"][:10],
                    "author": users.get(item["author"], "Messor"),
                    "category": url_cat,
                    "categories": [cats[c]["slug"] for c in cat_ids],
                    # Le logo est l'image de partage par défaut de Yoast : ce n'est pas une illustration.
                    "image": norm_url(og_img) if og_img and "logo-messor" not in og_img else "",
                    "excerpt": excerpt_of(item),
                })
            if 'data-elementor-type' in content or "elementor-widget" in content:
                hero, body, prevnext, latest = convert_elementor(content, lang)
                if kind == "pages":
                    if hero.get("title"):
                        fm["heroTitle"] = hero["title"]
                    fm["heroLead"] = hero.get("lead", "")
                    fm["heroImage"] = hero.get("image", "")
                    fm["heroImageAlt"] = hero.get("imageAlt", "")
                    fm["prev"] = prevnext.get("prev")
                    fm["next"] = prevnext.get("next")
                    fm["latestPosts"] = latest
                else:
                    # Articles Elementor : l'en-tête fait partie du texte.
                    parts = []
                    if hero.get("lead"):
                        parts.append(hero["lead"])
                    if hero.get("image") and hero.get("image") != fm.get("image"):
                        parts.append(f"![{hero.get('imageAlt', '')}]({hero['image']})")
                    parts.append(body)
                    body = "\n\n".join(p for p in parts if p)
            else:
                body = to_md(content)
            dest = out_dir / (path + ".md")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(frontmatter(fm) + "\n\n" + body + "\n", encoding="utf-8")
            print("ok", kind, "/" + path)

    strip_missing_media()
    (ROOT / "scripts/migration/media-urls.txt").write_text("\n".join(sorted(MEDIA)) + "\n")
    print(len(MEDIA), "médias référencés")


if __name__ == "__main__":
    main()
