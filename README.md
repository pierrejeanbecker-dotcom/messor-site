# messor-site

Site de Messor (messor.fr), reconstruit **sans WordPress** : du code et du Markdown, transformés en pages HTML statiques par [Astro](https://astro.build), puis envoyés sur l'hébergement OVH par GitHub Actions.

## Modifier le contenu

| Je veux modifier… | Fichier |
|---|---|
| La page d'accueil (FR et EN) | `src/data/home.ts` |
| Une page (offres, expertise, mentions légales…) | `src/content/pages/<adresse>.md` |
| Un article de blog | `src/content/posts/<catégorie>/<article>.md` |
| Le menu, l'adresse, le téléphone, le lien de prise de RDV | `src/data/site.ts` |
| Les catégories du blog | `src/data/categories.ts` |
| Une redirection (ancienne adresse → nouvelle) | `src/data/redirects.json` |
| Les couleurs, polices, mises en page | `src/styles/global.css` |
| Les images | `public/medias/…` (contenu) et `public/images/…` (charte) |

Chaque fichier `.md` commence par un en-tête (`title`, `description`, `permalink`…) suivi du texte en Markdown.
L'adresse publique de la page est son `permalink` : ne la changez pas sans ajouter une redirection.

**Ajouter un article** : copier un fichier de `src/content/posts/`, changer `title`, `permalink`, `date`, `excerpt` et le texte.

## Publier

Chaque `push` sur la branche principale publie automatiquement la **préproduction** :
https://messor.fr/nouveau-site/ (non indexée par Google, à côté de WordPress).

La **production** se lance à la main : onglet *Actions* → *Publier le site* → *Run workflow* → `production`.
Elle est envoyée dans le dossier `site-messor` de l'hébergement.

### Basculer messor.fr sur le nouveau site (une seule fois)

1. Lancer *Publier le site* en `production`.
2. Espace client OVH → Web Cloud → Hébergements → *Multisite* → `messor.fr` (et `www.messor.fr`) → *Modifier* → dossier racine : `site-messor`.
3. Retour arrière possible à tout moment en remettant `www`.

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
