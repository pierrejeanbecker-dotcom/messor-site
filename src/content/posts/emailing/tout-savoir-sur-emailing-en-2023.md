---
title: "Emailing et délivrabilité en 2023"
seoTitle: "Tout savoir sur l'emailing et la délivrabilité en 2023"
description: "Comprendre et agir sur la délivrabilité de ses mailings. Renaud Garelli, ingénieur délivrabilité se confie sur les meilleurs pratiques."
lang: "fr"
permalink: "/emailing/tout-savoir-sur-emailing-en-2023"
date: "2023-04-27"
updated: "2023-08-09"
author: "Pierre-Jean BECKER"
category: "emailing"
categories: ["emailing"]
image: "/medias/2023/04/mailinjoy-logo-no-background.png"
excerpt: "Pourquoi certains emails arrivent-ils à destination et d’autres non ? Quels sont les facteurs qui influencent la mise en spam ? Renaud Garelli, ingénieur en délivrabilité, répond à toutes nos questions dans cette…"
---

Pourquoi certains emails arrivent-ils à destination et d’autres non ? Quels sont les facteurs qui influencent la mise en spam ? Renaud Garelli, ingénieur en délivrabilité, répond à toutes nos questions dans cette interview exclusive par Pierre-Jean Becker, fondateur chez Messor !

Messor est une agence proposant des services d’ externalisation commerciale et d’inbound marketing pour les entreprises B2B.

![Infographie : les 5 points clés de l’article « Emailing et délivrabilité en 2023 »](/images/blog/tout-savoir-sur-emailing-en-2023-points-cles.webp)

## Délivrabilité : définition

La délivrabilité d’un courrier électronique ou d’une campagne d’ emailing désigne sa capacité à parvenir à ses destinataires en boîte de réception principale (et non dans les filtres anti spam)

![homme reçoit un mail](/medias/elementor/thumbs/114-q9cg0p26g7z696eri0pdoduw6eeunnzqvpiq7fdjg8.webp)

## Quel est le rôle d’un « ingénieur délivrabilité » ?

Mon métier consiste d’une part à développer des solutions techniques en interne pour optimiser cette délivrabilité, et d’autre part à comprendre les éléments manquants de cette chaine pour mes clients.

« Comment faire en sorte que mes communications par Email soient visibles et donc lues par les contacts de ma base de données ? »

Autant cette question peut sembler étrange pour un particulier qui utilise simplement son adresse personnelle pour échanger avec ses amis, autant celle-ci s’avère cruciale pour une société qui utilise les emails comme outil marketing à part entière pour rester en contact avec ses clients et ses prospects.

![prise de contact avec un prospect](/medias/elementor/thumbs/137-q9cg1th8m3ii4es1y06c5lnppyvmung7d9klubpm0o.webp)

## Comment analyser sa délivrabilité ?

La plupart des métriques que proposent les routeurs Email et qui permettent d’analyser sa délivrabilité sont :

- Le taux de bounce
- Le taux de plaintes
- Le taux d’ouverture
- Le taux de clic
- Le taux de réactivité

Le**taux d’ouverture est un grand classique** qui a longtemps était un élément clé pour déterminer sa délivrabilité, mais depuis quelques temps cet indicateur a perdu une partie de son intérêt et devient souvent une approximation.

Ceci est dû au fait que la méthode utilisée la majorité du temps pour aboutir à ce *tracking* est **basée sur l’affichage d’un pixel invisible.**

**Et ce dernier devient de moins en moins fiable :** mise en cache de l’image par les FAI, blocage des images dans les email, fonctionnalité de « *email privacy* » par Apple qui empêche son utilisation, etc…

Il faut donc **coupler les différents autres métriques, dont principalement le taux de clic** (qui est la métrique d’engagement la plus forte), pour pouvoir juger de la bonne délivrabilité et de l’efficacité de ses Emailings.

Notez également que parfois un taux de plaintes ou de désabonnement peut fortement augmenter d’un coup sans raison logique apparente.

