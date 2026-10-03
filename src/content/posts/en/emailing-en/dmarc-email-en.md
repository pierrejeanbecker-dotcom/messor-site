---
title: "Why use DMARC in Email ? How to configure it?"
seoTitle: "Why use DMARC in Email ? How to configure it?"
description: "Your emails end up in the SPAM folder? You have lost control of your emails? DMARC is the solution. Click to learn more!"
lang: "en"
permalink: "/en/emailing-en/dmarc-email-en"
alternate: "/emailing/protocole-dmarc"
date: "2023-04-18"
updated: "2023-08-30"
author: "Pierre-Jean BECKER"
category: "emailing-en"
categories: ["emailing-en", "top-articles-en"]
image: "/medias/2023/02/man-holding-settings-computer-phone-tablet-PhotoRoom.png-PhotoRoom.png"
excerpt: "✉️ Do your emails end up in the SPAM folder? 💻 Lost control of your emails (to spammers/hackers)? The DMARC protocol might be the answer to your questions. It’s a good thing we’re talking about it today!"
---

## ✉️ Do your emails end up in the SPAM folder?

**DMARC might be the answer to your questions. It’s a good thing we’re talking about it today!**

![Infographic: the 3 key takeaways from “Why use DMARC in Email ? How to configure it?”](/images/blog/dmarc-email-en-points-cles.webp)

![Man holding settings for computer, phone and tablet](/medias/elementor/thumbs/man-holding-settings-computer-phone-tablet-PhotoRoom-PhotoRoom-q467rn5e880oy4r59o0311vyuxzetgxnryfjf4eom8.png)

DMARC is an acronym for **Domain\_based Message Authentication, Reporting & Conformance.**

It is part of the famous triptych: **SPF / DKIM / DMARC**: these security protocols that you can configure via DNS entries for your domain.

As you know, cybercriminals send billions of emails a day. In order to gain your trust, they may try to forge the address in the « From » field of an email. The email will then appear to come from the spoofed organization or domain.

This is where DMARC comes in.

![Messor tip: Setting up DMARC protects your domain from spoofing and improves the deliverability of your mailings.](/images/blog/dmarc-email-en-conseil.webp)

## DMARC is a standard email authentication method.

This protocol allows email administrators to:

- **Define policies** to indicate how unauthenticated **messages should be handled**, for example by blocking them or marking them as spam. If you are doing mailings, it is therefore recommended today to set up DMARC to ensure better deliverability.
- **Prevent hackers from impersonating** your **organization** and **domain**.
- **Receive reports on messages** that try to pretend to be official company messages when they are actually fake.

You can refer to the **Google documentation** dedicated to DMARC by clicking [here](https://support.google.com/a/answer/2466580?hl=en).

[![email sending, phone chatting, 24/7](/medias/elementor/thumbs/email-phone-chat-sending-24-24-q467qr6vrusdispa47ib564a9zwq9vflq2r72r73g8.png)](/medias/2023/05/blog-growth-hacking-2023-1.png)

*Check out our article about the most used Growth Hacking’s tools*

## How to audit the authentication of your emails ?

To fine-tune and understand all the features of DMARC is a specialist job. However, you can **audit the authentication of your emails for free and instantly via the sites** :

- [www.mail-tester.com](http://www.mail-tester.com/)
- [https://mxtoolbox.com](https://mxtoolbox.com/)
- <https://dmarcian.com/>

If you want to set up DMARC yourself at a minimum, for example to hope to gain in deliverability, **here are the steps to follow** :

1. **Log** **into** the admin area of **your email host** (Google Workspace, Microsoft 365, OVH…)
2. Go to the zone related to **DNS records**
3. Add a **TXT record** with the following value: **v=DMARC1; p=none;rua=mailto:XXXXX)** and **replace XXXXX** by the **email of the admin of your organization.**
