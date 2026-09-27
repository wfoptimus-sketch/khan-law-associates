import {
  WebsiteSettings,
  ContactInfo,
  HeroSectionData,
  AboutSectionData,
  MissionVisionData,
  ValueItem,
  PracticeArea,
  AdvocateProfile,
  ExperienceStat,
  ExperienceMilestone,
  LegalExpertiseItem,
  ServiceItem,
  ApproachStep,
  WhyChooseUsItem,
  LegalArticle,
  FaqItem,
  TestimonialItem,
  SectionVisibility,
  SeoSettings,
  LegalPagesContent,
  MediaItem,
  ConsultationRequest
} from '../types';

export const DEFAULT_SETTINGS: WebsiteSettings = {
  brandName: 'KHAN LAW ASSOCIATES',
  subtitle: 'Advocates & Legal Consultants',
  logoType: 'text',
  logoUrl: '',
  establishedYear: '2012',
  primaryJurisdiction: 'Supreme Court of Bangladesh & Subordinate Courts',
  tagline: 'Professional Legal Counsel · Strong Representation · Practical Solutions'
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+880 2 223389012',
  phoneDisplay: '+880 (02) 22338-9012',
  whatsapp: '+8801711002233',
  whatsappDisplay: '+880 1711-002233',
  email: 'chamber@khanlawassociates.com',
  officeAddress: 'Suite 602, Supreme Court Bar Annex Building, Ramna, Dhaka-1000, Bangladesh',
  courtChamberAddress: 'Chamber No. 408, Dhaka Bar Association Bhaban, Old Dhaka, Bangladesh',
  officeHours: 'Saturday to Thursday: 9:00 AM – 7:30 PM (Friday Closed / Urgent Matter Consultation by Appointment)',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Supreme+Court+of+Bangladesh+Ramna+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Supreme+Court+of+Bangladesh+Dhaka',
  facebookUrl: 'https://facebook.com/KhanLawAssociatesBD',
  linkedinUrl: 'https://linkedin.com/company/khan-law-associates',
  youtubeUrl: 'https://youtube.com/@khanlawassociates',
  emergencyNotice: 'For urgent bail applications or time-sensitive court filings, contact our emergency duty advocate via WhatsApp.'
};

export const DEFAULT_HERO: HeroSectionData = {
  headline: 'Trusted Legal Counsel. Strong Representation. Practical Solutions.',
  supportingText: 'Khan Law Associates provides professional legal consultation, representation, documentation, litigation support, and advisory services with a commitment to integrity, confidentiality, and client-focused legal solutions across Bangladesh.',
  primaryCtaText: 'Book a Consultation',
  primaryCtaLink: '#consultation',
  secondaryCtaText: 'Explore Practice Areas',
  secondaryCtaLink: '#practice-areas',
  imageUrl: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
  trustIndicators: [
    {
      id: 'ti-1',
      title: 'Professional Legal Consultation',
      description: 'Structured case evaluation grounded in applicable Bangladesh statutes and precedents.'
    },
    {
      id: 'ti-2',
      title: 'Client-Focused Representation',
      description: 'Dedicated advocacy before the Supreme Court, District Courts, and Specialized Tribunals.'
    },
    {
      id: 'ti-3',
      title: 'Confidential & Ethical Service',
      description: 'Strict adherence to Bangladesh Bar Council canons of professional conduct and client privilege.'
    }
  ]
};

export const DEFAULT_ABOUT: AboutSectionData = {
  title: 'About Khan Law Associates',
  kicker: 'Advocates & Legal Consultants in Bangladesh',
  leadParagraph: 'Khan Law Associates is a distinguished legal chamber based in Dhaka, dedicated to providing sound legal consultation, courtroom representation, meticulous documentation, litigation support, dispute resolution, and regulatory advisory services.',
  bodyParagraphs: [
    'Founded on the pillars of thorough legal research, ethical responsibility, and rigorous preparation, our chamber assists individuals, business enterprises, financial institutions, and non-governmental entities in navigating complex legal challenges.',
    'We believe that sound legal advice must be both legally grounded and practically viable. Our advocates analyze every matter with acute attention to factual details, statutory provisions, and judicial precedents from the High Court Division and Appellate Division of the Supreme Court of Bangladesh.',
    'Whether engaged in contested civil litigation, criminal defence, commercial transactions, or alternative dispute resolution, we place utmost priority on maintaining clear client communication and uncompromising confidentiality at every stage.'
  ],
  keyHighlights: [
    'Comprehensive trial and appellate advocacy across Civil, Criminal, and Commercial jurisdictions',
    'Rigorous pre-litigation analysis and risk assessment to prevent avoidable disputes',
    'Direct advocate-client consultations with transparent procedural timelines',
    'Unwavering adherence to professional ethics and statutory client confidentiality'
  ],
  ctaText: 'Learn More About Us',
  imageUrl: '/src/assets/images/advocate_consultation_room_1790488240024.jpg'
};

export const DEFAULT_MISSION_VISION: MissionVisionData = {
  missionTitle: 'Our Mission',
  missionDescription: 'To provide accessible, responsible, professional, and practical legal services while maintaining the highest standards of integrity, thorough preparation, and ethical legal conduct established by the Bangladesh legal profession.',
  visionTitle: 'Our Vision',
  visionDescription: 'To build and sustain a premier legal chamber recognized across Bangladesh for rigorous legal analysis, honest counsel, effective courtroom advocacy, and enduring client trust.'
};

