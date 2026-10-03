# messor-site

Code du site WordPress Messor, hébergé chez OVH (offre Pro, cluster127).

## Ce qui est dans ce dépôt

Uniquement `wp-content/themes`, `wp-content/plugins` et `wp-content/mu-plugins`.

Ne sont **pas** versionnés : le cœur WordPress, `wp-config.php` (mots de passe),
les médias (`wp-content/uploads`) et la base de données (pages, articles, réglages).

## Workflows (onglet Actions)

- **Importer depuis OVH** : récupère les thèmes et extensions du site en ligne et les enregistre ici. Ne modifie rien sur OVH.
- **Déployer vers OVH** : envoie un dossier précis (ex. `wp-content/themes/mon-theme`) vers le serveur. Manuel, en mode simulation par défaut, ne supprime jamais de fichiers.

Secrets requis : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (connexion SFTP, port 22).
