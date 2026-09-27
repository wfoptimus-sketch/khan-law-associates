import { getSupabase } from './supabase';
import {
  WebsiteSettings,
  ContactInfo,
  SeoSettings,
  PracticeArea,
  AdvocateProfile,
  LegalExpertiseItem,
  ServiceItem,
  ExperienceStat,
  LegalArticle,
  FaqItem,
  TestimonialItem,
  ConsultationRequest,
  RevisionSnapshot,
  User,
  UserRole
} from '../types';

// ==============================================================================
// AUTHENTICATION SERVICE (Real Supabase Auth)
// ==============================================================================

export async function authSignIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { user: null, error: 'Supabase is not configured. Please enter project credentials.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'No user returned by authentication.' };
    }

    // Fetch user profile from profiles table
    const profile = await authGetProfile(data.user.id);
    const role: UserRole = profile?.role || (data.user.user_metadata?.role as UserRole) || 'editor';
    const fullName = profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0];

    const appUser: User = {
      id: data.user.id,
      name: fullName,
      email: data.user.email || email,
      role,
      avatar: profile?.avatar,
      createdAt: data.user.created_at
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || 'Authentication error' };
  }
}

export async function authSignUp(
  email: string,
  password: string,
  fullName: string,
  role: UserRole = 'editor'
): Promise<{ user: User | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { user: null, error: 'Supabase is not configured.' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName,
          role
        }
      }
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'Failed to create user.' };
    }

    // Upsert into profiles table
    await supabase.from('profiles').upsert({
      user_id: data.user.id,
      full_name: fullName,
      role
    }, { onConflict: 'user_id' });

    const appUser: User = {
      id: data.user.id,
      name: fullName,
      email: data.user.email || email,
      role,
      createdAt: data.user.created_at
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || 'Registration error' };
  }
}

export async function authSignOut(): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
}

export async function authResetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/#reset-password`
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to send password reset email.' };
  }
}

export async function authUpdatePassword(newPassword: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update password.' };
  }
}

export async function authGetProfile(userId: string): Promise<{ full_name: string; role: UserRole; avatar?: string } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, role, avatar')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return null;
    return {
      full_name: data.full_name,
      role: (data.role as UserRole) || 'editor',
      avatar: data.avatar
    };
  } catch {
    return null;
  }
}

// ==============================================================================
// DATABASE TABLES CRUD & SYNC
// ==============================================================================

// 1. Website Settings & Contact Info
export async function fetchSettingsFromSupabase(): Promise<{
  settings: Partial<WebsiteSettings>;
  contactInfo: Partial<ContactInfo>;
} | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .eq('id', 'current')
      .maybeSingle();

    if (error || !data) return null;

    return {
      settings: {
        brandName: data.chamber_name,
        tagline: data.tagline,
        logoUrl: data.logo_url,
        establishedYear: data.established_year,
        primaryJurisdiction: data.primary_jurisdiction
      },
      contactInfo: {
        phone: data.phone,
        phoneDisplay: data.phone_display || data.phone,
        whatsapp: data.whatsapp,
        whatsappDisplay: data.whatsapp_display || data.whatsapp,
        email: data.email,
        officeAddress: data.office_address,
        courtChamberAddress: data.court_chamber_address,
        officeHours: data.office_hours,
        googleMapsEmbedUrl: data.google_maps_url,
        googleMapsDirectionsUrl: data.google_maps_directions_url,
        facebookUrl: data.facebook_url,
        linkedinUrl: data.linkedin_url,
        youtubeUrl: data.youtube_url
      }
    };
  } catch {
    return null;
  }
}

export async function saveSettingsToSupabase(
  settings: WebsiteSettings,
  contact: ContactInfo
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: 'current',
      chamber_name: settings.brandName,
      tagline: settings.tagline,
      logo_url: settings.logoUrl || null,
      established_year: settings.establishedYear,
      primary_jurisdiction: settings.primaryJurisdiction,
      phone: contact.phone,
      phone_display: contact.phoneDisplay,
      whatsapp: contact.whatsapp,
      whatsapp_display: contact.whatsappDisplay,
      email: contact.email,
      office_address: contact.officeAddress,
      court_chamber_address: contact.courtChamberAddress || null,
      office_hours: contact.officeHours,
      google_maps_url: contact.googleMapsEmbedUrl || null,
      google_maps_directions_url: contact.googleMapsDirectionsUrl || null,
      facebook_url: contact.facebookUrl || null,
      linkedin_url: contact.linkedinUrl || null,
      youtube_url: contact.youtubeUrl || null
    };

    const { error } = await supabase.from('website_settings').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