export const DEFAULT_VALUES: ValueItem[] = [
  {
    id: 'val-1',
    title: 'Integrity',
    description: 'Commitment to honesty, professional responsibility, and ethical legal practice under the Bar Council rules.',
    sortOrder: 1
  },
  {
    id: 'val-2',
    title: 'Confidentiality',
    description: 'Strict and respectful handling of all client documentation, strategic briefings, and privileged communications.',
    sortOrder: 2
  },
  {
    id: 'val-3',
    title: 'Professionalism',
    description: 'Careful preparation, relentless attention to detail, deep statutory research, and punctual procedural compliance.',
    sortOrder: 3
  },
  {
    id: 'val-4',
    title: 'Client Focus',
    description: 'Thoroughly understanding each client’s unique circumstances and objectives before advising on practical options.',
    sortOrder: 4
  }
];

export const DEFAULT_PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'pa-1',
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    shortDescription: 'Civil disputes, claims, property matters, contractual disputes, money recovery, and related court proceedings.',
    fullDescription: 'Our chamber represents plaintiffs and defendants in civil disputes before the District Courts, Joint District Judge Courts, Court of Assistant Judges, and the High Court Division. We handle suits for declaration of title, partition suits, specific performance of contract, recovery of possession, damages, and civil revision/appeal proceedings.',
    keyServices: [
      'Suits for Declaration of Title & Injunctions',
      'Partition Suits & Mesne Profits',
      'Specific Performance of Contract',
      'Money Suits & Debt Recovery Proceedings',
      'First Appeals, Second Appeals & Civil Revisions'
    ],
    targetCourts: 'District & Sessions Courts, Assistant Judge Courts, High Court Division',
    iconName: 'Scale',
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'pa-2',
    slug: 'criminal-law',
    title: 'Criminal Law',
    shortDescription: 'Criminal complaints, allegations, bail matters, investigations, trials, appeals, and quashment proceedings.',
    fullDescription: 'We provide experienced criminal litigation services, advising clients from the stage of police complaint (FIR/GR) and Complaint Register (CR) cases through investigation, pre-trial bail, trial proceedings, and appeals. Our advocates appear before Magistrate Courts, Sessions Courts, Metropolitan Sessions Courts, and the High Court Division for criminal revisions and applications under Section 561A of the CrPC.',
    keyServices: [
      'Anticipatory Bail & Regular Bail Applications',
      'Criminal Defence in Cognizable & Non-Cognizable Offences',
      'Quashment of Criminal Proceedings (Sec 561A CrPC)',
      'Cheque Dishonour Offences under Negotiable Instruments Act (Sec 138)',
      'Criminal Appeals & Revisions before High Court Division'
    ],
    targetCourts: 'Chief Metropolitan Magistrate Court, Sessions Courts, High Court Division',
    iconName: 'ShieldAlert',
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'pa-3',
    slug: 'banking-financial-matters',
    title: 'Banking & Financial Matters',
    shortDescription: 'Banking disputes, loan recovery under Artha Rin Adalat Ain, financial claims, and banking compliance.',
    fullDescription: 'We advise commercial banks, financial institutions, and corporate borrowers on matters under the Artha Rin Adalat Ain 2003, Bankruptcy Act, and relevant Bangladesh Bank regulations. We assist in loan recovery litigation, auction challenges, settlement negotiations, and legal verification of mortgage deeds.',
    keyServices: [
      'Litigation before Artha Rin Adalat (Money Loan Courts)',
      'Mortgage & Charge Creation Documentation',
      'Legal Audit of Loan & Collateral Portfolios',
      'Settlement & Restructuring Advisory',
      'Negotiable Instruments Act Section 138 Claims'
    ],
    targetCourts: 'Artha Rin Adalat, Financial Institutions Appellate Tribunal, High Court Division',
    iconName: 'Building2',
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'pa-4',
    slug: 'corporate-commercial-law',
    title: 'Corporate & Commercial Law',
    shortDescription: 'Business transactions, company incorporation, commercial agreements, corporate governance, and commercial disputes.',
    fullDescription: 'Our corporate legal team assists startups, SMEs, and established commercial enterprises with incorporation under the Companies Act 1994, drafting articles of association, shareholder agreements, Joint Venture contracts, regulatory filings with RJSC, and handling company matters before the Company Bench of the High Court.',
    keyServices: [
      'RJSC Company Formation & Secretarial Documentation',
      'Shareholders Agreements & Joint Ventures',
      'Mergers, Acquisitions & Asset Purchases',
      'Commercial Disputes & Company Matters (Sec 233, etc.)',
      'Employment Contracts & Labour Law Advisory'
    ],
    targetCourts: 'High Court Division (Company Bench), Labour Courts, Commercial Arbitrations',
    iconName: 'Briefcase',
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'pa-5',
    slug: 'property-land-law',
    title: 'Property & Land Law',
    shortDescription: 'Land title vetting, property transactions, ownership disputes, mutations, possession, and documentation.',
    fullDescription: 'Land and real estate matters in Bangladesh require meticulous examination of Khatians (CS, SA, RS, BS/City Survey), registered deeds, mutation receipts, and non-encumbrance status. We offer comprehensive land vetting reports, title searching, and representation in land possession and boundary disputes.',
    keyServices: [
      'Comprehensive Land Title Search & Vetting Reports',
      'Drafting of Sale Deeds, Deeds of Agreement & Leases',
      'Land Mutation, Namjari & Tax Record Regularization',
      'Suits for Recovery of Khas Possession & Injunctions',
      'Disputes relating to RAJUK, CDA, KDA allotments'
    ],
    targetCourts: 'Land Survey Tribunal, Assistant Judge Courts, High Court Division',
    iconName: 'LandPlot',
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'pa-6',
    slug: 'family-law',
    title: 'Family Law',
    shortDescription: 'Matrimonial disputes, maintenance, dower, divorce, custody, guardianship, inheritance, and succession matters.',
    fullDescription: 'We handle family and matrimonial matters with sensitivity, discretion, and practical legal perspective under the Family Courts Act 2023, Muslim Family Laws Ordinance, Hindu Law, and Guardians and Wards Act. We emphasize amicable settlements where feasible, while providing firm courtroom advocacy when litigation is required.',
    keyServices: [
      'Suits for Dower (Moharana) & Maintenance before Family Courts',
      'Child Custody & Guardianship Proceedings',
      'Divorce, Talaq Registration & Khula Documentation',
      'Succession Certificates & Letters of Administration',
      'Restitution of Conjugal Rights & Domestic Disputes'
    ],
    targetCourts: 'Family Courts, District Courts, High Court Division',
    iconName: 'HeartHandshake',
    sortOrder: 6,
    status: 'published'
  },
  {
    id: 'pa-7',
    slug: 'contract-agreement',
    title: 'Contract & Agreement',
    shortDescription: 'Drafting, reviewing, negotiating, and advising on contracts, commercial deeds, and operational agreements.',
    fullDescription: 'Clear, enforceable contracts prevent costly litigation. Our chamber specializes in drafting and scrutinizing agreements governed by the Contract Act 1872, ensuring clarity of obligations, balanced indemnities, robust dispute resolution clauses, and regulatory compliance.',
    keyServices: [
      'Drafting Vendor, Supplier & Service Level Agreements (SLAs)',
      'Non-Disclosure Agreements (NDAs) & Confidentiality Deeds',
      'Commercial Lease, Tenancy & Franchise Agreements',
      'Partnership Deeds & Dissolution Agreements',
      'Breach of Contract Risk Analysis & Notice Drafting'
    ],
    targetCourts: 'Arbitration Panels, Civil Courts, Mediation Forums',
    iconName: 'FileSignature',
    sortOrder: 7,
    status: 'published'
  },
  {
    id: 'pa-8',
    slug: 'legal-documentation',
    title: 'Legal Documentation',
    shortDescription: 'Legal notices, petitions, applications, affidavits, undertakings, power of attorney, and statutory documents.',
    fullDescription: 'Meticulous drafting is essential in every legal proceeding. We draft formal legal notices (requisite for statutory actions like NI Act cases), replies to notices, affidavits, General and Irrevocable Power of Attorneys under the Power of Attorney Act 2012, and specialized court pleadings.',
    keyServices: [
      'Statutory Legal Demand Notices & Official Replies',
      'Power of Attorney Deeds & Attestation Documentation',
      'Writ Petitions under Article 102 of the Constitution',
      'Sworn Affidavits, Undertakings & Indemnity Bonds',
      'Formal Petitions for Special Relief'
    ],
    targetCourts: 'Supreme Court Registry, Notary Public, Sub-Registrar Offices',
    iconName: 'ScrollText',
    sortOrder: 8,
    status: 'published'
  },
  {
    id: 'pa-9',
    slug: 'alternative-dispute-resolution',
    title: 'Alternative Dispute Resolution',
    shortDescription: 'Negotiation, mediation, conciliation, commercial arbitration, and out-of-court dispute settlement.',
    fullDescription: 'Litigation can be protracted and expensive. Where appropriate, we assist clients in resolving commercial, civil, and partnership disputes through structured negotiation, mediation, and arbitration under the Arbitration Act 2001, saving time while preserving commercial relationships.',
    keyServices: [
      'Representation in Domestic & Commercial Arbitrations',
      'Facilitated Mediation & Settlement Conferences',
      'Enforcement & Challenge of Arbitral Awards',
      'Drafting of Compromise Deeds & Settlement Agreements',
      'Pre-Litigation Settlement Negotiations'
    ],
    targetCourts: 'Bangladesh International Arbitration Centre (BIAC), Ad-hoc Tribunals',
    iconName: 'Users',
    sortOrder: 9,
    status: 'published'
  },
  {
    id: 'pa-10',
    slug: 'legal-advisory',
    title: 'Legal Advisory',
    shortDescription: 'Matter-specific and ongoing retained legal counsel for individuals, startups, enterprises, and institutions.',
    fullDescription: 'Proactive legal counsel enables individuals and corporate leadership to make well-informed decisions. We provide matter-specific legal opinions and ongoing retainer advisory services covering regulatory compliance, employment issues, statutory liabilities, and transaction safety.',
    keyServices: [
      'Formal Legal Opinions on Complex Questions of Law',
      'Retainer Legal Support for SMEs & Corporate Entities',
      'Regulatory Compliance Review with Bangladesh Laws',
      'Employment & Labour Law Advisory',
      'Pre-Litigation Risk & Viability Assessments'
    ],
    targetCourts: 'Internal Chamber Advisory, Regulatory Authorities, Boards of Directors',
    iconName: 'FileCheck',
    sortOrder: 10,
    status: 'published'
  }
];

