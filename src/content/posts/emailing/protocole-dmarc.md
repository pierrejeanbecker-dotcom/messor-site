---
title: "Pourquoi utiliser le protocole DMARC ? Comment le configurer?"
seoTitle: "Pourquoi utiliser le protocole DMARC ? Comment le configurer?"
description: "Vos courriels finissent dans le dossier SPAM ? Vous avez perdu le contrôle de vos mails ? DMARC est la solution. Cliquez pour en savoir plus!"
lang: "fr"
permalink: "/emailing/protocole-dmarc"
alternate: "/en/emailing-en/dmarc-email-en"
date: "2023-02-22"
updated: "2023-08-09"
author: "Pierre-Jean BECKER"
category: "emailing"
categories: ["emailing"]
image: "/medias/2023/02/man-holding-settings-computer-phone-tablet-PhotoRoom.png-PhotoRoom.png"
excerpt: "✉️Vos courriels finissent dans le dossier SPAM ? 💻Vous avez perdu le contrôle de vos mails (au profit de spammeurs/hackeurs) ? Le protocole DMARC est peut-être la réponse à vos questions. Cela tombe bien, on en parle…"
---

**Vous avez perdu le contrôle de vos e mails (au profit de spammeurs/hackeurs) ou ils tombent en SPAM un peu trop souvent à votre goût ?**

![Man holding settings for computer, phone and tablet](/medias/2023/02/man-holding-settings-computer-phone-tablet-PhotoRoom.png-PhotoRoom-300x300.png)

Le protocole DMARC est peut-être la réponse à vos questions. Cela tombe bien, on en parle aujourd’hui !

DMARC est un acronyme pour Domain\_based Message Authentication, Reporting & Conformance.

Il fait partie du fameux triptyque : **SPF / DKIM / DMARC** : ces protocoles de sécurité que vous pouvez configurer via des entrée DNS pour votre domaine.

Vous n’êtes pas sans savoir que les cybercriminels envoient des milliards d’ e mails par jour. Afin de gagner votre confiance, ils peuvent tenter de falsifier l’adresse du champ «  De » d’un courriel. Ce dernier semblera alors provenir de l’organisation ou du domaine usurpé.

C’est là que DMARC intervient.

![Infographie : les 3 points clés de l’article « Pourquoi utiliser le protocole DMARC ? Comment le configurer? »](/images/blog/protocole-dmarc-points-cles.webp)

## DMARC est une méthode d’authentification de courriels standard.

Ce protocole permet aux administrateurs de messagerie de :

- **Définir des politiques** pour indiquer comment les **messages non authentifiés doivent être traités**, par exemple en les bloquant ou en les marquant comme spam. Si vous faites du Mailing, il est donc aujourd’hui recommandé de paramétrer DMARC pour assurer une meilleure délivrabilité.
- **D’empêcher** les **pirates** informatiques **d’usurper l’identité** de leur organisation et de leur domaine.
- **Recevoir des rapports sur les messages** qui tentent de se faire passer pour des messages officiels de l’entreprise alors que ce sont des faux messages.

Vous pouvez vous référer à la **documentation Google** dédiée à DMARC en cliquant [ici](https://support.google.com/a/answer/2466580?hl=fr).

Paramétrer finement et comprendre toutes les fonctionnalités de DMARC est un travail de spécialiste.

[![20945887-ai-1024x683 compressed](/medias/elementor/thumbs/20945887-ai-1024x683-compressed-q46l2lss369qlrvnhk934bxcx8u5atlmhvabjztr34.png)](/emailing/tout-savoir-sur-emailing-en-2023)

*Accéder à notre article sur l’emailing et la délivrabilité*

![Le conseil Messor : Mettre en place DMARC protège votre domaine des usurpations et améliore la délivrabilité de vos campagnes.](/images/blog/protocole-dmarc-conseil.webp)

## Comment auditer sa configuration mail ?

Vous pouvez **auditer gratuitement** et **instantanément** **l’authentification** de vos **mails** via les sites :

- [www.mail-tester.com](http://www.mail-tester.com/)
- [https://mxtoolbox.com](https://mxtoolbox.com/) (Mxtoolbox dmarc)
- <https://dmarcian.com/>

## Comment paramétrer DMARC soi-même ?

Si vous souhaitez **paramétrer vous-même DMARC** a minima, par exemple pour espérer gagner en délivrabilité, voici la démarche à suivre :

1. Connectez-vous dans la zone admin de l’hébergeur de votre messagerie (Google Workspace, Microsoft 365, OVH..)
2. Accédez à la zone liée aux enregistrements DNS
3. Ajoutez un enregistrement TXT avec la valeur suivante : v=DMARC1; p=none;rua=mailto:XXXXX) et remplacez XXXXX par le courriel de l’admin de votre organisation.