Ceci pouvant indiquer dans certains cas que la campagne a été justement beaucoup plus lue / vue que les précédentes (passage par exemple d’une partie des e mails atterrissant en spam vers la boite de réception), et donc que conjointement à cette plus forte visibilité, un plus grand nombre de personnes se sont désabonnées ou ont cliqué sur « c’est du spam » s’ils n’étaient pas ou plus intéressées.

![](/medias/elementor/thumbs/127-q9cg1eftkqxwyndwdtob1pgc7sxrfhshz74u5wbws8.webp)

## Quels facteurs influent sur la délivrabilité des courriels aujourd’hui ?

La liste ci dessous n’est pas exhaustive, mais si on veut déjà donner les éléments macro il y a :

- **Âge**du domaine émetteur
- **Historique**de délivrabilité du domaine sur les précédents mois / années (si domaine qui existe depuis un moment déjà)
- **Taux de rebond moyen** (contacts invalides présents dans ses listes emails)
- **Taux de plaintes**moyen des courriels lus ( % de personnes cliquant sur « c’est du spam » en ouvrant l’email)
- **Historique de spam** (volontaire ou subit), de *pishing* ou d’autres abus envoyé avec le domaine émetteur
- « **Engagement**» global des emails avec ses **métriques positives** (nombre de personnes qui ouvrent les e mails, cliquent sur un lien, forwardent l’e mail à une personne tierce, mette l’email en favori, etc) et ses **métriques négatives** (nombre de personnes qui font une plainte, qui suppriment l’email sans l’avoir lu, qui se désabonnent, etc)
- **Réputation du routeur ou de l’IP** utilisé pour l’envoi
- **Contenu de l’email :** ratio texte/images, mots clés qui déclenchent des alertes sur les filtres antispam, présence ou non d’un lien de désabonnement, domaines ciblés par les liens cliquables, etc.
- **Présence ou non des *whitelabels***sur le domaine émetteur (SPF / DKIM / DMARC)
- **Vitesse d’envoi des e mails**(tout d’un coup, ou avec lissage progressif sur une journée)

[![65](/medias/elementor/thumbs/65-q9cfybiv6aq2wnv0dhqbvhfy4c4g77k67y5jj8wd6g.webp)](/emailing/protocole-dmarc)

*Accéder à notre article : pourquoi et comment utiliser le protocole DMARC*

## C’est quoi DKIM, DMARC et SPF ?

On parle ici des « ***whitelabels***», qui étaient encore peu utilisés il y a 10 ans en arrière et qui aujourd’hui **sont devenus incontournables :**

D’un point de vue « protection » de la réputation du domaine émetteur, pour éviter que des personnes malintentionnées ne puissent facilement usurper l’identité du domaine et lui causer du tort (comme dans le cas précédemment évoqué au début de notre échange)

Puis d’un point de vue réputation  **:** la mise en place de ces *whitelabels*apporte un bénéfice de délivrabilité car ils permettent de réellement construire la réputation de son propre domaine

[![105](/medias/elementor/thumbs/105-q9cg0a0revel3f0lxu7ckhnio8gz8ic1hn2yizzu7s.webp)](/top-articles/7-raisons-externaliser-prospection-commerciale)

*Accéder à notre article : 6 bonnes raisons d’externaliser sa prospection commerciale*

![Le conseil Messor : Le taux d’ouverture devient de moins en moins fiable : couplez-le aux autres métriques, à commencer par le taux de clic.](/images/blog/tout-savoir-sur-emailing-en-2023-conseil.webp)

## Peut-on configurer seul DKIM, DMARC et SPF ?

 Si techniquement parlant la mise en place des whitelabels est souvent assez simple, il est conseillé de se faire aider par un expert emailing.