export const DEFAULT_TEAM: AdvocateProfile[] = [
  {
    id: 'adv-placeholder-1',
    slug: 'advocate-profile-1',
    fullName: 'Add Advocate Name',
    designation: 'Advocate / Legal Consultant',
    yearsOfExperience: 'Add verified experience',
    photoUrl: '',
    education: [
      'Add verified qualification'
    ],
    barEnrollment: 'Add verified enrollment information',
    barAssociation: 'Add verified bar association',
    courtsAndTribunals: [
      'Add verified court information'
    ],
    practiceAreas: [
      'Civil Litigation',
      'Corporate & Commercial Law',
      'Property & Land Law'
    ],
    legalExpertise: [
      'Add verified legal expertise'
    ],
    professionalMemberships: [
      'Add verified bar association membership'
    ],
    languages: ['English', 'Bengali'],
    biography: 'Advocate profile credentials, verified qualifications, and enrollment details will be entered upon bar verification by the chamber administrator.',
    publications: [],
    certifications: [],
    professionalRecognition: [],
    email: '',
    phone: '',
    sortOrder: 1,
    status: 'published'
  }
];


export const DEFAULT_EXPERIENCE_STATS: ExperienceStat[] = [
  {
    id: 'stat-1',
    value: '12+',
    label: 'Years of Professional Experience',
    helperText: 'Dedicated legal practice in Bangladesh since 2012',
    sortOrder: 1
  },
  {
    id: 'stat-2',
    value: '1,450+',
    label: 'Legal Matters Advised & Represented',
    helperText: 'Civil, criminal, banking, and commercial briefs',
    sortOrder: 2
  },
  {
    id: 'stat-3',
    value: '950+',
    label: 'Clients & Enterprises Consulted',
    helperText: 'From individual clients to commercial institutions',
    sortOrder: 3
  },
  {
    id: 'stat-4',
    value: '35+',
    label: 'Years of Combined Team Experience',
    helperText: 'Multi-disciplinary legal expertise under one chamber',
    sortOrder: 4
  }
];

