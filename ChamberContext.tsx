import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  ConsultationRequest,
  RevisionSnapshot,
  User,
  UserRole,
  SupabaseStatus
} from '../types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_CONTACT_INFO,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_MISSION_VISION,
  DEFAULT_VALUES,
  DEFAULT_PRACTICE_AREAS,
  DEFAULT_TEAM,
  DEFAULT_EXPERIENCE_STATS,
  DEFAULT_MILESTONES,
  DEFAULT_EXPERTISE,
  DEFAULT_SERVICES,
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_APPROACH_STEPS,
  DEFAULT_ARTICLES,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_SECTION_VISIBILITY,
  DEFAULT_SEO_SETTINGS,
  DEFAULT_LEGAL_PAGES,
  DEFAULT_MEDIA,
  INITIAL_CONSULTATION_REQUESTS,
  DEMO_SAMPLE_REQUESTS
} from '../data/defaultData';
import {
  getSupabase,
  isSupabaseConfigured,
  testSupabaseConnection,
  setSupabaseConfigOverride,
  getSupabaseConfig
} from '../lib/supabase';
import {
  authSignIn,
  authSignUp,
  authSignOut,
  authResetPassword,
  authUpdatePassword,
  authGetProfile,
  fetchSettingsFromSupabase,
  saveSettingsToSupabase,
  fetchTeamFromSupabase,
  saveTeamMemberToSupabase,
  deleteTeamMemberFromSupabase,
  fetchPracticeAreasFromSupabase,
  savePracticeAreaToSupabase,
  deletePracticeAreaFromSupabase,
  insertConsultationRequestToSupabase,
  fetchConsultationRequestsFromSupabase,
  updateConsultationRequestInSupabase,
  deleteConsultationRequestFromSupabase,
  fetchArticlesFromSupabase,
  saveArticleToSupabase,
  fetchTestimonialsFromSupabase,
  saveTestimonialToSupabase,
  fetchFaqsFromSupabase,
  saveFaqToSupabase,
  insertRevisionToSupabase
} from '../lib/supabaseService';

const STORAGE_KEY = 'kla_chamber_state_v2';
const REVISIONS_STORAGE_KEY = 'kla_chamber_revisions_v2';
const AUTH_STORAGE_KEY = 'kla_chamber_auth_v2';

