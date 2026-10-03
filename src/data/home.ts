// Textes de la page d'accueil. Modifiez ici, la mise en page est dans src/components/Home.astro.

export const HOME = {
  fr: {
    seoTitle: 'Messor — L’agence qui moissonne vos prospects B2B',
    description:
      'Agence de business development B2B basée à Metz : ciblage, prospection multicanal, prise de rendez-vous et suivi pour cabinets de conseil, éditeurs SaaS et sociétés de services.',
    badge: 'Cabinets de conseil · éditeurs SaaS · sociétés de services',
    titleStart: 'Vous avez semé un',
    altWords: ['produit', 'service'],
    titleEnd: 'vos clients.',
    titleHarvest: 'Nous moissonnons',
    lead:
      'Agence de business development B2B basée à Metz. Nous vous accompagnons par petit bout ou de bout en bout — ciblage, prise de contact multicanal, prise de rendez-vous, (co-)réalisation des rdvs, gestion du suivi post-rdvs — pour vous aider à signer de nouveaux clients.',
    book: 'Réserver un diagnostic de 30 min →',
    seeResults: 'Voir les résultats clients',
    painting: ['Pieter Bruegel l’Ancien · ', 'Les Moissonneurs', ', 1565'],
    stats: [
      { n: '+50%', label: 'de trafic généré pour un éditeur SAAS luxembourgeois' },
      { n: '10M€', label: 'le chiffre d’affaires signé ensemble avec notre principal partenaire' },
      { n: 'C-Level', label: 'la cible la plus attaquée par l’agence' },
      { n: '4 langues', label: 'FR · EN · DE · IT pour l’Europe' },
    ],
    clientsTitle: '+ de 50 clients B2B accompagnés',
    problem: {
      eyebrow: 'Le problème',
      title: 'La prospection B2B est devenue un métier à part entière — et il dévore le temps de vos équipes.',
      pains: [
        'Vos consultants ne sont pas des vendeurs',
        'Vous préférez closer qu’aller dénicher des opportunités',
        'Les séquences LinkedIn ou mails génériques ne génèrent plus de réponses',
        'Votre CRM est plein de leads froids jamais retravaillés',
        'Recruter un SDR en interne est long, coûteux et risqué',
        'Vous attaquez de nouveaux marchés sans vraiment savoir par où commencer',
      ],
      roleStart: 'Notre rôle : ',
      roleKey: 'vous décharger',
      roleEnd:
        ' de cette charge mentale et remettre vos commerciaux ou consultants face à des prospects prêts à acheter, aujourd’hui ou demain.',
    },
    offers: {
      eyebrow: 'Nos offres',
      title: 'Trois façons de travailler ensemble',
      side:
        'Chaque mission démarre par un diagnostic offert. Nous vous orientons vers le format qui correspond à votre maturité, à vos ressources internes et à notre staffing.',
      more: 'Découvrir l’offre →',
      items: [
        {
          tag: 'L’essentiel (non disponible actuellement)',
          title: 'Prospection externalisée',
          pitch:
            'Une équipe dédiée qui prend en main votre prospection multicanal — LinkedIn, email, téléphone — et remplit l’agenda de vos commerciaux.',
          deliverables: ['Base de prospects ciblée et enrichie', 'Séquences multicanal personnalisées', 'Prise de rendez-vous qualifiés', 'Reporting hebdomadaire'],
          href: '/accompagnement-prospection-multicanal',
          highlight: false,
        },
        {
          tag: 'Le plus demandé',
          title: 'Force de vente externalisée',
          pitch:
            'Un commercial senior dédié à votre compte, intégré à votre CRM et à vos outils, qui pilote la prospection ET closing jusqu’à la signature.',
          deliverables: ['Tout ce qui est inclus dans l’offre Prospection', 'Qualification approfondie & closing', 'Pilotage CRM & process de vente', 'Point stratégique hebdomadaire'],
          href: '/developpement-commercial-externalise',
          highlight: true,
        },
        {
          tag: 'Le long terme',
          title: 'Inbound & automatisation',
          pitch:
            'SEO, contenu, automatisations métier — nous construisons le dispositif qui attire des leads en continu et libère vos équipes des tâches répétitives.',
          deliverables: ['Stratégie SEO & création de contenu', 'Automatisations Make (certifiés Advanced)', 'Enrichissement CRM & synchronisations', 'Tableaux de bord sur mesure'],
          href: '/inbound-marketing-externalise',
          highlight: false,
        },
      ],
      footStart: 'Besoin plus ponctuel ? Nous proposons aussi du ',
      footLink1: { label: 'conseil commercial', href: '/conseil-developpement-commercial' },
      footMid: ' et de la ',
      footLink2: { label: 'chasse de talents commerciaux', href: '/recruter-des-talents' },
      footEnd: '.',
    },
    process: {
      eyebrow: 'Comment ça marche',
      titleStart: 'De la signature aux premiers rendez-vous, ',
      titleEm: 'en 4 semaines',
      titleEnd: '.',
      lead:
        'Une méthodologie éprouvée avec plus de 50 clients. Chaque étape est cadrée, livrable et validée avec vous — aucune boîte noire. Nous travaillons en marque blanche.',
      steps: [
        { n: '01', title: 'Diagnostic', delay: 'Semaine 0', desc: 'Un échange de 30 min pour comprendre votre produit, votre cycle de vente et vos objectifs. Nous identifions votre ICP et le canal prioritaire. Sans engagement.' },
        { n: '02', title: 'Atelier de cadrage', delay: 'Semaines 1–2', desc: 'Workshop pour figer le message, les personas, les critères de qualification et la structure des séquences. Toute la documentation est centralisée dans un espace NOTION partagé — nous privilégions la communication asynchrone pour respecter votre agenda.' },
        { n: '03', title: 'Lancement opérationnel', delay: 'Semaines 3–4', desc: 'Construction de la base de prospects, paramétrage des outils (LinkedIn, email, CRM), rédaction des séquences. Démarrage de la prospection téléphonique. Analyse des premiers taux de conversion. Prise des premiers rendez-vous.' },
        { n: '04', title: 'Pilotage & itération', delay: 'Mois 2 → ∞', desc: 'Comparaison des taux de conversion par cible et par message. Réalisation des rendez-vous, suivi jusqu’à la vente. Réunion hebdomadaire de suivi d’activité, point mensuel et trimestriel davantage orienté stratégie.' },
      ],
    },
    results: {
      eyebrow: 'Résultats clients',
      title: 'Ce que nos clients obtiennent, en vrai.',
      items: [
        { client: 'Many Many', sector: 'Agence digitale', metric: '+50%', label: 'de clics sur le site', note: '2 à 3× plus d’impressions sur les moteurs de recherche' },
        { client: 'Proaction International', sector: 'Conseil industriel', metric: 'Ouvertures', label: 'de comptes majeurs en France et en Europe', note: '' },
        { client: 'Confidentiel', sector: 'Conseil risques & conformité finance', metric: '+12 AO', label: 'répondus sur de nouveaux comptes en un an', note: 'Internalisation de la ressource MESSOR par le cabinet' },
        { client: 'InFine · VONA · Qontrol · CXP', sector: 'IT / Services', metric: 'RDV qualifiés', label: 'par centaines pour des acteurs IT (cybersécurité, cloud…)', note: 'Plusieurs années de collaboration sur des cycles complexes B2B avec des décideurs techniques (CTO, RSSI, DSI) — sur des marchés tendus où l’accès aux bons interlocuteurs est rare.' },
      ],
    },
    why: {
      credit: ['Pieter Bruegel l’Ancien — ', 'Les Moissonneurs', ', 1565. Metropolitan Museum of Art, New York.'],
      eyebrow: 'Pourquoi Messor',
      titleStart: 'Du latin ',
      titleEm: 'messis',
      titleEnd: ' — la moisson.',
      text:
        'Nous partons du principe qu’une bonne récolte se prépare. Qu’elle demande du temps, de la méthode, de la sueur et des larmes, et des gens qui connaissent leur terrain. C’est exactement ce que nous faisons avec votre marché.',
      button: { label: 'Découvrir l’équipe', href: '/decouvrir-messor-2' },
      points: [
        { title: 'Des commerciaux qui maîtrisent la donnée', desc: 'Formés à la vente consultative ET aux outils modernes (CRM, Sales Navigator, MAKE & API, AIRTABLE & Javascript). Un profil rare, assez senior pour parler à un C-level, assez technique pour opérer le stack.' },
        { title: 'Multilingues pour l’Europe', desc: 'FR, EN, DE, IT — nous adressons aussi bien la France que le DACH, l’Italie ou le Royaume-Uni, sans sous-traiter à l’étranger.' },
        { title: 'Transparence totale', desc: 'Reporting temps réel, accès à nos outils, point hebdomadaire. Vous savez exactement ce qui est fait, pour qui, et avec quels résultats.' },
        { title: 'Pas de salle des machines anonyme', desc: 'Basés à Metz, équipe identifiable, diplômée Bac+5, formée en continu. Vos interlocuteurs ne changent pas tous les trois mois.' },
      ],
    },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ce que disent nos clients',
      items: [
        { quote: 'Ce qui a fait la différence : la maîtrise de la méthodologie, la qualité du pilotage et du reporting, et avant tout la qualité des liens humains créés.', name: 'Matthias Poirier', role: 'CEO — MPG Partners' },
        { quote: 'Messor est aujourd’hui un partenaire incontournable en Europe. Ils nous apportent plusieurs nouveaux clients majeurs chaque année.', name: 'Christophe Cren', role: 'VP Business Development Europe — Proaction International' },
        { quote: 'Dans le marché tendu qu’est l’IT, Messor est parvenu à identifier de nombreuses opportunités dont plusieurs se sont transformées en vente.', name: 'Antoine Ramponi', role: 'Co-Founder & CEO — InFine' },
        { quote: 'En seulement 2 mois, leur capacité à comprendre notre discours commercial a déjà généré des rendez-vous de qualité avec des CTO.', name: 'Emeric Lamour de Caslou', role: 'Sales Lead — Qontrol' },
        { quote: 'MESSOR a su définir et appliquer une méthodologie de prospection adaptée et efficace. Nous nous félicitons d’avoir fait appel à leurs services.', name: 'Jérôme Bricout', role: 'Directeur des Opérations — CXP' },
        { quote: 'Une augmentation de 50% des clics, 2 à 3 fois plus d’impressions sur les moteurs de recherche — les résultats sont au rendez-vous.', name: 'Nicolas Legay', role: 'CEO — Many Many' },
        { quote: 'Déjà deux ans que KSI fait confiance à MESSOR. Une collaboration fructueuse qui ne fait que commencer.', name: 'Hubert Castellan', role: 'Fondateur & CEO — KSI Partners' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Les questions qu’on nous pose souvent',
      items: [
        { q: 'Quel est le délai moyen pour voir des résultats ?', a: 'Les premiers rendez-vous arrivent généralement entre la 4e et la 6e semaine — le temps de construire la base, calibrer le message et déclencher la première vague. Un cycle de vente B2B complet se joue ensuite sur 3 à 9 mois selon la complexité de votre offre. Nous calibrons le pilotage pour maximiser le ROI à chaque étape.' },
        { q: 'Quelle est la différence entre "prospection" et "force de vente externalisée" ?', a: 'La prospection s’arrête à la prise de rendez-vous qualifié — vos commerciaux prennent le relais. La force de vente externalisée va plus loin : nous qualifions, nous négocions, nous faisons avancer l’opportunité dans votre CRM jusqu’à la signature. À vous de choisir le périmètre selon vos ressources internes.' },
        { q: 'Comment choisir la meilleure agence de prospection ?', a: 'Le choix d’une agence de prospection dépend de plusieurs critères clés.\n\n• La clientèle de l’agence : une agence ayant de l’expérience avec des entreprises similaires à la vôtre (cabinet de conseil, société SaaS…) saura adapter ses techniques et ses outils à vos besoins spécifiques.\n• L’expertise multicanal : certaines agences se spécialisent sur un seul canal (LinkedIn), d’autres adoptent une approche multicanal — plus adaptée aux organisations qui souhaitent toucher leurs cibles via plusieurs points de contact.\n• Le profil de vos cibles : si vous adressez des décideurs de niveau direction, il est essentiel de choisir une agence capable de combiner plusieurs canaux, notamment le téléphone, qui reste un moyen de prospection très efficace en 2025.\n• Les profils des collaborateurs : selon votre organisation, choisissez des experts qui correspondent à vos besoins (Business Developers, Inside Sales, Growth Hackers…) et qui s’intègrent à l’ADN de votre société.\n• Data Intelligence : la maîtrise de la data est au cœur de la performance commerciale en 2025. Challengez vos interlocuteurs sur leurs outils CRM, leurs certifications… Vous seriez surpris de la disparité de maturité des agences sur ce sujet primordial.\n• Transparence et reporting : optez pour une agence qui joue carte sur table et vous permet de suivre en temps réel l’évolution des résultats.\n\nMESSOR est l’agence idéale pour les cabinets de conseil, les sociétés de services et les éditeurs de logiciels. Nous proposons une équipe d’experts formés à la vente 5.0, composée de jeunes talents ou de profils expérimentés, diplômés des meilleures écoles de commerce et basés en France.' },
        { q: 'Quel rôle joue l’IA dans le business development en 2024 ?', a: 'L’intelligence artificielle (IA), et plus particulièrement l’IA générative, révolutionne le business development avec des cas d’usage concrets et variés. Parmi les applications courantes, on retrouve la retranscription automatique d’entretiens, la rédaction et la correction de mails.\n\nPour aller plus loin, l’IA peut exploiter la big data issue des API et des outils CRM pour analyser des milliers de profils LinkedIn et personnaliser à grande échelle vos campagnes de prospection, ou synthétiser des milliers d’offres d’emploi pour mieux comprendre vos cibles et leurs besoins.\n\nGrâce à son double savoir-faire en business development et en gestion avancée de la data (API, outils, propriétés), MESSOR conçoit des solutions IA sur mesure pour booster votre productivité commerciale et optimiser vos efforts de prospection.' },
        { q: 'Travaillez-vous uniquement en français ?', a: 'Non. Notre équipe couvre FR, EN, DE et IT. Nous accompagnons régulièrement des développements sur le DACH, l’Italie, le Benelux et le Royaume-Uni, avec des collaborateurs natifs des pays ciblés.' },
        { q: 'Comment intégrez-vous mon CRM et mes outils ?', a: 'Nous travaillons dans votre stack, pas dans le nôtre. HubSpot, Salesforce, Pipedrive, Attio — nous nous branchons et pilotons depuis votre CRM. Nous sommes certifiés Make Advanced pour automatiser les synchronisations et enrichissements nécessaires.' },
      ],
    },
    contact: {
      title: 'Trente minutes pour voir si c’est pertinent.',
      text: 'Pierre-Jean vous répond en direct. Pas de pitch commercial — un échange franc sur votre cycle de vente, vos blocages actuels, et ce qui ferait bouger l’aiguille. Si on est le bon partenaire, on vous le dira. Si non aussi.',
    },
  },

  // Version anglaise : traduction de la page d'accueil française (à relire).
  en: {
    seoTitle: 'Messor — The agency that harvests your B2B prospects',
    description:
      'B2B business development agency based in Metz, France: targeting, multichannel prospecting, appointment setting and follow-up for consulting firms, SaaS vendors and service companies.',
    badge: 'Consulting firms · SaaS vendors · service companies',
    titleStart: 'You sowed a',
    altWords: ['product', 'service'],
    titleEnd: 'your clients.',
    titleHarvest: 'We harvest',
    lead:
      'B2B business development agency based in Metz, France. We support you step by step or end to end — targeting, multichannel outreach, appointment setting, (co-)running meetings, post-meeting follow-up — to help you sign new clients.',
    book: 'Book a 30-min diagnostic →',
    seeResults: 'See client results',
    painting: ['Pieter Bruegel the Elder · ', 'The Harvesters', ', 1565'],
    stats: [
      { n: '+50%', label: 'more traffic generated for a Luxembourg SaaS vendor' },
      { n: '€10M', label: 'in revenue signed together with our main partner' },
      { n: 'C-Level', label: 'the agency’s most targeted audience' },
      { n: '4 languages', label: 'FR · EN · DE · IT across Europe' },
    ],
    clientsTitle: '50+ B2B clients supported',
    problem: {
      eyebrow: 'The problem',
      title: 'B2B prospecting has become a job in its own right — and it eats up your teams’ time.',
      pains: [
        'Your consultants are not salespeople',
        'You’d rather close than hunt for opportunities',
        'Generic LinkedIn or email sequences no longer get replies',
        'Your CRM is full of cold leads that were never followed up',
        'Hiring an in-house SDR is slow, expensive and risky',
        'You’re entering new markets without really knowing where to start',
      ],
      roleStart: 'Our role: ',
      roleKey: 'take that load off you',
      roleEnd: ' and put your salespeople or consultants in front of prospects ready to buy, today or tomorrow.',
    },
    offers: {
      eyebrow: 'Our offer',
      title: 'Three ways to work together',
      side:
        'Every engagement starts with a free diagnostic. We point you to the format that fits your maturity, your internal resources and our staffing.',
      more: 'Discover the offer →',
      items: [
        {
          tag: 'The essentials (currently unavailable)',
          title: 'Outsourced prospecting',
          pitch:
            'A dedicated team that takes over your multichannel prospecting — LinkedIn, email, phone — and fills your salespeople’s calendars.',
          deliverables: ['Targeted, enriched prospect database', 'Personalised multichannel sequences', 'Qualified appointment setting', 'Weekly reporting'],
          href: '/en/prospecting-campaign',
          highlight: false,
        },
        {
          tag: 'Most requested',
          title: 'Outsourced sales force',
          pitch:
            'A senior salesperson dedicated to your account, plugged into your CRM and tools, who drives prospecting AND closing all the way to signature.',
          deliverables: ['Everything in the Prospecting offer', 'In-depth qualification & closing', 'CRM & sales process management', 'Weekly strategy meeting'],
          href: '/en/business-development',
          highlight: true,
        },
        {
          tag: 'The long game',
          title: 'Inbound & automation',
          pitch:
            'SEO, content, business automations — we build the system that attracts leads continuously and frees your teams from repetitive tasks.',
          deliverables: ['SEO strategy & content creation', 'Make automations (Advanced certified)', 'CRM enrichment & syncs', 'Custom dashboards'],
          href: '/en/digital-marketing-strategy',
          highlight: false,
        },
      ],
      footStart: 'Need something more one-off? We also offer ',
      footLink1: { label: 'sales consulting', href: '/conseil-developpement-commercial' },
      footMid: ' and ',
      footLink2: { label: 'sales talent headhunting', href: '/en/recruit-talent' },
      footEnd: '.',
    },
    process: {
      eyebrow: 'How it works',
      titleStart: 'From signature to first meetings, ',
      titleEm: 'in 4 weeks',
      titleEnd: '.',
      lead:
        'A proven methodology with more than 50 clients. Every step is scoped, delivered and validated with you — no black box. We work under your brand (white label).',
      steps: [
        { n: '01', title: 'Diagnostic', delay: 'Week 0', desc: 'A 30-minute call to understand your product, your sales cycle and your goals. We identify your ICP and the priority channel. No commitment.' },
        { n: '02', title: 'Scoping workshop', delay: 'Weeks 1–2', desc: 'A workshop to lock in the message, personas, qualification criteria and sequence structure. All documentation lives in a shared NOTION space — we favour asynchronous communication to respect your schedule.' },
        { n: '03', title: 'Operational launch', delay: 'Weeks 3–4', desc: 'Building the prospect database, setting up the tools (LinkedIn, email, CRM), writing the sequences. Phone prospecting starts. First conversion rates analysed. First meetings booked.' },
        { n: '04', title: 'Steering & iteration', delay: 'Month 2 → ∞', desc: 'Comparing conversion rates by target and by message. Running meetings, follow-up through to the sale. Weekly activity review, monthly and quarterly meetings focused on strategy.' },
      ],
    },
    results: {
      eyebrow: 'Client results',
      title: 'What our clients actually get.',
      items: [
        { client: 'Many Many', sector: 'Digital agency', metric: '+50%', label: 'more clicks on the website', note: '2 to 3× more impressions on search engines' },
        { client: 'Proaction International', sector: 'Industrial consulting', metric: 'Openings', label: 'of major accounts in France and Europe', note: '' },
        { client: 'Confidential', sector: 'Risk & compliance consulting, finance', metric: '+12 RFPs', label: 'answered on new accounts in one year', note: 'The firm brought the MESSOR resource in-house' },
        { client: 'InFine · VONA · Qontrol · CXP', sector: 'IT / Services', metric: 'Qualified meetings', label: 'by the hundreds for IT players (cybersecurity, cloud…)', note: 'Several years of collaboration on complex B2B cycles with technical decision-makers (CTO, CISO, CIO) — in tight markets where access to the right people is rare.' },
      ],
    },
    why: {
      credit: ['Pieter Bruegel the Elder — ', 'The Harvesters', ', 1565. Metropolitan Museum of Art, New York.'],
      eyebrow: 'Why Messor',
      titleStart: 'From the Latin ',
      titleEm: 'messis',
      titleEnd: ' — the harvest.',
      text:
        'We believe a good harvest has to be prepared. It takes time, method, sweat and tears, and people who know their ground. That is exactly what we do with your market.',
      button: { label: 'Meet the team', href: '/en/about-us-messor' },
      points: [
        { title: 'Salespeople who master data', desc: 'Trained in consultative selling AND modern tools (CRM, Sales Navigator, MAKE & API, AIRTABLE & Javascript). A rare profile: senior enough to talk to the C-level, technical enough to run the stack.' },
        { title: 'Multilingual for Europe', desc: 'FR, EN, DE, IT — we cover France as well as DACH, Italy and the UK, without outsourcing abroad.' },
        { title: 'Full transparency', desc: 'Real-time reporting, access to our tools, a weekly check-in. You know exactly what is done, for whom, and with what results.' },
        { title: 'No anonymous engine room', desc: 'Based in Metz, an identifiable team with master’s degrees, continuously trained. Your contacts don’t change every three months.' },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What our clients say',
      items: [
        { quote: 'What made the difference: command of the methodology, the quality of steering and reporting, and above all the quality of the human relationships built.', name: 'Matthias Poirier', role: 'CEO — MPG Partners' },
        { quote: 'Messor is now a key partner in Europe. They bring us several major new clients every year.', name: 'Christophe Cren', role: 'VP Business Development Europe — Proaction International' },
        { quote: 'In the tight IT market, Messor managed to identify many opportunities, several of which turned into sales.', name: 'Antoine Ramponi', role: 'Co-Founder & CEO — InFine' },
        { quote: 'In just 2 months, their ability to understand our sales pitch has already generated quality meetings with CTOs.', name: 'Emeric Lamour de Caslou', role: 'Sales Lead — Qontrol' },
        { quote: 'MESSOR defined and applied a suitable, effective prospecting methodology. We are very glad we called on their services.', name: 'Jérôme Bricout', role: 'Director of Operations — CXP' },
        { quote: 'A 50% increase in clicks, 2 to 3 times more impressions on search engines — the results are there.', name: 'Nicolas Legay', role: 'CEO — Many Many' },
        { quote: 'KSI has trusted MESSOR for two years already. A fruitful collaboration that is only just beginning.', name: 'Hubert Castellan', role: 'Founder & CEO — KSI Partners' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions we often get',
      items: [
        { q: 'How long does it take to see results?', a: 'The first meetings usually come between week 4 and week 6 — the time to build the database, calibrate the message and launch the first wave. A full B2B sales cycle then plays out over 3 to 9 months depending on the complexity of your offer. We tune the steering to maximise ROI at every step.' },
        { q: 'What is the difference between "prospecting" and an "outsourced sales force"?', a: 'Prospecting stops at booking a qualified meeting — your salespeople take over from there. An outsourced sales force goes further: we qualify, negotiate and move the opportunity forward in your CRM all the way to signature. You choose the scope based on your internal resources.' },
        { q: 'How do you choose the best prospecting agency?', a: 'Choosing a prospecting agency comes down to a few key criteria.\n\n• The agency’s clients: an agency with experience of companies like yours (consulting firm, SaaS company…) will adapt its techniques and tools to your specific needs.\n• Multichannel expertise: some agencies specialise in a single channel (LinkedIn), others take a multichannel approach — better suited to organisations that want to reach their targets through several touchpoints.\n• Your targets’ profile: if you address senior decision-makers, choose an agency able to combine several channels, especially the phone, which remains a very effective prospecting channel in 2025.\n• The team’s profiles: depending on your organisation, choose experts who match your needs (Business Developers, Inside Sales, Growth Hackers…) and fit your company’s DNA.\n• Data intelligence: mastering data is at the heart of sales performance in 2025. Challenge your contacts on their CRM tools and certifications… You would be surprised how unequal agencies are on this crucial topic.\n• Transparency and reporting: choose an agency that plays it straight and lets you follow results in real time.\n\nMESSOR is the ideal agency for consulting firms, service companies and software vendors. We offer a team of experts trained in sales 5.0, made up of young talent or experienced profiles, graduates of top business schools and based in France.' },
        { q: 'What role does AI play in business development in 2024?', a: 'Artificial intelligence (AI), and generative AI in particular, is transforming business development with concrete, varied use cases. Common applications include automatic transcription of interviews and writing and proofreading emails.\n\nGoing further, AI can use big data from APIs and CRM tools to analyse thousands of LinkedIn profiles and personalise your prospecting campaigns at scale, or summarise thousands of job ads to better understand your targets and their needs.\n\nWith its dual expertise in business development and advanced data management (APIs, tools, properties), MESSOR designs custom AI solutions to boost your sales productivity and optimise your prospecting efforts.' },
        { q: 'Do you only work in French?', a: 'No. Our team covers FR, EN, DE and IT. We regularly support expansion into DACH, Italy, Benelux and the UK, with team members native to the target countries.' },
        { q: 'How do you integrate my CRM and tools?', a: 'We work in your stack, not ours. HubSpot, Salesforce, Pipedrive, Attio — we plug in and operate from your CRM. We are Make Advanced certified to automate the syncs and enrichment you need.' },
      ],
    },
    contact: {
      title: 'Thirty minutes to see if it’s a fit.',
      text: 'Pierre-Jean answers you directly. No sales pitch — a frank conversation about your sales cycle, your current blockers and what would move the needle. If we’re the right partner, we’ll tell you. If not, we’ll tell you too.',
    },
  },
};

export const CLIENTS = ['UTrakk', 'CXP', 'C&S', 'La Lettre du Conseil', 'Proaction International', 'Vona', 'InFine', 'PAC', 'KSI Partners', 'Ressource', 'Seven', 'Many Many', 'Qontrol', 'MPG Partners'];
