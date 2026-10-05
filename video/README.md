# Vidéo « Messor — Business Developer as a Service »

Motion design de 60 s (1920 × 1080, 30 i/s), aux couleurs et polices du site.

- `messor-bdaas.html` : la vidéo elle-même (textes, mise en page, minutage). Ouvrir le fichier
  dans un navigateur pour un aperçu en boucle.
- `render.mjs` : rend la vidéo image par image et l'encode en MP4.

Modifier un texte : éditer `messor-bdaas.html`, puis

```sh
node video/render.mjs                     # -> video/messor-business-developer-as-a-service.mp4
```

Le minutage de chaque élément se règle avec `data-in` / `data-out` (en secondes).