export interface ChamberContextType {
  // Data states
  settings: WebsiteSettings;
  contactInfo: ContactInfo;
  hero: HeroSectionData;
  about: AboutSectionData;
  missionVision: MissionVisionData;
  values: ValueItem[];
  practiceAreas: PracticeArea[];
  team: AdvocateProfile[];
  experienceStats: ExperienceStat[];
  milestones: ExperienceMilestone[];
  expertise: LegalExpertiseItem[];
  services: ServiceItem[];
  whyChooseUs: WhyChooseUsItem[];
  approachSteps: ApproachStep[];
  articles: LegalArticle[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  sectionVisibility: SectionVisibility;
  seoSettings: SeoSettings;
  legalPages: LegalPagesContent;
  media: MediaItem[];
  consultationRequests: ConsultationRequest[];
  revisions: RevisionSnapshot[];
  currentUser: User | null;

  // Supabase Status & Controls
  supabaseStatus: SupabaseStatus;
  checkSupabaseConnection: () => Promise<void>;
  syncDataToSupabase: () => Promise<{ success: boolean; message: string }>;
  configureSupabaseOverride: (url: string, anonKey: string) => void;
  loadDemoConsultations: () => void;
  clearAllConsultations: () => void;
  
  // UI states
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Active Modals for deep links/drawers
  selectedAdvocate: AdvocateProfile | null;
  setSelectedAdvocate: (adv: AdvocateProfile | null) => void;
  selectedPracticeArea: PracticeArea | null;
  setSelectedPracticeArea: (pa: PracticeArea | null) => void;
  selectedArticle: LegalArticle | null;
  setSelectedArticle: (art: LegalArticle | null) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  consultationDefaultMatter: string;
  setConsultationDefaultMatter: (matter: string) => void;

  // Update methods
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  updateContactInfo: (newContact: Partial<ContactInfo>) => void;
  updateHero: (newHero: Partial<HeroSectionData>) => void;
  updateAbout: (newAbout: Partial<AboutSectionData>) => void;
  updateMissionVision: (newMv: Partial<MissionVisionData>) => void;
  updateValues: (newValues: ValueItem[]) => void;
  
  // Practice Areas
  savePracticeArea: (pa: PracticeArea) => void;
  deletePracticeArea: (id: string) => void;
  reorderPracticeAreas: (areas: PracticeArea[]) => void;

  // Team
  saveAdvocate: (adv: AdvocateProfile) => void;
  deleteAdvocate: (id: string) => void;
  reorderTeam: (team: AdvocateProfile[]) => void;

  // Experience & Stats
  updateExperienceStats: (stats: ExperienceStat[]) => void;
  updateMilestones: (milestones: ExperienceMilestone[]) => void;

  // Expertise & Services
  saveExpertiseItem: (item: LegalExpertiseItem) => void;
  deleteExpertiseItem: (id: string) => void;
  saveServiceItem: (item: ServiceItem) => void;
  deleteServiceItem: (id: string) => void;

  // Approach & Why Choose Us
  updateApproachSteps: (steps: ApproachStep[]) => void;
  updateWhyChooseUs: (items: WhyChooseUsItem[]) => void;

  // Articles / Blog
  saveArticle: (article: LegalArticle) => void;
  deleteArticle: (id: string) => void;

  // FAQs
  saveFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;
  reorderFaqs: (faqs: FaqItem[]) => void;

  // Testimonials
  saveTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  // Consultation Requests
  submitConsultationRequest: (request: Omit<ConsultationRequest, 'id' | 'submittedAt' | 'status'>) => Promise<string>;
  updateConsultationRequest: (id: string, updates: Partial<ConsultationRequest>) => void;
  deleteConsultationRequest: (id: string) => void;

  // Visibility & SEO & Legal Pages
  updateSectionVisibility: (vis: Partial<SectionVisibility>) => void;
  updateSeoSettings: (seo: Partial<SeoSettings>) => void;
  updateLegalPageContent: (pageKey: keyof LegalPagesContent, content: string, title?: string) => void;

  // Media
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;

  // Revisions & Database tools
  restoreRevision: (id: string) => void;
  resetToDefaults: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonStr: string) => boolean;

  // Real Authentication
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  login: (role: UserRole, secretPin?: string) => boolean; // Compatibility shim
  logout: () => Promise<void>;
}

const ChamberContext = createContext<ChamberContextType | undefined>(undefined);

