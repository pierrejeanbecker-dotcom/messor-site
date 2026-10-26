// Page « Découvrir Messor » / « About Messor ». Mise en page : src/components/About.astro

// Équipe : textes repris de l'ancien site (les fiches « Lucas N. » et « Kevin L. » n'existaient qu'en français :
// traduction à relire). Nouveaux arrivants : facts vides tant que la fiche n'est pas remplie (rubrique masquée),
// photo vide = initiales.
const TEAM: { name: string; photo: string; langs: string[]; fr: { role: string; facts: string[] }; en: { role: string; facts: string[] } }[] = [
  {
    name: 'Pierre-Jean Becker', photo: "/images/equipe/portrait-pierre-jean-becker.webp", langs: ['FR', 'EN', 'DE', 'IT'],
    fr: { role: 'Moissonneur en chef', facts: ['PGE Sup de Co Reims 2012 - admission prépa ECS.', 'La pêche, Paul McCartney, Larry David, Jim Thompson', 'Me coucher tard.', '« Allons-y, Alon zo ! » Pierrot Le Fou, Jean-Luc Godard', 'Réaliser en province un projet économique et humain dans lequel chacun a envie de s’investir.'] },
    en: { role: 'Chief Harvester', facts: ['PGE Sup de Co Reims 2012 - admission to ECS prep school.', 'Fishing, Paul McCartney, Larry David, Jim Thompson', 'Staying up late.', '“Allons-y, Alon zo!” Pierrot Le Fou, Jean-Luc Godard', 'To carry out an economic and human project in the province in which everyone wants to get involved.'] },
  },
  {
    name: 'Valentin L.', photo: "/images/equipe/portrait-valentin-lequesne.webp", langs: ['FR'],
    fr: { role: 'Business Development Manager', facts: ['Prépa HEC Caen - Programme grande école ICN Business School.', 'La natation, le fromage, World of Warcraft et la pluie.', 'Les bretons et le retard.', '« Soit A un succès dans la vie. Alors A = x + y + z, où x = travailler, y = s’amuser, z = se taire. » Albert Einstein', 'Notre animal mascotte Papaye ! Et bien sûr, le challenge.'] },
    en: { role: 'Business Development Manager', facts: ['HEC prep school, Caen - Grande École programme, ICN Business School.', 'Swimming, cheese, World of Warcraft and rain.', 'The Bretons and being late.', '“If A is success in life, then A = x + y + z. Work is x, play is y, and z is keeping your mouth shut.” Albert Einstein', 'Our pet mascot Papaya! And of course, new challenges.'] },
  },
  {
    name: 'Sarah V.', photo: "/images/equipe/portrait-sarah-vine.webp", langs: ['FR', 'EN', 'DE'],
    fr: { role: 'Business Developer', facts: ['IAE Metz School of Management.', 'La natation, mes Vosges natales.', 'Ne rien apprendre d’une expérience négative.', '« Ne demeure pas dans le passé, ne rêve pas du futur, concentre ton esprit sur le présent » Bouddha', 'M’investir dans des projets internationaux en mettant à profit mon bilinguisme franco-allemand.'] },
    en: { role: 'Business Developer', facts: ['IAE Metz School of Management.', 'Swimming, my hometown in the Vosges.', 'Learning nothing from a negative experience.', '“Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.” Buddha', 'To be involved in international projects using my French-German bilingualism.'] },
  },
  {
    name: 'Lucas N.', photo: '', langs: ['FR'],
    fr: { role: 'Business Developer', facts: ['ICN Nancy.', 'Le padel, la boxe anglaise, le cinéma et la pêche.', 'La procrastination.', '« Le plaisir d’un travail en guérit la peine. » William Shakespeare', 'Le challenge et apprendre de nouvelles choses.'] },
    en: { role: 'Business Developer', facts: ['ICN Nancy.', 'Padel, boxing, cinema and fishing.', 'Procrastination.', '“The labour we delight in physics pain.” William Shakespeare', 'Challenge and learning new things.'] },
  },
  {
    name: 'Kevin L.', photo: "/images/equipe/portrait-kevin-lenhof.webp", langs: ['FR'],
    fr: { role: 'Spécialiste SEO', facts: ['EFFICOM Paris 2014 - Master Chef de projet Web & Digital ; certifié Google Analytics et Technical SEO Exam Semrush', 'Baby Yoda', 'Les nancéiens ?', '« Il y a une différence entre connaître, et arpenter le chemin » Morpheus', 'Apporter une vraie valeur ajoutée à mes clients.'] },
    en: { role: 'SEO Specialist', facts: ['EFFICOM Paris 2014 - Master’s in Web & Digital Project Management; Google Analytics and Semrush Technical SEO certified', 'Baby Yoda', 'People from Nancy?', '“There is a difference between knowing the path and walking the path.” Morpheus', 'Bringing real added value to my clients.'] },
  },
  {
    name: 'Evan B.', photo: "/images/equipe/portrait-evan-b.webp", langs: ['FR'],
    fr: { role: 'Business Developer', facts: ['ICN Business School', 'La bonne cuisine, le sport et la moto', 'Les bouchons le matin (ou le soir)', '« Comment voulez-vous gouverner un pays où il y a 258 variétés de fromage ? » Charles de Gaulle', 'Être le meilleur dans ce que je fais.'] },
    en: { role: 'Business Developer', facts: ['ICN Business School', 'Good food, sport and motorbikes', 'Traffic jams in the morning (or in the evening)', '“How can you govern a country which has 258 varieties of cheese?” Charles de Gaulle', 'Being the best at what I do.'] },
  },
  {
    name: 'Camille C.', photo: "/images/equipe/portrait-camille-chabot.webp", langs: ['FR'],
    fr: { role: 'Business Developer', facts: ['ICN Business School', 'Le voyage, la bonne cuisine et le lèche-vitrine', 'Les retards et le désordre', '« Fais les choses bien ou ne les fais pas. » Mon père', 'Des objectifs concrets qui me poussent à apprendre et à progresser.'] },
    en: { role: 'Business Developer', facts: ['ICN Business School', 'Travel, good food and window shopping', 'Lateness and mess', '“Do things right or don’t do them at all.” My father', 'Concrete goals that push me to learn and grow.'] },
  },
  {
    name: 'Genny Z.', photo: '', langs: ['FR', 'EN', 'IT'],
    fr: { role: 'Office Manager', facts: [] },
    en: { role: 'Office Manager', facts: [] },
  },
];