// 2. Team Members
export async function fetchTeamFromSupabase(): Promise<AdvocateProfile[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      slug: d.id,
      fullName: d.name,
      designation: d.designation,
      yearsOfExperience: d.experience || '',
      photoUrl: d.photo_url || '',
      education: d.education || [],
      barEnrollment: d.bar_enrollment || '',
      barAssociation: d.bar_association || '',
      courtsAndTribunals: d.courts || [],
      practiceAreas: d.practice_areas || [],
      legalExpertise: d.expertise || [],
      professionalMemberships: d.memberships || [],
      languages: d.languages || ['English', 'Bengali'],
      biography: d.biography || '',
      publications: d.publications || [],
      certifications: d.certifications || [],
      professionalRecognition: d.professional_recognition || [],
      email: d.email,
      phone: d.phone,
      sortOrder: d.sort_order || 0,
      status: d.is_published ? 'published' : 'hidden'
    }));
  } catch {
    return null;
  }
}

export async function saveTeamMemberToSupabase(adv: AdvocateProfile): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: adv.id,
      name: adv.fullName,
      designation: adv.designation,
      experience: adv.yearsOfExperience,
      photo_url: adv.photoUrl || null,
      education: adv.education,
      bar_enrollment: adv.barEnrollment,
      bar_association: adv.barAssociation,
      courts: adv.courtsAndTribunals,
      practice_areas: adv.practiceAreas,
      expertise: adv.legalExpertise,
      memberships: adv.professionalMemberships,
      languages: adv.languages,
      biography: adv.biography,
      publications: adv.publications,
      certifications: adv.certifications,
      professional_recognition: adv.professionalRecognition,
      email: adv.email || null,
      phone: adv.phone || null,
      is_published: adv.status === 'published',
      sort_order: adv.sortOrder
    };

    const { error } = await supabase.from('team_members').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteTeamMemberFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  return !error;
}

// 3. Practice Areas
export async function fetchPracticeAreasFromSupabase(): Promise<PracticeArea[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('practice_areas')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      shortDescription: d.short_description || '',
      fullDescription: d.detailed_description || '',
      keyServices: d.key_services || [],
      targetCourts: d.target_courts || '',
      iconName: d.icon || 'Scale',
      sortOrder: d.sort_order || 0,
      status: d.is_published ? 'published' : 'hidden'
    }));
  } catch {
    return null;
  }
}

export async function savePracticeAreaToSupabase(pa: PracticeArea): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: pa.id,
      slug: pa.slug,
      title: pa.title,
      short_description: pa.shortDescription,
      detailed_description: pa.fullDescription,
      key_services: pa.keyServices,
      target_courts: pa.targetCourts,
      icon: pa.iconName,
      is_published: pa.status === 'published',
      sort_order: pa.sortOrder
    };

    const { error } = await supabase.from('practice_areas').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

export async function deletePracticeAreaFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from('practice_areas').delete().eq('id', id);
  return !error;
}

// 4. Consultation Requests (Strict RLS: public can only INSERT)
export async function insertConsultationRequestToSupabase(
  req: Omit<ConsultationRequest, 'id' | 'submittedAt' | 'status'>
): Promise<{ id: string } | null> {
  const supabase = getSupabase();
  const id = `req-${Date.now()}`;
  if (!supabase) return { id };

  try {
    const payload = {
      id,
      full_name: req.fullName,
      phone: req.phoneNumber,
      email: req.email,
      legal_matter: req.legalMatter,
      preferred_date: req.preferredDate,
      preferred_contact_method: req.preferredContactMethod,
      description: req.briefDescription,
      attachment_name: req.attachmentName || null,
      status: 'new'
    };

    const { error } = await supabase.from('consultation_requests').insert(payload);
    if (error) {
      console.warn('Supabase consultation insert error (using local state fallback):', error);
    }
    return { id };
  } catch {
    return { id };
  }
}