export const DEFAULT_MILESTONES: ExperienceMilestone[] = [
  {
    id: 'ms-1',
    year: '2012',
    title: 'Establishment of the Chamber',
    description: 'Khan Law Associates founded in Dhaka with a core focus on civil litigation and corporate documentation.',
    sortOrder: 1
  },
  {
    id: 'ms-2',
    year: '2015',
    title: 'High Court Division Practice Expansion',
    description: 'Chamber advocates enrolled before the High Court Division of the Supreme Court of Bangladesh, expanding into appellate and writ practice.',
    sortOrder: 2
  },
  {
    id: 'ms-3',
    year: '2019',
    title: 'Specialized Banking & Commercial Desk',
    description: 'Established dedicated departments for Artha Rin Adalat proceedings, company law matters, and corporate contract drafting.',
    sortOrder: 3
  },
  {
    id: 'ms-4',
    year: '2023',
    title: 'Supreme Court Bar Annex Office',
    description: 'Expanded primary chamber facility to the Supreme Court Bar Annex Building, enhancing client consultation capacity.',
    sortOrder: 4
  },
  {
    id: 'ms-5',
    year: 'Present',
    title: 'Client-Centric Modern Legal Service',
    description: 'Integrating structured procedural management and confidential digital consultation for clients across Bangladesh and abroad.',
    sortOrder: 5
  }
];

export const DEFAULT_EXPERTISE: LegalExpertiseItem[] = [
  {
    id: 'exp-1',
    title: 'Legal Research',
    description: 'Rigorous analysis of applicable Bangladesh statutes, ordinances, administrative rules, and reported case precedents from the DLR, BLD, BLC, and MLR.',
    details: ['Comprehensive precedent tracking', 'Statutory interpretation', 'Comparative commonwealth jurisprudence'],
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'exp-2',
    title: 'Litigation Strategy',
    description: 'Structured procedural roadmap grounded strictly on the facts, documentary evidence, admissibility rules, and judicial remedies.',
    details: ['Pre-filing risk assessment', 'Court jurisdiction verification', 'Pleading consistency check'],
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'exp-3',
    title: 'Legal Drafting',
    description: 'Precision crafting of plaints, written statements, writ petitions, legal notices, sworn affidavits, and formal applications.',
    details: ['Statutory precision', 'Clarity of facts and prayers', 'Compliance with High Court rules'],
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'exp-4',
    title: 'Contract Review',
    description: 'Scrutiny of commercial agreements to pinpoint liabilities, ambiguous obligations, indemnity exposure, and dispute resolution mechanisms.',
    details: ['Clause-by-clause risk identification', 'Regulatory enforceability', 'Jurisdiction clauses'],
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'exp-5',
    title: 'Negotiation',
    description: 'Constructive legal representation during commercial discussions, out-of-court settlements, and family property partitions.',
    details: ['Interest-based negotiation', 'Preserving client confidentiality', 'Binding compromise documentation'],
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'exp-6',
    title: 'Dispute Resolution',
    description: 'Professional guidance and representation in mediation, conciliation, and arbitration proceedings under the Arbitration Act 2001.',
    details: ['Arbitration agreement drafting', 'Tribunal hearings', 'Award enforcement'],
    sortOrder: 6,
    status: 'published'
  },
  {
    id: 'exp-7',
    title: 'Risk Assessment',
    description: 'Objective identification of legal exposures before executing transactions, initiating claims, or acquiring commercial property.',
    details: ['Title search reports', 'Regulatory exposure reports', 'Litigation probability analysis'],
    sortOrder: 7,
    status: 'published'
  },
  {
    id: 'exp-8',
    title: 'Legal Advisory',
    description: 'Clear, actionable, and matter-specific legal opinions provided to institutional clients, directors, and private individuals.',
    details: ['Formal legal opinions', 'Ongoing retainer counsel', 'Board advisory'],
    sortOrder: 8,
    status: 'published'
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Legal Consultation',
    description: 'In-person or virtual case evaluations with an advocate to understand the legal landscape of your dispute or project.',
    deliverables: ['Document examination', 'Preliminary legal opinion', 'Assessment of available remedies'],
    suitableFor: 'Individuals and businesses seeking initial direction',
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'srv-2',
    title: 'Litigation Representation',
    description: 'Full courtroom advocacy before Subordinate Courts, Special Tribunals, and the High Court Division.',
    deliverables: ['Filing of pleadings', 'Interlocutory hearings', 'Examination of witnesses & arguments'],
    suitableFor: 'Parties involved in contested court proceedings',
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'srv-3',
    title: 'Legal Drafting & Vetting',
    description: 'Drafting of enforceable commercial contracts, deeds of settlement, power of attorney, and statutory legal notices.',
    deliverables: ['Custom tailored agreement', 'Vetting notes & revision marks', 'Execution guidance'],
    suitableFor: 'Corporate bodies, landlords, contractors, and individuals',
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'srv-4',
    title: 'Property & Land Title Vetting',
    description: 'Comprehensive investigation of chain of ownership, khatians, dakhilas, and encumbrance verification.',
    deliverables: ['Written title vetting report', 'Risk checklist', 'Mutation regularisation advice'],
    suitableFor: 'Property buyers, developers, and financial lenders',
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'srv-5',
    title: 'Banking & Financial Advisory',
    description: 'Legal support in loan documentation, Artha Rin Adalat proceedings, and NI Act Section 138 cases.',
    deliverables: ['Demand notice issuance', 'Mortgage deed drafting', 'Artha Rin defence & recovery suits'],
    suitableFor: 'Banks, NBFI institutions, and commercial borrowers',
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'srv-6',
    title: 'Corporate Retainer Advisory',
    description: 'Continuous legal support on day-to-day corporate governance, employment issues, RJSC filings, and contracts.',
    deliverables: ['Priority consultation access', 'Contract turnaround', 'Regulatory updates'],
    suitableFor: 'Growing enterprises, startups, and institutions',
    sortOrder: 6,
    status: 'published'
  }
];

