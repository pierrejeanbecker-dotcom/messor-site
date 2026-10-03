---
title: "Power Automate to avoid customer no-shows in Teams meetings"
seoTitle: "Power Automate to avoid customer no-shows in Teams meetings"
description: "Not sure how to confirm an appointment with Power Automate? Read our article, we show you step by step how to do it!"
lang: "en"
permalink: "/en/growth-haking-en/power-automate-avoid-no-show-teams"
alternate: "/growth-haking/confirmer-un-rdv-avec-power-automate"
date: "2023-04-18"
updated: "2023-08-09"
author: "Pierre-Jean BECKER"
category: "growth-haking-en"
categories: ["growth-haking-en"]
image: "/medias/2023/01/icons8-microsoft-power-automate-2020-240.png"
excerpt: "💡How can we reduce the number of unmet video/team appointments? With the rise of telecommuting and the generalization of video meetings, commercial travel has been greatly reduced. So much time saved?"
---

## 💡How to reduce the number of unmet video/team meetings?

With the rise of home working and the generalization of video meetings, commercial travel has been greatly reduced. So much time saved?

Not quite, because at the same time the number of appointments not honored by prospects or customers is exploding…and the minutes spent waiting in vain for your contacts are accumulating.

![👉](https://s.w.org/images/core/emoji/14.0.0/svg/1f449.svg) With Microsoft Power Automate, you can configure in a few minutes the automatic sending of an email before (1H? 1day…you decide) some of your events. ![🤩](https://s.w.org/images/core/emoji/14.0.0/svg/1f929.svg)

## How to do it?

![](/medias/2023/01/icons8-microsoft-power-automate-2020-240.png)

1. Open the Microsoft Power Automate application > Create > Automated Cloud Flow.
2. Choose as trigger « ‘When an upcoming event starts soon »
3. Add as a step a « condition » configured as follows:

***« Subject » « begins with » « [type in the first characters of the Teams Meeting Title for which you want to set up a reminder] »***

***« If yes » > « Send an E-mail V2 » To « Required participants » Subject: « Reminder « Subject » »***

***« If no »> leave empty***

## 🎯 and it’s already done!

This use of Power Automate is available in the Microsoft Power Automate Free license. Contact your administrator, if no free license is associated with your Microsoft user account.