export async function fetchConsultationRequestsFromSupabase(): Promise<ConsultationRequest[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      fullName: d.full_name,
      phoneNumber: d.phone,
      email: d.email,
      legalMatter: d.legal_matter,
      preferredDate: d.preferred_date || '',
      preferredContactMethod: d.preferred_contact_method || 'phone',
      briefDescription: d.description || '',
      attachmentName: d.attachment_name,
      submittedAt: d.created_at,
      status: d.status,
      adminNotes: d.admin_notes
    }));
  } catch {
    return null;
  }
}

export async function updateConsultationRequestInSupabase(
  id: string,
  updates: Partial<ConsultationRequest>
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload: any = {};
    if (updates.status) payload.status = updates.status;
    if (updates.adminNotes !== undefined) payload.admin_notes = updates.adminNotes;

    const { error } = await supabase.from('consultation_requests').update(payload).eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteConsultationRequestFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from('consultation_requests').delete().eq('id', id);
  return !error;
}

// 5. Legal Articles (Blog)
export async function fetchArticlesFromSupabase(): Promise<LegalArticle[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('legal_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      category: d.category || 'General',
      author: d.author || 'Chamber Research Team',
      publicationDate: d.published_at ? new Date(d.published_at).toISOString().split('T')[0] : '',
      readTime: d.read_time || '5 min read',
      featuredImageUrl: d.featured_image || '',
      excerpt: d.excerpt || '',
      content: d.content || '',
      tags: d.tags || [],
      seoTitle: d.seo_title || d.title,
      metaDescription: d.meta_description || d.excerpt || '',
      status: d.status === 'published' ? 'published' : 'draft'
    }));
  } catch {
    return null;
  }
}

export async function saveArticleToSupabase(art: LegalArticle): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: art.id,
      slug: art.slug,
      title: art.title,
      category: art.category,
      author: art.author,
      read_time: art.readTime,
      featured_image: art.featuredImageUrl || null,
      excerpt: art.excerpt,
      content: art.content,
      tags: art.tags,
      seo_title: art.seoTitle,
      meta_description: art.metaDescription,
      status: art.status === 'published' ? 'published' : 'draft',
      published_at: art.status === 'published' ? new Date().toISOString() : null
    };

    const { error } = await supabase.from('legal_articles').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

// 6. Testimonials
export async function fetchTestimonialsFromSupabase(): Promise<TestimonialItem[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      clientName: d.client_name,
      matterCategory: d.matter_category || '',
      feedback: d.testimonial,
      hasClientPermission: d.permission_confirmed,
      status: d.is_published ? 'published' : 'hidden',
      dateAdded: d.date_added || ''
    }));
  } catch {
    return null;
  }
}

export async function saveTestimonialToSupabase(test: TestimonialItem): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: test.id,
      client_name: test.clientName,
      matter_category: test.matterCategory,
      testimonial: test.feedback,
      permission_confirmed: test.hasClientPermission,
      is_published: test.status === 'published',
      date_added: test.dateAdded
    };

    const { error } = await supabase.from('testimonials').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

// 7. FAQs
export async function fetchFaqsFromSupabase(): Promise<FaqItem[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) return null;

    return data.map((d: any) => ({
      id: d.id,
      question: d.question,
      answer: d.answer,
      category: d.category || 'General',
      sortOrder: d.sort_order || 0,
      status: d.is_published ? 'published' : 'hidden'
    }));
  } catch {
    return null;
  }
}

export async function saveFaqToSupabase(faq: FaqItem): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sortOrder,
      is_published: faq.status === 'published'
    };

    const { error } = await supabase.from('faqs').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

// 8. Revisions / Audit Log
export async function insertRevisionToSupabase(rev: RevisionSnapshot): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = {
      id: rev.id,
      content_type: rev.section,
      changed_by: rev.modifiedBy,
      new_data: { summary: rev.summary, snapshot: rev.dataSnapshot },
      created_at: rev.timestamp
    };

    const { error } = await supabase.from('revisions').insert(payload);
    return !error;
  } catch {
    return false;
  }
}