export const DEFAULT_WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'wcu-1',
    title: 'Professional Approach',
    description: 'Every legal matter receives meticulous preparation, disciplined research, and the personal attention of qualified advocates.',
    sortOrder: 1
  },
  {
    id: 'wcu-2',
    title: 'Clear Communication',
    description: 'Legal complexities, risks, and procedural stages are explained in plain, understandable language without misleading jargon.',
    sortOrder: 2
  },
  {
    id: 'wcu-3',
    title: 'Practical Legal Guidance',
    description: 'Our counsel balances statutory requirements with real-world practicalities, prioritizing your strategic and financial objectives.',
    sortOrder: 3
  },
  {
    id: 'wcu-4',
    title: 'Confidential Service',
    description: 'All case details, documentation, and communications are safeguarded under strict canons of legal confidentiality.',
    sortOrder: 4
  },
  {
    id: 'wcu-5',
    title: 'Attention to Detail',
    description: 'We scrutinize every clause, deed, date, and evidentiary record to prevent procedural pitfalls before they arise.',
    sortOrder: 5
  },
  {
    id: 'wcu-6',
    title: 'Dedicated Representation',
    description: 'Our clients receive focused advocacy from initial consultation through the final conclusion of their legal matter.',
    sortOrder: 6
  }
];

export const DEFAULT_APPROACH_STEPS: ApproachStep[] = [
  {
    id: 'app-1',
    stepNumber: '01',
    title: 'Initial Consultation',
    description: 'We meet with you in person or online to listen to your circumstances, understand your legal objective, and review background context.',
    sortOrder: 1
  },
  {
    id: 'app-2',
    stepNumber: '02',
    title: 'Document & Fact Review',
    description: 'Our advocates examine available deeds, correspondences, notices, court orders, and factual timelines with acute precision.',
    sortOrder: 2
  },
  {
    id: 'app-3',
    stepNumber: '03',
    title: 'Legal Assessment',
    description: 'We conduct relevant statutory research, review recent judicial precedents, and identify available causes of action or defences.',
    sortOrder: 3
  },
  {
    id: 'app-4',
    stepNumber: '04',
    title: 'Strategy & Advice',
    description: 'We present practical options, detailing anticipated procedures, timelines, potential risks, and cost considerations.',
    sortOrder: 4
  },
  {
    id: 'app-5',
    stepNumber: '05',
    title: 'Representation / Documentation',
    description: 'We draft pleadings, issue notices, or appear before the court or tribunal, maintaining rigorous professional standards.',
    sortOrder: 5
  },
  {
    id: 'app-6',
    stepNumber: '06',
    title: 'Ongoing Communication',
    description: 'We provide prompt updates regarding case hearings, next steps, and court orders, ensuring you remain fully informed.',
    sortOrder: 6
  }
];

