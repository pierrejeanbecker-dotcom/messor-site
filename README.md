# messor-site

Site de Messor (messor.fr), reconstruit **sans WordPress** : du code et du Markdown, transformés en pages HTML statiques par [Astro](https://astro.build), puis envoyés sur l'hébergement OVH par GitHub Actions.

## Modifier le contenu

| Je veux modifier… | Fichier |
|---|---|
| La page d'accueil (FR et EN) | `src/data/home.ts` |
| La page Découvrir Messor (équipe, valeurs, photos, FAQ) | `src/data/about.ts` |
| La page Contact | `src/components/ContactPage.astro` |
| Une page (offres, expertise, mentions légales…) | `src/content/pages/<adresse>.md` |
| Un article de blog | `src/content/posts/<catégorie>/<article>.md` |
| Le menu, l'adresse, le téléphone, le lien de prise de RDV | `src/data/site.ts` |
| Les catégories du blog | `src/data/categories.ts` |
| Une redirection (ancienne adresse → nouvelle) | `src/data/redirects.json` |
| Les couleurs, polices, mises en page | `src/styles/global.css` |
| Les images | `public/medias/…` (contenu) et `public/images/…` (charte) |

Les pages d'offres et d'expertise (`kind:` dans l'en-tête) sont découpées automatiquement à chaque titre `##` :
un titre « Méthodologie » donne des étapes numérotées (un `###` = une étape), « Nos atouts » des cartes,
« FAQ… » un accordéon, et un bloc `<aside class="tip">…</aside>` un encadré « Le conseil Messor ».

Chaque fichier `.md` commence par un en-tête (`title`, `description`, `permalink`…) suivi du texte en Markdown.
L'adresse publique de la page est son `permalink` : ne la changez pas sans ajouter une redirection.

**Ajouter un article** : copier un fichier de `src/content/posts/`, changer `title`, `permalink`, `date`, `excerpt` et le texte.

**Illustrations des articles** : `npm run illustrations` génère pour chaque article deux images aux couleurs Messor
(« Les points clés » à partir des titres `##`, et un « Chiffre clé » ou « Le conseil Messor ») et les insère dans le texte.
Le chiffre ou le conseil de chaque article se choisit dans `scripts/blog-illustrations.json` ; sans choix, il est détecté
automatiquement (à relire). Relançable à volonté : les images existantes sont remplacées.

## Publier

Chaque `push` sur la branche principale **publie directement sur https://messor.fr** (onglet *Actions* → *Publier le site*, relançable à la main avec *Run workflow*).

Fonctionnement chez OVH :
- le site construit est envoyé dans le dossier `www/site-messor` de l'hébergement ;
- `www/.htaccess` (copie de `deploy/www.htaccess`) fait servir ce dossier sur messor.fr ;
- l'ancien WordPress est toujours dans `www`, inactif. Sa configuration d'origine est sauvegardée dans `www/.htaccess-wordpress`.

**Revenir à WordPress en urgence** : dans `www`, remplacer `.htaccess` par le contenu de `.htaccess-wordpress` (FTP ou gestionnaire de fichiers OVH).

Secrets GitHub requis : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (connexion SFTP OVH).

## Travailler en local

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # génère dist/ (+ .htaccess)
npm run check-links  # vérifie les liens internes
```

## Migration depuis WordPress

`scripts/migration/` contient l'export complet de l'ancien site (API WordPress, octobre 2026) et le script
`convert_wordpress.py` qui l'a converti en Markdown. Il n'est plus nécessaire au fonctionnement du site.
Attention : le relancer écrase les fichiers de `src/content/`.
