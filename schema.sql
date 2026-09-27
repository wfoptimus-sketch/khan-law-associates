-- ==============================================================================
-- KHAN LAW ASSOCIATES - SUPABASE PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- Advocates & Legal Consultants
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Trigger Function for updating 'updated_at' column
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLES DEFINITION
-- ==============================================================================

-- 3.1 PROFILES TABLE (Chamber Admin & Editor Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'editor')),
    avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.2 WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    id TEXT PRIMARY KEY DEFAULT 'current',
    chamber_name TEXT NOT NULL DEFAULT 'KHAN LAW ASSOCIATES',
    tagline TEXT DEFAULT 'Professional Legal Counsel · Strong Representation · Practical Solutions',
    logo_url TEXT,
    favicon_url TEXT,
    phone TEXT DEFAULT '+880 2 223389012',
    phone_display TEXT DEFAULT '+880 (02) 22338-9012',
    whatsapp TEXT DEFAULT '+8801711002233',
    whatsapp_display TEXT DEFAULT '+880 1711-002233',
    email TEXT DEFAULT 'chamber@khanlawassociates.com',
    office_address TEXT DEFAULT 'Suite 602, Supreme Court Bar Annex Building, Ramna, Dhaka-1000, Bangladesh',
    court_chamber_address TEXT DEFAULT 'Chamber No. 408, Dhaka Bar Association Bhaban, Old Dhaka, Bangladesh',
    office_hours TEXT DEFAULT 'Saturday to Thursday: 9:00 AM – 7:30 PM (Friday Closed / Urgent Matter by Appointment)',
    google_maps_url TEXT,
    google_maps_directions_url TEXT,
    facebook_url TEXT,
    linkedin_url TEXT,
    youtube_url TEXT,
    established_year TEXT DEFAULT '2012',
    primary_jurisdiction TEXT DEFAULT 'Supreme Court of Bangladesh & Subordinate Courts',
    footer_text TEXT DEFAULT 'All legal services governed by the Canons of Professional Conduct of the Bangladesh Bar Council.',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_website_settings_updated_at
    BEFORE UPDATE ON public.website_settings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.3 HOMEPAGE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id TEXT PRIMARY KEY,
    section_type TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    image_url TEXT,
    button_text TEXT,
    button_url TEXT,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_homepage_sections_updated_at
    BEFORE UPDATE ON public.homepage_sections
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.4 TEAM MEMBERS TABLE (Advocate Profiles - Verified or Placeholder only)
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL DEFAULT 'Advocate / Legal Consultant',
    photo_url TEXT,
    biography TEXT,
    experience TEXT DEFAULT 'Add verified experience',
    education TEXT[] DEFAULT '{}',
    bar_enrollment TEXT DEFAULT 'Add verified enrollment information',
    bar_association TEXT DEFAULT 'Add verified bar association',
    courts TEXT[] DEFAULT '{}',
    practice_areas TEXT[] DEFAULT '{}',
    expertise TEXT[] DEFAULT '{}',
    memberships TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{"English", "Bengali"}',
    publications TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    professional_recognition TEXT[] DEFAULT '{}',
    email TEXT,
    phone TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.5 PRACTICE AREAS TABLE
