# IRON CLEAN — Site vitrine

Site d'une seule page pour IRON CLEAN, lavage automobile et detailing haut de gamme à Toulouse.
Réalisé en HTML, CSS et JavaScript, sans framework.

## Voir le site
Double-cliquez sur `index.html` : il s'ouvre dans votre navigateur.

## Organisation des fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Structure et textes de la page (toutes les sections) |
| `css/style.css` | Apparence : couleurs, polices, mise en page, version mobile |
| `js/script.js` | Interactions : menu mobile, comparateur avant/après, animations |
| `logo.svg` | Logo officiel |
| `merci.html` | Page de confirmation affichée après l’envoi du formulaire |
| `mentions-legales.html` | Mentions légales (éditeur, hébergeur, propriété intellectuelle) |
| `confidentialite.html` | Politique de confidentialité (RGPD) |
| `images/` | Photos avant/après (`avant-1.jpg`, `apres-1.jpg`…) + icône de l’onglet |

## Formulaire de pré-rendez-vous (Netlify Forms)
Le formulaire `pre-rendez-vous` (section Contact) est détecté automatiquement par Netlify au déploiement.
Les demandes reçues apparaissent dans l’interface Netlify, onglet **Forms**
(vous pouvez y activer une notification par e-mail). Après l’envoi, le visiteur arrive sur `merci.html`.
Une case de consentement (RGPD) est obligatoire avant l’envoi ; elle renvoie vers `confidentialite.html`.
Le formulaire ne fonctionne qu’une fois le site en ligne sur Netlify (pas en ouvrant le fichier en local).

## À personnaliser
- **Tarifs et services** : section `SERVICES ET TARIFS` dans `index.html`.
- **Photos avant/après** : remplacez les fichiers `images/avant-1.jpg`, `apres-1.jpg`, etc.
  (format portrait 3:4 conseillé, environ 900 × 1200 px).
- **Vidéos TikTok** : section `NOS RÉALISATIONS` dans `index.html` (identifiant de la vidéo dans le `src` de l'iframe `https://www.tiktok.com/player/v1/ID` et dans le lien « Voir sur TikTok »).
- **Couleurs** : variables en haut de `css/style.css`.
