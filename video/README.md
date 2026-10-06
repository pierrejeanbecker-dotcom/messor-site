# Vidéo « Messor — Business Developer as a Service »

Motion design de 75 s (1920 × 1080, 30 i/s), aux couleurs et polices du site.

- `messor-bdaas.html` : la vidéo elle-même (textes, mise en page, minutage). Ouvrir le fichier
  dans un navigateur pour un aperçu en boucle.
- `render.mjs` : rend la vidéo image par image et l'encode en MP4.

Modifier un texte : éditer `messor-bdaas.html`, puis

```sh
node video/render.mjs                     # -> video/messor-business-developer-as-a-service.mp4
```

Le minutage de chaque élément se règle avec `data-in` / `data-out` (en secondes).

## Musique

La bande-son est une composition originale générée par `video/music.py` (synthèse, libre de droits),
calée à 120 BPM sur les changements de scène. `python3 video/music.py` crée `video/music.wav`,
que `render.mjs` ajoute automatiquement à la vidéo.

## Versions pour le site

Le site utilise des versions allégées dans `public/videos/` (composant `src/components/MessorVideo.astro`,
affiché sur l'accueil FR et sur la page « Développement commercial externalisé » via `video: true`).
Après un nouveau rendu, regénérer ces fichiers :

```sh
S=video/messor-business-developer-as-a-service.mp4
ffmpeg -y -i $S -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/messor-business-developer-as-a-service-1080.mp4
ffmpeg -y -i $S -vf scale=1280:720 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/messor-business-developer-as-a-service-720.mp4
```