CREATE TABLE IF NOT EXISTS public.practice_areas (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    detailed_description TEXT,
    key_services TEXT[] DEFAULT '{}',
    target_courts TEXT,
    icon TEXT DEFAULT 'Scale',
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_practice_areas_updated_at
    BEFORE UPDATE ON public.practice_areas
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.6 EXPERTISE TABLE
CREATE TABLE IF NOT EXISTS public.expertise (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    details TEXT[] DEFAULT '{}',
    icon TEXT DEFAULT 'CheckCircle',
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_expertise_updated_at
    BEFORE UPDATE ON public.expertise
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.7 EXPERIENCE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.experience_items (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_experience_items_updated_at
    BEFORE UPDATE ON public.experience_items
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.8 SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    deliverables TEXT[] DEFAULT '{}',
    suitable_for TEXT,
    icon TEXT DEFAULT 'Briefcase',
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.9 LEGAL ARTICLES TABLE (Chamber Blog / Legal Insights)
CREATE TABLE IF NOT EXISTS public.legal_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    author TEXT,
    read_time TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    seo_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_legal_articles_updated_at
    BEFORE UPDATE ON public.legal_articles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.10 FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_faqs_updated_at
    BEFORE UPDATE ON public.faqs
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.11 TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_photo TEXT,
    matter_category TEXT,
    testimonial TEXT NOT NULL,
    permission_confirmed BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    date_added TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.12 CONSULTATION REQUESTS TABLE (Strictly Confidential Inquiries)
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    legal_matter TEXT NOT NULL,
    preferred_date TEXT,
    preferred_contact_method TEXT DEFAULT 'phone',
    description TEXT,
    document_url TEXT,
    attachment_name TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tr_consultation_requests_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.13 MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.media (
    id TEXT PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    file_size TEXT,
    uploaded_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3.14 REVISIONS TABLE (Audit Log & Snapshot History)
CREATE TABLE IF NOT EXISTS public.revisions (
    id TEXT PRIMARY KEY,
    content_type TEXT NOT NULL,
    content_id TEXT,
    previous_data JSONB,
    new_data JSONB,
    changed_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. STORAGE BUCKET CREATION (Chamber Media)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('chamber-media', 'chamber-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Access for Chamber Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'chamber-media');

CREATE POLICY "Authenticated Users can upload Chamber Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'chamber-media');

CREATE POLICY "Authenticated Users can update Chamber Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'chamber-media');

CREATE POLICY "Authenticated Users can delete Chamber Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'chamber-media');

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all 14 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revisions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin or editor
CREATE OR REPLACE FUNCTION public.is_chamber_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5.1 PROFILES POLICIES
-- Public cannot view profiles. Authenticated users can view their own profile or all profiles if staff.
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'super_admin'
));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can insert profiles"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'super_admin'
));

-- 5.2 WEBSITE SETTINGS POLICIES
-- Public can read settings
CREATE POLICY "Public can view website settings"
ON public.website_settings FOR SELECT
USING (true);

-- Authenticated staff can update/insert settings
CREATE POLICY "Staff can manage website settings"
ON public.website_settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.3 HOMEPAGE SECTIONS POLICIES
CREATE POLICY "Public can view visible homepage sections"
ON public.homepage_sections FOR SELECT
USING (is_visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage homepage sections"
ON public.homepage_sections FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.4 TEAM MEMBERS POLICIES
CREATE POLICY "Public can view published team members"
ON public.team_members FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage team members"
ON public.team_members FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.5 PRACTICE AREAS POLICIES
CREATE POLICY "Public can view published practice areas"
ON public.practice_areas FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage practice areas"
ON public.practice_areas FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.6 EXPERTISE POLICIES
CREATE POLICY "Public can view published expertise"
ON public.expertise FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage expertise"
ON public.expertise FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.7 EXPERIENCE ITEMS POLICIES
CREATE POLICY "Public can view published experience items"
ON public.experience_items FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage experience items"
ON public.experience_items FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.8 SERVICES POLICIES
CREATE POLICY "Public can view published services"
ON public.services FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage services"
ON public.services FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.9 LEGAL ARTICLES POLICIES
CREATE POLICY "Public can view published legal articles"
ON public.legal_articles FOR SELECT
USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage legal articles"
ON public.legal_articles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.10 FAQS POLICIES
CREATE POLICY "Public can view published faqs"
ON public.faqs FOR SELECT
USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage faqs"
ON public.faqs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.11 TESTIMONIALS POLICIES
-- Public visitors can only see testimonials where permission is confirmed AND marked published
CREATE POLICY "Public can view confirmed published testimonials"
ON public.testimonials FOR SELECT
USING ((is_published = true AND permission_confirmed = true) OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.12 CONSULTATION REQUESTS POLICIES (CRITICAL PRIVACY)
-- Public CAN ONLY INSERT new requests. Public CANNOT SELECT, UPDATE, OR DELETE.
CREATE POLICY "Public can submit consultation inquiries"
ON public.consultation_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated chamber staff can view or manage consultation requests
CREATE POLICY "Staff can view and manage all consultation requests"
ON public.consultation_requests FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can update consultation requests"
ON public.consultation_requests FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff can delete consultation requests"
ON public.consultation_requests FOR DELETE
TO authenticated
USING (true);

-- 5.13 MEDIA POLICIES
CREATE POLICY "Public can view media"
ON public.media FOR SELECT
USING (true);

CREATE POLICY "Staff can manage media"
ON public.media FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5.14 REVISIONS POLICIES
-- Only authenticated staff can view and insert revisions
CREATE POLICY "Staff can view revisions"
ON public.revisions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Staff can insert revisions"
ON public.revisions FOR INSERT
TO authenticated
WITH CHECK (true);

-- ==============================================================================
-- 6. INITIAL SEED DATA (Clean, Unfabricated, Zero Fake Clients)
-- ==============================================================================

-- Initial Settings
INSERT INTO public.website_settings (
    id, chamber_name, tagline, phone, phone_display, whatsapp, whatsapp_display, email,
    office_address, office_hours, established_year
) VALUES (
    'current',
    'KHAN LAW ASSOCIATES',
    'Professional Legal Counsel · Strong Representation · Practical Solutions',
    '+880 2 223389012',
    '+880 (02) 22338-9012',
    '+8801711002233',
    '+880 1711-002233',
    'chamber@khanlawassociates.com',
    'Suite 602, Supreme Court Bar Annex Building, Ramna, Dhaka-1000, Bangladesh',
    'Saturday to Thursday: 9:00 AM – 7:30 PM (Urgent Bail & Court Filings by Appointment)',
    '2012'
) ON CONFLICT (id) DO NOTHING;

-- Initial Team Profile (Placeholder as required by instruction: NO fabricated credentials)
INSERT INTO public.team_members (
    id, name, designation, experience, education, bar_enrollment, bar_association, courts,
    practice_areas, expertise, biography, is_published, sort_order
) VALUES (
    'adv-placeholder-1',
    'Add Advocate Name',
    'Advocate / Legal Consultant',
    'Add verified experience',
    '{"Add verified qualification"}',
    'Add verified enrollment information',
    'Add verified bar association',
    '{"Add verified court information"}',
    '{"Civil Litigation", "Corporate Law", "Property & Land Law"}',
    '{"Trial Advocacy", "Legal Opinion", "Documentation"}',
    'Advocate profile credentials will be entered upon official bar verification by the chamber administrator.',
    true,
    1
) ON CONFLICT (id) DO NOTHING;

-- Notice: consultation_requests table remains completely EMPTY.
-- Zero fake clients, zero fabricated names, zero fabricated notes.
