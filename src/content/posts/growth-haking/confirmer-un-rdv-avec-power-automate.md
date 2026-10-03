---
title: "Utiliser Power Automate pour lutter contre le no-show Teams"
seoTitle: "Utiliser Power Automate pour lutter contre le no-show Teams"
description: "Vous ne savez pas comment confirmer un rdv avec Power Automate ? Lisez notre article, nous vous montrons étape par étape comment le faire !"
lang: "fr"
permalink: "/growth-haking/confirmer-un-rdv-avec-power-automate"
alternate: "/en/growth-haking-en/power-automate-avoid-no-show-teams"
date: "2023-01-14"
updated: "2023-08-09"
author: "Pierre-Jean BECKER"
category: "growth-haking"
categories: ["growth-haking"]
image: "/medias/2023/01/icons8-microsoft-power-automate-2020-240.png"
excerpt: "💡Comment réduire le nombre de rdvs en visio/ Teams non honorés ? Avec l’essor du télétravail et la généralisation des rdvs en visio, les déplacements commerciaux se sont fortement réduits. Autant de temps gagné ?"
---

## Comment réduire le nombre de rdvs en visio/ Teams non honorés ?

Avec l’essor du télétravail et la généralisation des rdvs en visio, les déplacements commerciaux se sont fortement réduits. Autant de temps gagné ?

Pas tout à fait, car en parallèle le nombre de rdvs non honorés par les prospects ou clients explose…et les minutes passées à attendre en vain vos interlocuteurs s’accumulent.

![👉](https://s.w.org/images/core/emoji/14.0.0/svg/1f449.svg) Avec Microsoft Power Automate, vous pouvez configurer en quelques minutes l’envoi automatique d’un courriel avant (1H ? 1jour.. à vous de décider) certains de vos événements. ![🤩](https://s.w.org/images/core/emoji/14.0.0/svg/1f929.svg)

## Comment faire avec Microsoft Power Automate ?

![](/medias/2023/01/icons8-microsoft-power-automate-2020-240.png)

1. Ouvrir l’application Microsoft Power Automate > Créer > Flux de Cloud Automatisé.
2. Choisir comme déclencheur « ‘Lorsqu’un événement à venir démarre bientôt »
3. Ajouter comme étape une « condition » configurée ainsi :

***« Objet » « commence par » « [taper les premiers caractères des Titre des rdv Teams pour lesquels vous souhaitez configurer une relance] »***

***« Si oui » > « Envoyer un E-mail V2 » A « Participants obligatoires » Objet : « Rappel « Objet » »***

***« Si non »> laisser vide***

## 🎯 et voilà c’est déjà terminé !

Cette utilisation de Power Automate est disponible dans la licence Microsoft Power Automate Free. Contactez votre administrateur, si aucune licence gratuite n’est associée à votre compte utilisateur Microsoft.
