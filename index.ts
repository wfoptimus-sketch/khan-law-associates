export type ContentStatus = 'published' | 'draft' | 'hidden';

export type UserRole = 'super_admin' | 'editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface SupabaseStatus {
  isConfigured: boolean;
  isConnected: boolean;
  message: string;
}


export interface WebsiteSettings {
  brandName: string;
  subtitle: string;
  logoType: 'text' | 'image';
  logoUrl?: string;
  establishedYear: string;
  primaryJurisdiction: string;
  tagline: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  officeAddress: string;
  officeHours: string;
  courtChamberAddress?: string;
  googleMapsEmbedUrl?: string;
  googleMapsDirectionsUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  emergencyNotice?: string;
}

export interface HeroSectionData {
  headline: string;
  supportingText: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  trustIndicators: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface AboutSectionData {
  title: string;
  kicker: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  keyHighlights: string[];
  ctaText: string;
  imageUrl?: string;
}

export interface MissionVisionData {
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyServices: string[];
  targetCourts: string;
  iconName: string;
  sortOrder: number;
  status: ContentStatus;
}

export interface AdvocateProfile {
  id: string;
  slug: string;
  fullName: string;
  designation: string;
  yearsOfExperience: string;
  photoUrl: string;
  education: string[];
  barEnrollment: string;
  barAssociation: string;
  courtsAndTribunals: string[];
  practiceAreas: string[];
  legalExpertise: string[];
  professionalMemberships: string[];
  languages: string[];
  biography: string;
  publications: string[];
  certifications: string[];
  professionalRecognition: string[];
  email?: string;
  phone?: string;
  sortOrder: number;
  status: ContentStatus;
}

export interface ExperienceStat {
  id: string;
  value: string;
  label: string;
  helperText?: string;
  sortOrder: number;
}

export interface ExperienceMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface LegalExpertiseItem {
  id: string;
  title: string;
  description: string;
  details?: string[];
  sortOrder: number;
  status: ContentStatus;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  suitableFor: string;
  sortOrder: number;
  status: ContentStatus;
}

export interface ApproachStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface LegalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publicationDate: string;
  readTime: string;
  featuredImageUrl: string;
  excerpt: string;
  content: string; // Markdown or rich text
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  status: ContentStatus;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  status: ContentStatus;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  matterCategory: string;
  feedback: string;
  hasClientPermission: boolean;
  status: ContentStatus;
  dateAdded: string;
}

export type ConsultationStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  legalMatter: string;
  preferredDate: string;
  preferredContactMethod: 'phone' | 'whatsapp' | 'email' | 'in_person' | 'online_meeting';
  briefDescription: string;
  attachmentName?: string;
  submittedAt: string;
  status: ConsultationStatus;
  adminNotes?: string;
}

export interface SectionVisibility {
  hero: boolean;
  trustIndicators: boolean;
  about: boolean;
  missionVision: boolean;
  values: boolean;
  practiceAreas: boolean;
  whyChooseUs: boolean;
  experience: boolean;
  expertise: boolean;
  team: boolean;
  approach: boolean;
  services: boolean;
  legalInsights: boolean;
  faqs: boolean;
  testimonials: boolean;
  consultationCta: boolean;
  contact: boolean;
}

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  canonicalBaseUrl: string;
  ogImage: string;
  ogSiteName: string;
  authorName: string;
}

export interface LegalPagesContent {
  disclaimer: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  privacyPolicy: {
    title: string;
    lastUpdated: string;
    content: string;
  };
  termsOfUse: {
    title: string;
    lastUpdated: string;
    content: string;
  };
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  uploadedAt: string;
  category: string;
  size?: string;
}

export interface RevisionSnapshot {
  id: string;
  timestamp: string;
  modifiedBy: string;
  section: string;
  summary: string;
  dataSnapshot: string;
}