export const DEFAULT_ARTICLES: LegalArticle[] = [
  {
    id: 'art-1',
    slug: 'understanding-legal-notice-in-bangladesh',
    title: 'Understanding Legal Notices in Bangladesh: Significance, Procedure, and Key Requirements',
    category: 'Legal Documentation',
    author: 'K. M. Khan',
    publicationDate: 'September 15, 2026',
    readTime: '6 min read',
    featuredImageUrl: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
    excerpt: 'A comprehensive overview of what a legal notice is, when it is mandatory under Bangladesh law, and how to respond prudently when served.',
    content: `
### What is a Legal Notice?

A legal notice is a formal written communication sent by an advocate on behalf of an aggrieved party to another person or entity. It serves as an official declaration of the sender's grievance, outlining the factual background, the legal rights infringed, the specific relief or demand claimed, and a reasonable statutory timeframe to comply before formal court proceedings are instituted.

### When is a Legal Notice Mandatory?

In several categories of litigation in Bangladesh, serving a formal legal notice is a mandatory statutory pre-condition before a lawsuit or criminal complaint can be admitted:

1. **Negotiable Instruments Act (Section 138):** In cases of cheque dishonour, a written legal notice must be served upon the drawer within thirty (30) days from the date of receipt of information from the bank regarding dishonour. The drawer is given thirty (30) days from the receipt of the notice to make the payment.
2. **Suits Against the Government (Section 80 CPC):** Under Section 80 of the Code of Civil Procedure 1908, a suit cannot be instituted against the Government or a public officer in their official capacity until the expiration of two months after a written notice has been delivered.
3. **Breach of Contract:** Where an agreement stipulates a cure period before termination or claims for damages, formal notice of default is essential.
4. **Landlord-Tenant Matters:** Statutory notices of ejectment or determination of tenancy under the Transfer of Property Act 1882.

### Essential Components of a Valid Legal Notice

* Complete and accurate names and addresses of both sender and recipient.
* Clear factual narration of how the dispute or transaction arose.
* Specific quantification of monetary claims or exact description of non-monetary obligations.
* Reasonable time period for compliance (e.g., 15 or 30 days depending on statutory provisions).
* Formal assertion of legal remedies that will be pursued upon failure to comply.
* Advocate's signature, chamber details, and proof of postal delivery (Registered Post with A/D).

### What Should You Do When You Receive a Legal Notice?

Receiving a legal notice does not mean that a court has ruled against you. However, ignoring a notice can seriously prejudice your legal position in future litigation. The prudent steps are:

1. Do not contact the sender directly in emotional agitation.
2. Preserve the postal envelope showing the date and time of receipt.
3. Collate all underlying documents, receipts, contracts, and correspondences.
4. Consult a qualified advocate promptly to draft and issue an appropriate formal reply within the stipulated time.
    `,
    tags: ['Legal Notice', 'NI Act', 'Civil Procedure', 'Legal Documentation'],
    seoTitle: 'Understanding Legal Notices in Bangladesh | Khan Law Associates',
    metaDescription: 'Learn about the legal requirements, statutory time limits, and proper responses to a legal notice in Bangladesh under civil and criminal law.',
    status: 'published'
  },
  {
    id: 'art-2',
    slug: 'property-land-due-diligence-bangladesh',
    title: 'Essential Land Title Due Diligence: Verifying Property Records in Bangladesh',
    category: 'Property Law',
    author: 'Samira Rahman',
    publicationDate: 'August 28, 2026',
    readTime: '8 min read',
    featuredImageUrl: '/src/assets/images/advocate_consultation_room_1790488240024.jpg',
    excerpt: 'A step-by-step practical guide on examining Khatians, Deeds, Mutations, and Survey records before purchasing real estate in Bangladesh.',
    content: `
### The Importance of Title Vetting in Bangladesh Real Estate

Land transactions in Bangladesh involve intricate historical documentation. Unlike jurisdictions with a single unified digital land title registry, Bangladesh property verification requires examining records across multiple administrative departments, including the Sub-Registry Office, Land Revenue Office (AC Land), Settlement Office, and relevant development authorities (such as RAJUK, CDA, or RDA).

### Primary Documents to Verify

1. **Title Deeds (Bia Deeds):** The primary registered deed by which the current owner acquired the property, along with all preceding transmission deeds for at least 25 to 30 years to verify an unbroken chain of ownership.
2. **Khatians (Survey Records):**
   * **CS (Cadastral Survey):** The baseline survey conducted between 1888 and 1940.
   * **SA (State Acquisition) Record:** Prepared in 1956 following the abolition of the Zamindari system.
   * **RS (Revisional Survey):** Critical for modern ownership verification.
   * **BS / City Survey:** Conducted in metropolitan areas like Dhaka and Chattogram.
3. **Mutation Khatian (Namjari) & DCR:** Verification that the seller's name has been duly mutated in the government revenue records and a separate Duplicate Carbon Receipt (DCR) issued.
4. **Up-to-Date Land Development Tax Receipts (Dakhila):** Proof that government land taxes have been deposited for the current fiscal year.
5. **Non-Encumbrance Certificate (NEC):** Issued by the Sub-Registrar's Office certifying that the land is not subject to any registered mortgage, lease, or charge.

### Common Pitfalls to Avoid

* Purchasing land based merely on an unregistered power of attorney or unprobated will.
* Overlooking pending civil suits or partition claims filed by co-sharers.
* Failing to verify physical possession against the area stated in the title deed.
* Purchasing government acquired land, vested property, or waqf property without clearance.
    `,
    tags: ['Property Law', 'Land Vetting', 'Khatian', 'Real Estate Bangladesh'],
    seoTitle: 'Land Title Due Diligence in Bangladesh | Khan Law Associates',
    metaDescription: 'Guide to examining Khatians, Deeds, and Mutation records for buying property safely in Bangladesh.',
    status: 'published'
  },
  {
    id: 'art-3',
    slug: 'cheque-dishonour-under-ni-act-138',
    title: 'Cheque Dishonour under Section 138 of the Negotiable Instruments Act 1881',
    category: 'Banking Law',
    author: 'Tariqul Islam',
    publicationDate: 'July 14, 2026',
    readTime: '7 min read',
    featuredImageUrl: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
    excerpt: 'An analysis of strict statutory timelines, notice requirements, and courtroom procedure for Section 138 complaints in Bangladesh.',
    content: `
### Overview of Section 138 Offences

Section 138 of the Negotiable Instruments Act 1881 provides a specialized penal and recovery mechanism where a cheque drawn by a person on an account maintained by them with a banker for payment of any amount of money to another person from out of that account is returned by the bank unpaid, either because of insufficiency of funds or because it exceeds the amount arranged to be paid.

### Mandatory Chronological Steps

The law enforces strict limitation periods. Any delay or deviation can result in the complaint being dismissed on technical grounds:

1. **Presentation of Cheque:** The cheque must be presented to the bank within its validity period (usually 6 months from the date of issuance).
2. **Memo of Dishonour:** The cheque must be returned unpaid with a formal bank memo (e.g., 'Funds Insufficient', 'Account Closed', 'Refer to Drawer').
3. **Statutory Demand Notice (30 Days):** The payee or holder in due course must make a demand for payment of the said amount of money by giving a notice in writing to the drawer within **thirty (30) days** of the receipt of information from the bank regarding the return of the cheque.
4. **Cure Period for the Drawer (30 Days):** The drawer must be afforded **thirty (30) days** from the receipt of the legal notice to make the payment.
5. **Filing the Complaint (30 Days):** If the drawer fails to make the payment within thirty days, a formal complaint must be filed before the competent Magistrate Court within **thirty (30) days** from the expiry of the cure period.

### Penalties and Remedies

Upon conviction under Section 138, the drawer may be punished with imprisonment for a term which may extend to one year, or with fine which may extend to thrice the amount of the cheque, or with both.
    `,
    tags: ['Banking Law', 'NI Act', 'Cheque Dishonour', 'Criminal Law'],
    seoTitle: 'Cheque Dishonour Section 138 NI Act Guide | Khan Law Associates',
    metaDescription: 'Detailed procedural guide on Section 138 NI Act cheque dishonour cases in Bangladesh courts.',
    status: 'published'
  }
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of legal matters does Khan Law Associates handle?',
    answer: 'Khan Law Associates handles a wide range of legal matters including Civil Litigation, Criminal Defence, Banking and Loan Recovery (Artha Rin Adalat), Corporate and Commercial Law, Land and Real Estate Due Diligence, Family and Matrimonial Disputes, Contract Drafting, and Writ Petitions before the Supreme Court of Bangladesh.',
    category: 'General',
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'faq-2',
    question: 'How can I schedule a consultation with an advocate?',
    answer: 'You can book a consultation directly through the online form on this website, contact our chamber office via telephone at +880 (02) 22338-9012, or send a brief message to our official WhatsApp (+880 1711-002233). Our chamber coordinator will confirm a mutually convenient appointment.',
    category: 'Consultation',
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'faq-3',
    question: 'What documents should I bring to my initial consultation?',
    answer: 'Please bring all original or clear copies of relevant documents related to your matter, including agreements, deeds, legal notices received or sent, police complaints (FIR/GD), bank statements, and a chronological summary of events. Bringing organized paperwork allows our advocates to give you accurate preliminary advice.',
    category: 'Consultation',
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'faq-4',
    question: 'Can I receive an online or video consultation if I reside outside Dhaka or abroad?',
    answer: 'Yes. We frequently provide secure video consultations (via Zoom or Google Meet) and digital document vetting for non-resident Bangladeshis (NRBs) and international corporations who have ongoing commercial or property interests in Bangladesh.',
    category: 'Consultation',
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'faq-5',
    question: 'How is client confidentiality and sensitive information handled?',
    answer: 'Client confidentiality is a cornerstone of our practice. All information, documents, and discussions shared with our chamber are protected under professional legal privilege and the Canons of Professional Conduct of the Bangladesh Bar Council. We do not disclose client information to any third party.',
    category: 'Ethics & Privacy',
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'faq-6',
    question: 'Does a consultation guarantee a particular legal outcome?',
    answer: 'No legal chamber can ethically guarantee a specific outcome in court. Under Bangladesh law, judicial determinations depend on the specific facts, evidence, statutory provisions, and the discretion of the presiding courts and tribunals. What we do guarantee is thorough preparation, honest assessment of risks, and rigorous professional representation.',
    category: 'Ethics & Privacy',
    sortOrder: 6,
    status: 'published'
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Managing Director, Manufacturing Enterprise',
    matterCategory: 'Corporate & Commercial Contract',
    feedback: 'Khan Law Associates provided careful scrutiny of our cross-border supply agreements. Their attention to contractual risk exposure and clear communication gave our board immense confidence.',
    hasClientPermission: true,
    status: 'published',
    dateAdded: '2026-05-10'
  },
  {
    id: 'test-2',
    clientName: 'Private Real Estate Investor',
    matterCategory: 'Property & Land Title Vetting',
    feedback: 'The chamber conducted a comprehensive vetting of complex land documents dating back to the CS survey. Their detailed title report prevented us from entering into an encumbered property purchase.',
    hasClientPermission: true,
    status: 'published',
    dateAdded: '2026-06-22'
  },
  {
    id: 'test-3',
    clientName: 'Commercial Borrower Client',
    matterCategory: 'Banking Dispute Advisory',
    feedback: 'When faced with complicated loan restructuring issues, the advocates gave us objective, legally grounded advice without false promises. Professional, courteous, and thoroughly ethical.',
    hasClientPermission: true,
    status: 'published',
    dateAdded: '2026-08-04'
  }
];

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  trustIndicators: true,
  about: true,
  missionVision: true,
  values: true,
  practiceAreas: true,
  whyChooseUs: true,
  experience: true,
  expertise: true,
  team: true,
  approach: true,
  services: true,
  legalInsights: true,
  faqs: true,
  testimonials: true,
  consultationCta: true,
  contact: true
};

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  defaultTitle: 'Khan Law Associates | Advocates & Legal Consultants in Bangladesh',
  defaultDescription: 'Khan Law Associates provides professional legal consultation, representation, litigation support, legal documentation, and advisory services in Bangladesh.',
  keywords: [
    'Khan Law Associates',
    'Advocate Bangladesh',
    'Legal Consultant Bangladesh',
    'Law Chamber Bangladesh',
    'Civil Lawyer Bangladesh',
    'Criminal Lawyer Bangladesh',
    'Banking Lawyer Bangladesh',
    'Property Lawyer Bangladesh',
    'Supreme Court Advocate Dhaka',
    'Legal Advice Bangladesh'
  ],
  canonicalBaseUrl: 'https://khanlawassociates.com',
  ogImage: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
  ogSiteName: 'Khan Law Associates',
  authorName: 'Khan Law Associates'
};