En effet le but d’un paramétrage est souvent d’indiquer que l’on veut refuser les courriels qui ne sont pas clairement authentifiés en SPF/DKIM sur son domaine (et donc le protéger), mais cela implique qu’il faut être très rigoureux dans la mise en place en amont !

 Si l’on « oublie » de bien configurer le SPF/DKIM sur une partie des courriels sortants de son domaine (via une automatisation d’un site, ou une automatisation diverse d’outils marketing, etc.), alors tous les courriels envoyés par ces outils seront immédiatement refusés par les domaines de réception tels que Gmail, Hotmail, Yahoo.

Il faut donc être très rigoureux lors d’un « rattrapage » de configuration manquante sur une chaîne email déjà existante, sous peine de risquer de se couper tout seul la main.

![85](/medias/elementor/thumbs/85-q9cfzc6kku49hgdrffks2q6xad3rjelpczlh91e0fs.webp)

## Faut-il ou non passer par une IP dédiée pour envoyer ses mails ?

La plupart des solutions de routage Email proposent à leurs clients la possibilité de passer par une IP dédiée, vantant les mérites de cette solution par rapport aux pool mutualisés.

La réputation de l’IP d’envoi est très importante, car elle détermine une part non négligeable de la « note finale » de l’email, et donc de sa classification en spam / promotion/ inbox.

La plupart des clients passent par les pool d’IP mutualisées de leur routeur Email, et bénéficient donc d’une réputation liée à l’IP qui est la mutualisation des e mails que celle-ci a déjà routé.

Ainsi, si par exemple 1000 clients passent par un pool d’IP mutualisé, alors la réputation globale de ce pool d’IP correspondra à la qualité des emails envoyés par ces 1000 clients.

Certains envoyant des emails à forte valeur ajoutés, d’autres des emails de faible qualité, d’autres encore ayant des *spamtraps*dans leurs listes emails, etc.. **au final la réputation de ces IP sera la somme de la qualité des 1000 clients**(ce qui a pour conséquence que les routeurs rejettent rapidement les clients ayant des bases d’e mails trop sales pour éviter qu’ils ne dégradent la réputation de leur pool d’IP mutualisés).

Il faut noter néanmoins que comme ce pool d’IP enverra des courriels quasiment en permanence, ses IP seront « warmées »,  c’est-à-dire qu’elles seront reconnues comme envoyant de gros volumes d’e-mails sans que cela n’entraîne un quelconque blocage de la part des FAI de réception**.**

Le fait de passer par une IP dédiée plutôt qu’un pool mutualisé permet logiquement de s’affranchir de l’impact négatif des clients à faible réputation, mais parallèlement empêche également de bénéficier de l’impact positif de clients qualitatifs : on ne s’en remet plus qu’à soi-même pour donner la réputation à son adresse IP.

Un aspect souvent oublié et qui pourtant compte beaucoup ici est la quantité d’e mails envoyés et le flux d’ e mails au quotidien **: comme évoqué précédemment une IP a besoin d’être « warmée « , c’est-à-dire d’envoyer des flux constants et progressifs d’e mails chaque jour**,sous peine de voir à la fois sa réputation et sa capacité à délivrer ses e mails fortement diminuée.

Ainsi une IP dédiée n’a de sens que si la société envoie plusieurs centaines de milliers de mails chaque mois (et de manière progressive, pas tout d’un coup puis plus rien après) : en dessous de cette volumétrie la, l’IP ne pourra jamais être réellement warmée et les conséquences en termes de délivrabilité seront moins bonnes au final qu’en passant par les pools mutualisés.

Alors IP dédiée = Graal absolu ? Peut-être, mais dans des contextes spécifiques soigneusement étudiés, qui sont loin d’être la majorité des cas !

![stratégie marketing](/medias/elementor/thumbs/133-q9cg1mwda99hv51m0fby65bhk9s2crq30d07hdzd88.webp)

## Envoyer des mails pour moitié avec pnom@domain et pour l’autre avec p-nom@domain. Est-ce une bonne pratique ?

**T**out d’abord il conviendrait de savoir si le domaine est jeune ou ancien, si l’adresse e mail existe et a déjà envoyé plusieurs push marketing ou non, etc…