export const CLAIRPART_URL = 'https://www.clairpart.fr/';

const PHOTOS = {
  bureaux: '/images/equipe/bureaux-messor-metz.webp',
  vue: '/images/equipe/vue-cathedrale-bureau.webp',
  equipe: '/images/equipe/equipe-au-travail.webp',
  metz: '/images/equipe/metz-toits-cathedrale.webp',
  crokinole: '/images/equipe/crokinole.webp',
};

export const ABOUT = {
  fr: {
    seoTitle: 'Découvrir Messor - Messor',
    description: 'Découvrir Messor - Une équipe pour vous aider à trouver de nouveaux prospects, clients et talents - Agence de développement commercial - Metz',
    eyebrow: 'Découvrir Messor',
    title: 'Une équipe pour vous aider à trouver de nouveaux prospects, clients et talents.',
    lead: 'Messor, du latin messis : la moisson. Une agence de business development B2B basée à Metz, qui prépare le terrain, sème au bon endroit et récolte avec vous.',
    stats: [
      { n: '+50', label: 'clients B2B accompagnés' },
      { n: '4', label: 'langues : FR · EN · DE · IT' },
      { n: 'Metz', label: 'une équipe identifiable, sur place' },
      { n: '100 %', label: 'en marque blanche, sous vos couleurs' },
    ],
    factLabels: ['Formation', 'Passions', 'Bête noire', 'Citation', 'Ce qui me motive'],
    dna: {
      eyebrow: 'Notre ADN',
      title: 'Une approche omnicanal',
      text: 'Le téléphone, l’email, LinkedIn, le référencement : chaque canal a son rôle. Nous les combinons pour aller chercher vos prospects là où ils sont.',
      more: 'En savoir plus',
      channels: [
        { title: 'Cold Calling', text: 'Pourquoi le téléphone est-il indispensable ? Comment allier motivation et résultats ?', href: '/prospection-telephonique-b2b' },
        { title: 'Cold Mailing', text: 'Cold mailing, délivrabilité, paramétrage DNS, RGPD.', href: '/mail-prospection-b2b' },
        { title: 'InMailing', text: 'Prospecter sur LinkedIn : à quoi bon ?', href: '/prospection-sales-navigator-linkedin' },
        { title: 'SEO', text: 'Notre spécialiste en référencement Google intervient pour vous faire monter dans les pages Google.', href: '/creation-de-contenu-digital' },
        { title: 'Google Ads', text: 'Certifiés Google Ads Search & Display, nous vous aidons à capter les autonomistes de l’acte d’achat avec des campagnes impactantes.', href: '/optimiser-campagne-google-ads' },
        { title: 'Visibilité LinkedIn', text: 'Rédaction de posts, développement de l’audience de votre profil ou de votre page professionnelle.', href: '/gagner-en-visibilite-sur-linkedin' },
        { title: 'Content Marketing', text: 'Développez votre audience sur les différents médias, optimisez votre référencement naturel.', href: '/creation-de-contenu-digital' },
      ],
    },
    values: {
      eyebrow: 'Nos valeurs',
      title: 'Ce qui nous fait avancer',
      items: [
        { title: 'Efficacité', text: 'Des objectifs clairs, des process cadrés et des résultats mesurés, semaine après semaine.' },
        { title: 'Confiance', text: 'Transparence totale sur ce qui est fait, pour qui, et avec quels résultats.' },
        { title: 'Plaisir', text: 'Une belle aventure humaine : on travaille mieux quand on aime ce qu’on fait.' },
      ],
    },
    life: {
      eyebrow: 'La vie chez Messor',
      title: 'Metz, la cathédrale au loin, et une partie de crokinole',
      photos: [
        { src: PHOTOS.equipe, alt: 'A Day in the Life' },
        { src: PHOTOS.vue, alt: 'La cathédrale au loin ?' },
        { src: PHOTOS.bureaux, alt: 'Notre lieu de travail' },
        { src: PHOTOS.metz, alt: 'Metz - what else ?' },
        { src: PHOTOS.crokinole, alt: 'Le crokinole : notre sport officiel !' },
      ],
    },
    team: {
      eyebrow: 'L’équipe',
      title: 'Les moissonneurs',
      text: 'Diplômés Bac+5, formés en continu, et des interlocuteurs qui ne changent pas tous les trois mois.',
      playlist: 'La playlist du bureau',
      members: TEAM.map((m) => ({ name: m.name, photo: m.photo, langs: m.langs, ...m.fr })),
      founder: {
        label: 'Le fondateur',
        text: 'Pierre-Jean Becker a fondé Messor à Metz. Il est aussi le fondateur de',
        link: 'Clairpart, sites internet et questionnaires clients pour notaires',
        after: ', qui accompagne les études notariales dans leur présence en ligne et la préparation des demandes de leurs clients.',
      },
    },
    faq: {
      title: 'Foire aux questions',
      items: [
        { q: 'Pourquoi devrais-je vous faire confiance ?', a: 'Parce que tous les messins sont des gens biens ! Commençons déjà par faire connaissance autour d’une visio et nous verrons si une collaboration est possible et souhaitable. Bien entendu, si votre intérêt se confirme des prises de références sont possibles. Vous avez accès à l’agenda de notre dirigeant pour un premier échange.' },
        { q: 'Comment gérez-vous le RGPD ?', a: 'MESSOR intervient sur des cycles de ventes B2B. Nous n’approchons pas des « consommateurs » ou des particuliers. Nous ne vendons pas de bases de données. Notre CRM est siloté de manière à ce que les bases de données de nos clients ne puissent pas communiquer entre elles. Pour en savoir plus sur le RGPD et le cold mailing, rendez-vous sur notre page <a href="/mail-prospection-b2b">mail de prospection B2B</a>.' },
        { q: 'Quelles différences entre Messor et une agence de Growth Hacking ?', a: 'Nous intervenons auprès de cabinets de conseils ou sociétés de services B2B dont les business ne sont pas « scalable ». Nous partageons certains outils des « Growth Hackers » mais la ressemblance s’arrête là. D’ailleurs, nous avons écrit un article sur <a href="/top-articles/33-outils-growth-hacking-plus-utilises-2025">les 33 meilleurs outils de growth hacking</a>. Autre point majeur de différenciation : contrairement aux agences de GH, nous utilisons beaucoup le téléphone.' },
        { q: 'Quel est le ROI de vos interventions en matière de développement commercial ?', a: 'Chaque collaboration est différente : si votre offre a un potentiel marché auquel vous savez répondre, nous aurons des résultats.' },
        { q: 'Je ne vois pas les membres de votre équipe sur votre page LinkedIn MESSOR, pourquoi ?', a: 'Bien vu ! Nous collaborons en marque blanche pour la majorité de nos partenaires. Il est ainsi parfois préférable de ne pas faire apparaître MESSOR dans nos expériences professionnelles LinkedIn.' },
        { q: 'Comment intégrer Messor ?', a: 'Vous pouvez envoyer une candidature spontanée à l’adresse suivante : <a href="mailto:rh@messor.fr">rh@messor.fr</a>. Pour rejoindre MESSOR en CDI, un BAC+5 est exigé. Nous recherchons également régulièrement des stagiaires et alternants. Voir aussi <a href="/nous-rejoindre">Nous rejoindre</a>.' },
        { q: 'Êtes-vous spécialisés dans la chasse de têtes de certains profils ?', a: 'Non. Nous sommes par exemple intervenus dernièrement pour recruter des directeurs commerciaux, des consultants IT, des consultants Lean Manufacturing…' },
        { q: 'Pourquoi faire appel à vos services ?', a: 'Nous apportons de la flexibilité, un savoir-faire sur un métier en pénurie de profils de qualité, la tranquillité de pouvoir vous concentrer sur ce que vous aimez faire… et plein d’autres raisons encore !' },
        { q: 'Comment faire une campagne d’emailing efficace ?', a: 'Ceux qui prédisaient la mort de l’emailing se sont trompés : il reste l’un des moyens les plus importants pour acquérir des prospects. Mais si vos emails arrivent directement en spam, c’est une véritable perte de temps. Pourquoi certains courriels arrivent-ils à destination et d’autres non ? Tout est expliqué <a href="/emailing/tout-savoir-sur-emailing-en-2023">ici</a>.' },
      ],
    },
  },

  en: {
    seoTitle: 'About Messor - Messor',
    description: 'MESSOR is dedicated to helping you find new prospects, clients and talent. Get to know us! - Business Development Agency - Metz',
    eyebrow: 'About Messor',
    title: 'A dedicated team helping you find new prospects, clients and talent.',
    lead: 'Messor, from the Latin messis: the harvest. A B2B business development agency based in Metz, France, that prepares the ground, sows in the right place and harvests with you.',
    stats: [
      { n: '50+', label: 'B2B clients supported' },
      { n: '4', label: 'languages: FR · EN · DE · IT' },
      { n: 'Metz', label: 'an identifiable team, on site' },
      { n: '100%', label: 'white label, under your brand' },
    ],
    factLabels: ['Education', 'Passions', 'Pet peeve', 'Quote', 'What drives me'],
    dna: {
      eyebrow: 'Our DNA',
      title: 'An omnichannel approach',
      text: 'Phone, email, LinkedIn, search: every channel has its role. We combine them to reach your prospects where they are.',
      more: 'Learn more',
      channels: [
        { title: 'Cold Calling', text: 'Why is the telephone essential? How to combine motivation with results?', href: '/en/cold-calling' },
        { title: 'Cold Mailing', text: 'Cold mailing, deliverability, DNS setup, GDPR.', href: '/en/cold-mailing' },
        { title: 'InMailing', text: 'Prospecting on LinkedIn: why should you think about it?', href: '/en/linkedin-prospecting' },
        { title: 'Tradeshows', text: 'Our multilingual team will assist you at tradeshows in French, English and German-speaking countries.', href: '' },
        { title: 'Google Ads', text: 'Google Ads Search & Display certified, we help you reach autonomous buyers with impactful advertising campaigns.', href: '/en/google-ads-en' },
        { title: 'LinkedIn awareness', text: 'Post writing, audience development for your profile or your business page.', href: '/en/linkedin-awareness' },
        { title: 'Content Marketing', text: 'Develop your audience on the different media and optimise your search engine optimisation (SEO).', href: '/en/content-creation-and-distribution' },
      ],
    },
    values: {
      eyebrow: 'What we stand for',
      title: 'What drives us',
      items: [
        { title: 'Performance', text: 'Clear goals, structured processes and measured results, week after week.' },
        { title: 'Trust', text: 'Full transparency on what is done, for whom, and with what results.' },
        { title: 'Enjoyment', text: 'A great human adventure: we work better when we love what we do.' },
      ],
    },
    life: {
      eyebrow: 'Life at Messor',
      title: 'Metz, the cathedral in the distance, and a game of crokinole',
      photos: [
        { src: PHOTOS.equipe, alt: 'A Day in the Life' },
        { src: PHOTOS.vue, alt: 'The breathtaking cathedral in the distance?' },
        { src: PHOTOS.bureaux, alt: 'Our workplace' },
        { src: PHOTOS.metz, alt: 'Metz - what else?' },
        { src: PHOTOS.crokinole, alt: 'Crokinole: our official sport!' },
      ],
    },
    team: {
      eyebrow: 'Our team',
      title: 'The harvesters',
      text: 'Master’s graduates, continuously trained, and contacts who don’t change every three months.',
      playlist: 'The office playlist',
      members: TEAM.map((m) => ({ name: m.name, photo: m.photo, langs: m.langs, ...m.en })),
      founder: {
        label: 'The founder',
        text: 'Pierre-Jean Becker founded Messor in Metz. He is also the founder of',
        link: 'Clairpart, websites and client questionnaires for notaries',
        after: ', which helps French notarial offices with their online presence and better-prepared client requests.',
      },
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Why should I trust you?', a: 'Because all the people from Metz are good people! Let’s start by getting to know each other during a video call and we will see if a collaboration is possible and appropriate. You can access our founder’s calendar to book a first call.' },
        { q: 'How do you deal with GDPR?', a: 'MESSOR operates in B2B sales cycles. We do not approach “consumers” or individuals. We do not sell databases. Our CRM is siloed so that our clients’ databases cannot communicate with each other.' },
        { q: 'What are the differences between Messor and a growth hacking agency?', a: 'We work with consulting firms or B2B service companies whose business is not scalable (because it cannot be fully digitised). We share some of the tools of the “Growth Hackers” but the similarity ends there. Another major point of differentiation: unlike GH agencies, we use the telephone a lot.' },
        { q: 'What is the ROI of your business development interventions?', a: 'We do not read crystal balls. Selling is a team effort. If your offer has a market potential that you know how to meet, we will get results.' },
        { q: 'I don’t see your team members on the MESSOR LinkedIn page, why?', a: 'Nice catch! We work on a white label basis for most of our partners. It is therefore sometimes preferable not to show MESSOR in our LinkedIn professional experience.' },
        { q: 'How to join Messor?', a: 'You can send an unsolicited application to <a href="mailto:rh@messor.fr">rh@messor.fr</a>. To join MESSOR on a full-time basis, you need a 5-year degree. We are also regularly looking for interns and work-study students.' },
        { q: 'Do you specialise in headhunting specific profiles?', a: 'No. For example, we have recently been involved in recruiting sales managers, IT consultants, Lean Manufacturing consultants, etc.' },
        { q: 'Why should I use your services?', a: 'We provide flexibility, expertise in a field where there is a shortage of quality profiles, the peace of mind of being able to concentrate on what you love to do… and many other reasons!' },
      ],
    },
  },
};