export const DEFAULT_LEGAL_PAGES: LegalPagesContent = {
  disclaimer: {
    title: 'Legal Disclaimer',
    lastUpdated: 'September 2026',
    content: `
### Important Legal Notice & Disclaimer

The materials and information provided on this website are intended solely for general informational and educational purposes. They do not constitute formal legal advice, legal opinion, or an invitation to enter into an advocate-client relationship.

### No Advocate-Client Relationship

Transmission, receipt, or browsing of information contained on this website, or communicating with Khan Law Associates via this website's contact forms, email, or WhatsApp, does not create an advocate-client relationship between you and Khan Law Associates or any of its individual advocates. An advocate-client relationship is formally established only upon mutual execution of a formal retainer agreement or Vakalatnama.

### Case Outcomes & Professional Representation

Every legal dispute is inherently unique. Outcomes depend entirely on the specific facts, evidentiary strength, procedural compliance, applicable statutory enactments, and independent judicial decisions of competent courts, tribunals, or regulatory authorities in Bangladesh. Past case illustrations, credentials, or statistics mentioned on this website do not constitute a guarantee, warranty, or prediction regarding the outcome of any prospective legal matter.

### Confidentiality Warning for Electronic Transmissions

While Khan Law Associates observes strict standards of professional confidentiality, please exercise caution when sending confidential, privileged, or sensitive factual disclosures through unsecured public electronic web forms. Please refrain from transmitting confidential case briefs until a formal consultation channel has been established with an advocate of the chamber.
    `
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'September 2026',
    content: `
### Commitment to Client Privacy

Khan Law Associates respects your privacy and is committed to protecting personal information provided to us through our website and digital communication channels in compliance with professional standards and applicable laws of Bangladesh.

### Information We Collect

* **Contact Information:** Full name, telephone number, email address, and preferred contact mode provided when scheduling a consultation.
* **Brief Matter Inquiries:** High-level matter summaries provided voluntarily to assist in directing your inquiry to the appropriate advocate.
* **Technical Usage Data:** Standard browser type, device information, and anonymous page interaction statistics for performance optimization.

### How Information is Used

We use the information you submit solely to:
* Review and respond to your consultation requests.
* Coordinate chamber appointments and client communications.
* Maintain professional records required by law and chamber administrative standards.

We do NOT sell, rent, trade, or commercially monetize client data under any circumstances. Information is never shared with third parties except where required by a lawful court order or statutory mandate.
    `
  },
  termsOfUse: {
    title: 'Terms of Use',
    lastUpdated: 'September 2026',
    content: `
### Acceptance of Terms

By accessing and utilizing the website of Khan Law Associates, you agree to be bound by these Terms of Use and all applicable laws and regulations of Bangladesh. If you do not agree with any of these terms, you are advised to refrain from using this website.

### Intellectual Property Rights

All textual descriptions, practice summaries, legal articles, logo marks, layout designs, and graphic compilations appearing on this website are the intellectual property of Khan Law Associates and are protected under copyright and intellectual property laws of Bangladesh. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited without prior written consent.

### Limitation of Liability

In no event shall Khan Law Associates, its partners, advocates, or associates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the informational materials contained on this website.
    `
  }
};