**En fonction de ces éléments là on peut déduire si l’envoi d’un grand nombre d’ e mails sur cette adresse unique risque de coincer ou pas particulièrement.**

Si tous les indicateurs sont au vert, il n’y a pas de soucis particulier à envoyer même 100 000 e mails avec la même adresse e mail !

Pour tous les domaines customs (donc outre les domaines publiques type gmail, hotmail, yahoo, etc),**la réputation est principalement liée au domaine parent, et beaucoup moins aux comptes e mails présents dessus.**

Les FAI les plus intelligents tel que Gmail vont dans un premier temps associer la réputation aux comptes e mails, mais vont vite propager les effets négatifs d’un compte à l’ensemble du domaine s’il n’y a pas de métriques d’engagements positifs ailleurs…**ce qui fait que dans la pratique ce type de méthode de « splitage de comptes » ne semble pas apporter de grand intérêt d’un point de vue réputation.**

Il en est de même avec la création de sous-domaines.

![Comment configurer DMARC](/medias/elementor/thumbs/126-q9cg1ck572vcbfgmosv1wpxf117103l1axtv7cep4o.webp)

## Quels sont les grands défis du mailing sur ces prochaines années ?

L’ arrivée massive de l’**IA** dans nos vies (initiée par chatGPT mais qui va s’amplifier rapidement) va révolutionner beaucoup de choses dans notre quotidien.

Ces robots intelligents sont capables de révolutionner notamment la manière dont le marketing est fait, et proposer des modèles encore inconnus.

Est-ce que cela mettra en péril les canaux actuels tels que nous les connaissons ? (sms marketing, réseaux sociaux, emailing, site internet etc) Difficile à dire, mais je pense que nous sommes malgré tout à l’aube de changements assez importants.

Je pense néanmoins que l’ Emailing fait partie des moyens qui subsistera caril est et reste **un canal de choix, peu coûteux et efficace.**

Cependant, il devra continuer à se développer dans ses aspects de protection et de cybersécurité afin de garantir de manière encore plus fiable la protection des marques contre les tentatives de piratage et d’usurpation d’identité de plus en plus nombreuses dans notre monde digitalisé.

![140](/medias/elementor/thumbs/140-q9cg1z49r3q822jv12m3kk8haa3u4u2le1hipzh8zc.webp)

## L’ emailing en 2023 c’est finalement assez facile non ?

Pour ma part je dirais que c’est plutôt « challengeant » au contraire 😉

Je te rejoins néanmoins sur le fait que tout a été mis en place pour que « techniquement parlant» le set-up initial pour envoyer son premier e mail soit simplifié.

On peut facilement réserver un nom de domaine, créer un compte sur un routeur Email du marché (sendinblue, mailjet, etc), et envoyer ses premiers e mails 10 minutes plus tard !

En ce sens oui, c’est bien plus simple qu’il y a 10 ou 15 ans en arrière, car des acteurs de ce métier ont créé **des outils facilement intégrables qui permettent d’envoyer très rapidement ses premiers emails.**

Quand je parle de côté challengeant c’est pour **aller au-delà de ces quelques premiers emails d’essais**, quand on veut développer une activité autour de l’ Emailing et envoyer régulièrement des communications à une base de contacts augmentant avec le temps.

Je dis souvent que tout **nouveau domaine** créé et qui veut envoyer des emails est classé comme **« suspicieux par défaut »**, et ce jusqu’à ce qu’il prouve qu’il respecte les codes de l’ Emailing et montre qu’il est un acteur de qualité.

La proportion élevée de véritables spameurs et de messages indésirables a contraint les FAI à utiliser cette méthode, même si elle pénalise les nouveaux venus qui n’ont pas encore fait leurs preuves.

Ainsi, au-delà des quelques premiers emails envoyés facilement, celui qui connaît les best practices va continuer à grandir en réputation et à profiter pleinement de l’ Emailing sur la durée, et celui qui n’en respecte aucune (ou peu) finira par être rapidement classé comme spammeur et ne sera plus lu par ses contacts.