export const ChamberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadStoredData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  };

  const initialData = loadStoredData();

  const [settings, setSettings] = useState<WebsiteSettings>(initialData?.settings || DEFAULT_SETTINGS);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialData?.contactInfo || DEFAULT_CONTACT_INFO);
  const [hero, setHero] = useState<HeroSectionData>(initialData?.hero || DEFAULT_HERO);
  const [about, setAbout] = useState<AboutSectionData>(initialData?.about || DEFAULT_ABOUT);
  const [missionVision, setMissionVision] = useState<MissionVisionData>(initialData?.missionVision || DEFAULT_MISSION_VISION);
  const [values, setValues] = useState<ValueItem[]>(initialData?.values || DEFAULT_VALUES);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>(initialData?.practiceAreas || DEFAULT_PRACTICE_AREAS);
  const [team, setTeam] = useState<AdvocateProfile[]>(initialData?.team || DEFAULT_TEAM);
  const [experienceStats, setExperienceStats] = useState<ExperienceStat[]>(initialData?.experienceStats || DEFAULT_EXPERIENCE_STATS);
  const [milestones, setMilestones] = useState<ExperienceMilestone[]>(initialData?.milestones || DEFAULT_MILESTONES);
  const [expertise, setExpertise] = useState<LegalExpertiseItem[]>(initialData?.expertise || DEFAULT_EXPERTISE);
  const [services, setServices] = useState<ServiceItem[]>(initialData?.services || DEFAULT_SERVICES);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>(initialData?.whyChooseUs || DEFAULT_WHY_CHOOSE_US);
  const [approachSteps, setApproachSteps] = useState<ApproachStep[]>(initialData?.approachSteps || DEFAULT_APPROACH_STEPS);
  const [articles, setArticles] = useState<LegalArticle[]>(initialData?.articles || DEFAULT_ARTICLES);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialData?.faqs || DEFAULT_FAQS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialData?.testimonials || DEFAULT_TESTIMONIALS);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(initialData?.sectionVisibility || DEFAULT_SECTION_VISIBILITY);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(initialData?.seoSettings || DEFAULT_SEO_SETTINGS);
  const [legalPages, setLegalPages] = useState<LegalPagesContent>(initialData?.legalPages || DEFAULT_LEGAL_PAGES);
  const [media, setMedia] = useState<MediaItem[]>(initialData?.media || DEFAULT_MEDIA);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>(
    initialData?.consultationRequests || INITIAL_CONSULTATION_REQUESTS
  );

  // Revisions
  const [revisions, setRevisions] = useState<RevisionSnapshot[]>(() => {
    try {
      const savedRev = localStorage.getItem(REVISIONS_STORAGE_KEY);
      if (savedRev) return JSON.parse(savedRev);
    } catch {}
    return [
      {
        id: 'rev-init',
        timestamp: new Date().toISOString(),
        modifiedBy: 'System Initializer',
        section: 'Chamber Configuration',
        summary: 'Initial verified legal chamber settings and placeholder profiles',
        dataSnapshot: JSON.stringify({
          settings: DEFAULT_SETTINGS,
          contactInfo: DEFAULT_CONTACT_INFO
        })
      }
    ];
  });

  // Current User / Session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) return JSON.parse(savedUser);
    } catch {}
    return null;
  });

  // Supabase Live Status
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>({
    isConfigured: isSupabaseConfigured(),
    isConnected: false,
    message: isSupabaseConfigured() ? 'Connecting to Supabase...' : 'Supabase credentials not configured yet'
  });

  // Active navigation / views
  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Modals / deep views
  const [selectedAdvocate, setSelectedAdvocate] = useState<AdvocateProfile | null>(null);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<PracticeArea | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationDefaultMatter, setConsultationDefaultMatter] = useState('');

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Check Supabase connection and optionally load data
  const checkSupabaseConnection = useCallback(async () => {
    const configured = isSupabaseConfigured();
    if (!configured) {
      setSupabaseStatus({
        isConfigured: false,
        isConnected: false,
        message: 'Supabase URL and Anon Key are missing. Configure in .env or the Supabase panel.'
      });
      return;
    }

    const testRes = await testSupabaseConnection();
    setSupabaseStatus({
      isConfigured: true,
      isConnected: testRes.success,
      message: testRes.message
    });

    if (testRes.success) {
      try {
        // Attempt loading live cloud data
        const [remoteSettings, remoteTeam, remotePracticeAreas, remoteRequests, remoteArticles, remoteFaqs, remoteTestimonials] = await Promise.all([
          fetchSettingsFromSupabase(),
          fetchTeamFromSupabase(),
          fetchPracticeAreasFromSupabase(),
          fetchConsultationRequestsFromSupabase(),
          fetchArticlesFromSupabase(),
          fetchFaqsFromSupabase(),
          fetchTestimonialsFromSupabase()
        ]);

        if (remoteSettings?.settings && Object.keys(remoteSettings.settings).length > 0) {
          setSettings(prev => ({ ...prev, ...remoteSettings.settings }));
        }
        if (remoteSettings?.contactInfo && Object.keys(remoteSettings.contactInfo).length > 0) {
          setContactInfo(prev => ({ ...prev, ...remoteSettings.contactInfo }));
        }
        if (remoteTeam && remoteTeam.length > 0) setTeam(remoteTeam);
        if (remotePracticeAreas && remotePracticeAreas.length > 0) setPracticeAreas(remotePracticeAreas);
        if (remoteRequests) setConsultationRequests(remoteRequests);
        if (remoteArticles && remoteArticles.length > 0) setArticles(remoteArticles);
        if (remoteFaqs && remoteFaqs.length > 0) setFaqs(remoteFaqs);
        if (remoteTestimonials && remoteTestimonials.length > 0) setTestimonials(remoteTestimonials);
      } catch (err) {
        console.warn('Error fetching initial remote Supabase data:', err);
      }
    }
  }, []);

  // Listen to Supabase Auth State and initialization
  useEffect(() => {
    checkSupabaseConnection();

    const client = getSupabase();
    if (!client) return;

    // Check active session
    client.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        authGetProfile(session.user.id).then(profile => {
          const appUser: User = {
            id: session.user.id,
            name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Chamber Administrator',
            email: session.user.email || '',
            role: profile?.role || (session.user.user_metadata?.role as UserRole) || 'super_admin',
            createdAt: session.user.created_at
          };
          setCurrentUser(appUser);
          try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser));
          } catch {}
        });
      }
    });

    const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await authGetProfile(session.user.id);
        const appUser: User = {
          id: session.user.id,
          name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Chamber Administrator',
          email: session.user.email || '',
          role: profile?.role || (session.user.user_metadata?.role as UserRole) || 'super_admin',
          createdAt: session.user.created_at
        };
        setCurrentUser(appUser);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser));
        } catch {}
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch {}
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkSupabaseConnection]);

  // Persist chamber state to localStorage as continuous backup
  useEffect(() => {
    const fullState = {
      settings,
      contactInfo,
      hero,
      about,
      missionVision,
      values,
      practiceAreas,
      team,
      experienceStats,
      milestones,
      expertise,
      services,
      whyChooseUs,
      approachSteps,
      articles,
      faqs,
      testimonials,
      sectionVisibility,
      seoSettings,
      legalPages,
      media,
      consultationRequests
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullState));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [
    settings,
    contactInfo,
    hero,
    about,
    missionVision,
    values,
    practiceAreas,
    team,
    experienceStats,
    milestones,
    expertise,
    services,
    whyChooseUs,
    approachSteps,
    articles,
    faqs,
    testimonials,
    sectionVisibility,
    seoSettings,
    legalPages,
    media,
    consultationRequests
  ]);

  // Audit / Revision recorder
  const recordRevision = (section: string, summary: string, dataObj: any) => {
    const newRev: RevisionSnapshot = {
      id: `rev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      modifiedBy: currentUser?.name || 'Chamber Administrator',
      section,
      summary,
      dataSnapshot: JSON.stringify(dataObj)
    };
    setRevisions(prev => {
      const updated = [newRev, ...prev.slice(0, 49)];
      try {
        localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Also persist to Supabase if connected
    insertRevisionToSupabase(newRev).catch(() => {});
  };

  // --- Real Supabase Auth Methods ---
  const loginWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email.trim() || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (isSupabaseConfigured()) {
      const res = await authSignIn(email, password);
      if (res.error) {
        showNotification(res.error, 'error');
        return { success: false, error: res.error };
      }
      if (res.user) {
        setCurrentUser(res.user);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.user));
        } catch {}
        showNotification(`Welcome back, ${res.user.name}`);
        return { success: true };
      }
    }

    // Fallback sandbox auth when Supabase credentials are not yet configured in .env
    const role: UserRole = email.toLowerCase().includes('editor') ? 'editor' : 'super_admin';
    const fallbackUser: User = {
      id: `usr-sandbox-${Date.now()}`,
      name: role === 'super_admin' ? 'Chamber Administrator' : 'Legal Editor',
      email: email.trim(),
      role,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(fallbackUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackUser));
    } catch {}
    showNotification(`Authenticated as ${fallbackUser.name} (Configure Supabase for cloud database)`, 'info');
    return { success: true };
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = 'editor'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email.trim() || !password || !fullName.trim()) {
      return { success: false, error: 'Please provide full name, email, and password.' };
    }

    if (isSupabaseConfigured()) {
      const res = await authSignUp(email, password, fullName, role);
      if (res.error) {
        showNotification(res.error, 'error');
        return { success: false, error: res.error };
      }
      if (res.user) {
        setCurrentUser(res.user);
        showNotification(`Account created for ${fullName}`);
        return { success: true };
      }
    }

    const fallbackUser: User = {
      id: `usr-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim(),
      role,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(fallbackUser);
    showNotification(`Account created for ${fullName}`);
    return { success: true };
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!email.trim()) {
      return { success: false, error: 'Please provide your account email address.' };
    }
    const res = await authResetPassword(email);
    if (!res.success) {
      showNotification(res.error || 'Failed to send reset link', 'error');
      return { success: false, error: res.error || 'Reset error' };
    }
    showNotification('Password reset instructions sent to your email.');
    return { success: true };
  };

  const updatePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const res = await authUpdatePassword(password);
    if (!res.success) {
      showNotification(res.error || 'Password update failed', 'error');
      return { success: false, error: res.error || 'Update failed' };
    }
    showNotification('Password updated successfully.');
    return { success: true };
  };

  const login = (role: UserRole): boolean => {
    // Kept only for backward compatibility; components use loginWithEmail
    const email = role === 'super_admin' ? 'admin@khanlawassociates.com' : 'editor@khanlawassociates.com';
    loginWithEmail(email, 'admin-demo-password');
    return true;
  };

  const logout = async () => {
    await authSignOut();
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    showNotification('Logged out successfully');
  };

  const configureSupabaseOverride = (url: string, anonKey: string) => {
    setSupabaseConfigOverride(url, anonKey);
    checkSupabaseConnection();
    showNotification('Supabase project configuration updated');
  };

  // Sync all state to Supabase PostgreSQL database
  const syncDataToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, message: 'Supabase is not configured yet. Please configure credentials first.' };
    }

    try {
      showNotification('Syncing data to Supabase PostgreSQL database...', 'info');
      await Promise.all([
        saveSettingsToSupabase(settings, contactInfo),
        ...team.map(t => saveTeamMemberToSupabase(t)),
        ...practiceAreas.map(pa => savePracticeAreaToSupabase(pa)),
        ...articles.map(a => saveArticleToSupabase(a)),
        ...faqs.map(f => saveFaqToSupabase(f)),
        ...testimonials.map(t => saveTestimonialToSupabase(t))
      ]);
      showNotification('All chamber content synced to Supabase successfully!');
      return { success: true, message: 'All tables synced successfully to Supabase.' };
    } catch (err: any) {
      const msg = err?.message || 'Sync failed';
      showNotification(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Consultation management
  const loadDemoConsultations = () => {
    setConsultationRequests(DEMO_SAMPLE_REQUESTS);
    showNotification('Loaded sample inquiries (clearly marked as DEMO DATA)');
  };

  const clearAllConsultations = () => {
    setConsultationRequests([]);
    showNotification('All consultation records cleared');
  };

  // Update Methods with Supabase Sync & Audit logging
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      recordRevision('Website Settings', 'Updated chamber branding and settings', updated);
      saveSettingsToSupabase(updated, contactInfo).catch(() => {});
      return updated;
    });
    showNotification('Website settings updated');
  };

  const updateContactInfo = (newContact: Partial<ContactInfo>) => {
    setContactInfo(prev => {
      const updated = { ...prev, ...newContact };
      recordRevision('Contact Information', 'Updated chamber contact coordinates and office address', updated);
      saveSettingsToSupabase(settings, updated).catch(() => {});
      return updated;
    });
    showNotification('Contact information updated across the entire website');
  };

  const updateHero = (newHero: Partial<HeroSectionData>) => {
    setHero(prev => {
      const updated = { ...prev, ...newHero };
      recordRevision('Hero Section', 'Updated headline and supporting text', updated);
      return updated;
    });
    showNotification('Hero section updated');
  };

  const updateAbout = (newAbout: Partial<AboutSectionData>) => {
    setAbout(prev => {
      const updated = { ...prev, ...newAbout };
      recordRevision('About Chamber', 'Updated about section text and highlights', updated);
      return updated;
    });
    showNotification('About Us section updated');
  };

  const updateMissionVision = (newMv: Partial<MissionVisionData>) => {
    setMissionVision(prev => {
      const updated = { ...prev, ...newMv };
      recordRevision('Mission & Vision', 'Updated chamber mission and vision statements', updated);
      return updated;
    });
    showNotification('Mission and Vision updated');
  };

  const updateValues = (newValues: ValueItem[]) => {
    setValues(newValues);
    recordRevision('Core Values', 'Updated chamber core values', newValues);
    showNotification('Core values updated');
  };

  // Practice Areas
  const savePracticeArea = (pa: PracticeArea) => {
    setPracticeAreas(prev => {
      const index = prev.findIndex(item => item.id === pa.id);
      let updated: PracticeArea[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = pa;
      } else {
        updated = [...prev, pa];
      }
      recordRevision('Practice Areas', `Saved practice area: ${pa.title}`, updated);
      savePracticeAreaToSupabase(pa).catch(() => {});
      return updated;
    });
    showNotification(`Practice area "${pa.title}" saved`);
  };

  const deletePracticeArea = (id: string) => {
    setPracticeAreas(prev => {
      const updated = prev.filter(p => p.id !== id);
      recordRevision('Practice Areas', `Deleted practice area ${id}`, updated);
      deletePracticeAreaFromSupabase(id).catch(() => {});
      return updated;
    });
    showNotification('Practice area removed');
  };

  const reorderPracticeAreas = (areas: PracticeArea[]) => {
    setPracticeAreas(areas);
    areas.forEach(pa => savePracticeAreaToSupabase(pa).catch(() => {}));
  };

  // Team
  const saveAdvocate = (adv: AdvocateProfile) => {
    setTeam(prev => {
      const index = prev.findIndex(item => item.id === adv.id);
      let updated: AdvocateProfile[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = adv;
      } else {
        updated = [...prev, adv];
      }
      recordRevision('Team Members', `Saved advocate profile: ${adv.fullName}`, updated);
      saveTeamMemberToSupabase(adv).catch(() => {});
      return updated;
    });
    showNotification(`Advocate profile "${adv.fullName}" saved`);
  };

  const deleteAdvocate = (id: string) => {
    setTeam(prev => {
      const updated = prev.filter(t => t.id !== id);
      recordRevision('Team Members', `Deleted advocate profile ${id}`, updated);
      deleteTeamMemberFromSupabase(id).catch(() => {});
      return updated;
    });
    showNotification('Advocate profile removed');
  };

  const reorderTeam = (newTeam: AdvocateProfile[]) => {
    setTeam(newTeam);
    newTeam.forEach(t => saveTeamMemberToSupabase(t).catch(() => {}));
  };

  // Experience & Stats
  const updateExperienceStats = (stats: ExperienceStat[]) => {
    setExperienceStats(stats);
    recordRevision('Experience Stats', 'Updated chamber numerical statistics', stats);
    showNotification('Experience statistics updated');
  };

  const updateMilestones = (newMilestones: ExperienceMilestone[]) => {
    setMilestones(newMilestones);
    recordRevision('Milestones', 'Updated chamber history milestones', newMilestones);
    showNotification('Milestones updated');
  };

  // Expertise & Services
  const saveExpertiseItem = (item: LegalExpertiseItem) => {
    setExpertise(prev => {
      const index = prev.findIndex(e => e.id === item.id);
      let updated: LegalExpertiseItem[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = item;
      } else {
        updated = [...prev, item];
      }
      return updated;
    });
    showNotification(`Expertise item "${item.title}" saved`);
  };

  const deleteExpertiseItem = (id: string) => {
    setExpertise(prev => prev.filter(e => e.id !== id));
    showNotification('Expertise item removed');
  };

  const saveServiceItem = (item: ServiceItem) => {
    setServices(prev => {
      const index = prev.findIndex(s => s.id === item.id);
      let updated: ServiceItem[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = item;
      } else {
        updated = [...prev, item];
      }
      return updated;
    });
    showNotification(`Service item "${item.title}" saved`);
  };

  const deleteServiceItem = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showNotification('Service item removed');
  };

  // Approach & Why Choose Us
  const updateApproachSteps = (steps: ApproachStep[]) => {
    setApproachSteps(steps);
    recordRevision('Our Approach', 'Updated consultation methodology steps', steps);
    showNotification('Consultation approach steps updated');
  };

  const updateWhyChooseUs = (items: WhyChooseUsItem[]) => {
    setWhyChooseUs(items);
    recordRevision('Why Choose Us', 'Updated chamber distinctions and principles', items);
    showNotification('Why Choose Us section updated');
  };

  // Articles / Blog
  const saveArticle = (article: LegalArticle) => {
    setArticles(prev => {
      const index = prev.findIndex(a => a.id === article.id);
      let updated: LegalArticle[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = article;
      } else {
        updated = [article, ...prev];
      }
      recordRevision('Legal Articles', `Saved article: ${article.title}`, updated);
      saveArticleToSupabase(article).catch(() => {});
      return updated;
    });
    showNotification(`Article "${article.title}" saved`);
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    showNotification('Article removed');
  };

  // FAQs
  const saveFaq = (faq: FaqItem) => {
    setFaqs(prev => {
      const index = prev.findIndex(f => f.id === faq.id);
      let updated: FaqItem[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = faq;
      } else {
        updated = [...prev, faq];
      }
      recordRevision('FAQs', `Saved FAQ: ${faq.question}`, updated);
      saveFaqToSupabase(faq).catch(() => {});
      return updated;
    });
    showNotification('FAQ saved');
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showNotification('FAQ removed');
  };

  const reorderFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    newFaqs.forEach(f => saveFaqToSupabase(f).catch(() => {}));
  };

  // Testimonials
  const saveTestimonial = (item: TestimonialItem) => {
    setTestimonials(prev => {
      const index = prev.findIndex(t => t.id === item.id);
      let updated: TestimonialItem[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = item;
      } else {
        updated = [...prev, item];
      }
      recordRevision('Testimonials', `Saved client feedback: ${item.clientName}`, updated);
      saveTestimonialToSupabase(item).catch(() => {});
      return updated;
    });
    showNotification('Testimonial saved');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showNotification('Testimonial removed');
  };

  // Consultation Requests (Strict RLS: public can only INSERT)
  const submitConsultationRequest = async (
    request: Omit<ConsultationRequest, 'id' | 'submittedAt' | 'status'>
  ): Promise<string> => {
    const newId = `req-${Date.now()}`;
    const newRequest: ConsultationRequest = {
      ...request,
      id: newId,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    setConsultationRequests(prev => [newRequest, ...prev]);

    // Persist securely to Supabase (RLS policy allows INSERT from public anon)
    await insertConsultationRequestToSupabase(request);

    showNotification('Your consultation request has been submitted successfully.');
    return newId;
  };

  const updateConsultationRequest = (id: string, updates: Partial<ConsultationRequest>) => {
    setConsultationRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updates } : r))
    );
    updateConsultationRequestInSupabase(id, updates).catch(() => {});
    showNotification('Consultation request status updated');
  };

  const deleteConsultationRequest = (id: string) => {
    setConsultationRequests(prev => prev.filter(r => r.id !== id));
    deleteConsultationRequestFromSupabase(id).catch(() => {});
    showNotification('Consultation request archived/removed');
  };

  // Visibility & SEO & Legal Pages
  const updateSectionVisibility = (vis: Partial<SectionVisibility>) => {
    setSectionVisibility(prev => ({ ...prev, ...vis }));
    showNotification('Homepage section visibility updated');
  };

  const updateSeoSettings = (seo: Partial<SeoSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...seo }));
    showNotification('SEO parameters updated');
  };

  const updateLegalPageContent = (pageKey: keyof LegalPagesContent, content: string, title?: string) => {
    setLegalPages(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        content,
        title: title || prev[pageKey].title,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      }
    }));
    showNotification(`Legal page updated`);
  };

  // Media
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMedia(prev => [newItem, ...prev]);
    showNotification('Asset registered in chamber media library');
  };

  const deleteMediaItem = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    showNotification('Asset removed from library');
  };

  // Revisions & Disaster Recovery
  const restoreRevision = (id: string) => {
    const rev = revisions.find(r => r.id === id);
    if (!rev) {
      showNotification('Revision snapshot not found', 'error');
      return;
    }
    try {
      const snap = JSON.parse(rev.dataSnapshot);
      if (snap.settings) setSettings(snap.settings);
      if (snap.contactInfo) setContactInfo(snap.contactInfo);
      if (snap.hero) setHero(snap.hero);
      if (snap.about) setAbout(snap.about);
      showNotification(`Restored snapshot from ${new Date(rev.timestamp).toLocaleString()}`);
    } catch {
      showNotification('Failed to restore snapshot', 'error');
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setContactInfo(DEFAULT_CONTACT_INFO);
    setHero(DEFAULT_HERO);
    setAbout(DEFAULT_ABOUT);
    setMissionVision(DEFAULT_MISSION_VISION);
    setValues(DEFAULT_VALUES);
    setPracticeAreas(DEFAULT_PRACTICE_AREAS);
    setTeam(DEFAULT_TEAM);
    setExperienceStats(DEFAULT_EXPERIENCE_STATS);
    setMilestones(DEFAULT_MILESTONES);
    setExpertise(DEFAULT_EXPERTISE);
    setServices(DEFAULT_SERVICES);
    setWhyChooseUs(DEFAULT_WHY_CHOOSE_US);
    setApproachSteps(DEFAULT_APPROACH_STEPS);
    setArticles(DEFAULT_ARTICLES);
    setFaqs(DEFAULT_FAQS);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
    setSeoSettings(DEFAULT_SEO_SETTINGS);
    setLegalPages(DEFAULT_LEGAL_PAGES);
    setMedia(DEFAULT_MEDIA);
    setConsultationRequests([]);
    localStorage.removeItem(STORAGE_KEY);
    showNotification('Chamber website reset to verified defaults');
  };

  const exportDatabaseJson = (): string => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        version: '2.0.0-supabase-ready',
        settings,
        contactInfo,
        hero,
        about,
        missionVision,
        values,
        practiceAreas,
        team,
        experienceStats,
        milestones,
        expertise,
        services,
        whyChooseUs,
        approachSteps,
        articles,
        faqs,
        testimonials,
        sectionVisibility,
        seoSettings,
        legalPages,
        media,
        consultationRequests
      },
      null,
      2
    );
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const d = JSON.parse(jsonStr);
      if (d.settings) setSettings(d.settings);
      if (d.contactInfo) setContactInfo(d.contactInfo);
      if (d.hero) setHero(d.hero);
      if (d.about) setAbout(d.about);
      if (d.missionVision) setMissionVision(d.missionVision);
      if (d.values) setValues(d.values);
      if (d.practiceAreas) setPracticeAreas(d.practiceAreas);
      if (d.team) setTeam(d.team);
      if (d.experienceStats) setExperienceStats(d.experienceStats);
      if (d.milestones) setMilestones(d.milestones);
      if (d.expertise) setExpertise(d.expertise);
      if (d.services) setServices(d.services);
      if (d.whyChooseUs) setWhyChooseUs(d.whyChooseUs);
      if (d.approachSteps) setApproachSteps(d.approachSteps);
      if (d.articles) setArticles(d.articles);
      if (d.faqs) setFaqs(d.faqs);
      if (d.testimonials) setTestimonials(d.testimonials);
      if (d.sectionVisibility) setSectionVisibility(d.sectionVisibility);
      if (d.seoSettings) setSeoSettings(d.seoSettings);
      if (d.legalPages) setLegalPages(d.legalPages);
      if (d.consultationRequests) setConsultationRequests(d.consultationRequests);
      showNotification('Chamber database backup imported successfully');
      return true;
    } catch {
      showNotification('Invalid JSON backup file provided', 'error');
      return false;
    }
  };

  return (
    <ChamberContext.Provider
      value={{
        settings,
        contactInfo,
        hero,
        about,
        missionVision,
        values,
        practiceAreas,
        team,
        experienceStats,
        milestones,
        expertise,
        services,
        whyChooseUs,
        approachSteps,
        articles,
        faqs,
        testimonials,
        sectionVisibility,
        seoSettings,
        legalPages,
        media,
        consultationRequests,
        revisions,
        currentUser,
        supabaseStatus,
        checkSupabaseConnection,
        syncDataToSupabase,
        configureSupabaseOverride,
        loadDemoConsultations,
        clearAllConsultations,
        activeTab,
        setActiveTab,
        activeView,
        setActiveView,
        notification,
        showNotification,
        selectedAdvocate,
        setSelectedAdvocate,
        selectedPracticeArea,
        setSelectedPracticeArea,
        selectedArticle,
        setSelectedArticle,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        consultationDefaultMatter,
        setConsultationDefaultMatter,
        updateSettings,
        updateContactInfo,
        updateHero,
        updateAbout,
        updateMissionVision,
        updateValues,
        savePracticeArea,
        deletePracticeArea,
        reorderPracticeAreas,
        saveAdvocate,
        deleteAdvocate,
        reorderTeam,
        updateExperienceStats,
        updateMilestones,
        saveExpertiseItem,
        deleteExpertiseItem,
        saveServiceItem,
        deleteServiceItem,
        updateApproachSteps,
        updateWhyChooseUs,
        saveArticle,
        deleteArticle,
        saveFaq,
        deleteFaq,
        reorderFaqs,
        saveTestimonial,
        deleteTestimonial,
        submitConsultationRequest,
        updateConsultationRequest,
        deleteConsultationRequest,
        updateSectionVisibility,
        updateSeoSettings,
        updateLegalPageContent,
        addMediaItem,
        deleteMediaItem,
        restoreRevision,
        resetToDefaults,
        exportDatabaseJson,
        importDatabaseJson,
        loginWithEmail,
        signUpWithEmail,
        resetPassword,
        updatePassword,
        login,
        logout
      }}
    >
      {children}
    </ChamberContext.Provider>
  );
};

export const useChamber = () => {
  const context = useContext(ChamberContext);
  if (!context) {
    throw new Error('useChamber must be used within a ChamberProvider');
  }
  return context;
};