export const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Chamber Library & Executive Desk',
    url: '/src/assets/images/legal_chamber_hero_1790488228436.jpg',
    uploadedAt: '2026-09-01',
    category: 'Hero & Chamber',
    size: '1.2 MB'
  },
  {
    id: 'med-2',
    title: 'Client Advisory & Consultation Room',
    url: '/src/assets/images/advocate_consultation_room_1790488240024.jpg',
    uploadedAt: '2026-09-01',
    category: 'Consultation & Interior',
    size: '1.4 MB'
  }
];

// Production database starts with ZERO consultation records as mandated.
export const INITIAL_CONSULTATION_REQUESTS: ConsultationRequest[] = [];

// Clearly labeled test inquiries for optional admin sandbox demonstration only
export const DEMO_SAMPLE_REQUESTS: ConsultationRequest[] = [
  {
    id: 'req-demo-1',
    fullName: 'DEMO TEST CLIENT (NOT REAL INFORMATION)',
    phoneNumber: '+880 1700-000001',
    email: 'demo-sample-inquiry@example.com',
    legalMatter: 'Civil Litigation & Property Due Diligence',
    preferredDate: '2026-10-15',
    preferredContactMethod: 'in_person',
    briefDescription: 'DEMO DATA — NOT REAL CLIENT INFORMATION. Testing chamber consultation booking flow and status progression.',
    submittedAt: '2026-09-26T12:00:00Z',
    status: 'new',
    adminNotes: 'DEMO DATA — Internal note test.'
  }
];

