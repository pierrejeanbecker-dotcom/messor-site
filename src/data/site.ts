// Réglages communs à tout le site : coordonnées, menus, libellés FR / EN.

export type Lang = 'fr' | 'en';

export const BOOKING_URL =
  'https://bookings.cloud.microsoft/bookwithme/user/c844084bf24a4ff7ba01283a2e3266ed%40messor.fr?anonymous&ismsaljsauthenabled=true';

export const CONTACT = {
  address: ['27 place Saint Thiébault', '57000 Metz, France'],
  phone: '+33 3 87 74 89 89',
  phoneHref: 'tel:+33387748989',
  email: 'hello@messor.fr',
  linkedin: 'https://www.linkedin.com/in/pj-becker/',
};

type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

export const NAV: Record<Lang, NavItem[]> = {
  fr: [
    {
      label: 'Notre expertise',
      children: [
        { label: 'Création base de données', href: '/base-de-donnees-prospects' },
        { label: 'Prospection téléphonique B2B', href: '/prospection-telephonique-b2b' },
        { label: 'Mail de prospection B2B', href: '/mail-prospection-b2b' },
        { label: 'Prospection LinkedIn', href: '/prospection-sales-navigator-linkedin' },
        { label: 'Convertir un prospect en client', href: '/convertir-un-prospect-en-client' },
        { label: 'Création de contenu digital', href: '/creation-de-contenu-digital' },
        { label: 'Gagner en visibilité sur LinkedIn', href: '/gagner-en-visibilite-sur-linkedin' },
        { label: 'Optimisation campagne Google Ads', href: '/optimiser-campagne-google-ads' },
      ],
    },
    {
      label: 'Nos offres',
      children: [
        { label: 'Prospection multicanal', href: '/accompagnement-prospection-multicanal' },
        { label: 'Externalisation Développement Commercial', href: '/developpement-commercial-externalise' },
        { label: 'Externalisation Inbound Marketing', href: '/inbound-marketing-externalise' },
        { label: 'Conseil en Développement Commercial', href: '/conseil-developpement-commercial' },
        { label: 'Automatisation des Processus Métiers', href: '/automatisation-processus-metiers' },
        { label: 'Chasse de tête', href: '/recruter-des-talents' },
      ],
    },
    { label: 'Découvrir Messor', href: '/decouvrir-messor-2' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contactez-nous', href: '/contactez-nous' },
  ],
  en: [
    {
      label: 'Our expertise',
      children: [
        { label: 'Database creation', href: '/en/database-creation' },
        { label: 'Cold Calling', href: '/en/cold-calling' },
        { label: 'Cold mailing', href: '/en/cold-mailing' },
        { label: 'LinkedIn Prospecting', href: '/en/linkedin-prospecting' },
        { label: 'Turning the prospect into a loyal customer', href: '/en/turning-prospect-into-loyal-customer' },
        { label: 'Content creation and distribution', href: '/en/content-creation-and-distribution' },
        { label: 'LinkedIn Awareness', href: '/en/linkedin-awareness' },
        { label: 'Google Ads', href: '/en/google-ads-en' },
        { label: 'Headhunting', href: '/en/headhunting' },
      ],
    },
    {
      label: 'Our offer',
      children: [
        { label: 'Recruit Talent', href: '/en/recruit-talent' },
        { label: 'Omnichannel prospecting campaign', href: '/en/prospecting-campaign' },
        { label: 'Business development', href: '/en/business-development' },
        { label: 'Digital Marketing Strategy', href: '/en/digital-marketing-strategy' },
      ],
    },
    { label: 'About Messor', href: '/en/about-us-messor' },
    { label: 'Blog', href: '/en/blog-en' },
    { label: 'Contact us', href: '/en/contact-us' },
  ],
};

export const UI = {
  fr: {
    home: '/',
    blog: '/blog',
    contact: '/contactez-nous',
    cta: 'Parlons-en →',
    book: 'Réserver un diagnostic de 30 min →',
    switchLabel: 'EN',
    switchTitle: 'English version',
    legal: { label: 'Mentions légales', href: '/mentions-legales' },
    privacy: { label: 'Confidentialité', href: '/politique-de-confidentialite' },
    jobs: { label: 'Nous rejoindre', href: '/nous-rejoindre' },
    tagline: 'Du latin messis — la moisson',
    latest: 'Derniers articles',
    allPosts: 'Tous les articles →',
    readMore: 'Lire la suite →',
    prev: '← Page précédente',
    next: 'Page suivante →',
    ctaTitle: 'Trente minutes pour voir si c’est pertinent.',
    ctaText:
      'Des questions sur nos services d’acquisition de talents, prospects et clients ? Échangeons directement sur votre cycle de vente et vos objectifs.',
    ctaButton: 'Réserver un créneau →',
    ctaSecondary: 'Nous écrire',
    labels: { address: 'Adresse', phone: 'Téléphone', email: 'Email', linkedin: 'LinkedIn' },
    by: 'Par',
    updated: 'Mis à jour le',
    categories: 'Catégories',
    blogTitle: 'Blog',
    blogLead: 'Prospection, cold calling, emailing, growth hacking : nos retours d’expérience sur le business development B2B.',
    menu: 'Menu',
    notFound: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas ou a été déplacée.',
    backHome: 'Retour à l’accueil',
    dateLocale: 'fr-FR',
  },
  en: {
    home: '/en',
    blog: '/en/blog-en',
    contact: '/en/contact-us',
    cta: 'Let’s talk →',
    book: 'Book a 30-min diagnostic →',
    switchLabel: 'FR',
    switchTitle: 'Version française',
    legal: { label: 'Legal notice', href: '/en/legal-notice' },
    privacy: { label: 'Privacy', href: '/en/privacy-policy' },
    jobs: { label: 'Join us', href: '/nous-rejoindre' },
    tagline: 'From the Latin messis — the harvest',
    latest: 'Latest articles',
    allPosts: 'All articles →',
    readMore: 'Read more →',
    prev: '← Previous page',
    next: 'Next page →',
    ctaTitle: 'Thirty minutes to see if it’s a fit.',
    ctaText:
      'Questions about our talent, prospect and client acquisition services? Let’s talk directly about your sales cycle and your goals.',
    ctaButton: 'Book a slot →',
    ctaSecondary: 'Email us',
    labels: { address: 'Address', phone: 'Phone', email: 'Email', linkedin: 'LinkedIn' },
    by: 'By',
    updated: 'Updated on',
    categories: 'Categories',
    blogTitle: 'Blog',
    blogLead: 'Prospecting, cold calling, emailing, growth hacking: field notes on B2B business development.',
    menu: 'Menu',
    notFound: 'Page not found',
    notFoundText: 'This page does not exist or has been moved.',
    backHome: 'Back to home',
    dateLocale: 'en-GB',
  },
} as const;
