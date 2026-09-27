-- =============================================================================
-- KHAN LAW ASSOCIATES
-- PRODUCTION SECURITY / RLS MIGRATION
-- Run AFTER the original schema.sql
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. SECURITY HELPER FUNCTIONS
-- =============================================================================

-- Returns the role of the currently authenticated user.
-- SECURITY DEFINER allows this function to safely check profiles
-- without getting trapped by profiles RLS policies.

CREATE OR REPLACE FUNCTION public.current_chamber_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT role
    FROM public.profiles
    WHERE user_id = auth.uid()
    LIMIT 1;
$$;


-- Check whether the current user is a chamber staff member.
CREATE OR REPLACE FUNCTION public.is_chamber_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE user_id = auth.uid()
          AND role IN ('super_admin', 'editor')
    );
$$;


-- Check whether the current user is a super administrator.
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE user_id = auth.uid()
          AND role = 'super_admin'
    );
$$;


-- =============================================================================
-- 2. PROTECT PROFILE ROLES
-- =============================================================================

CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN

    -- A non-super-admin cannot change an existing user's role.
    IF TG_OP = 'UPDATE' THEN
        IF OLD.role IS DISTINCT FROM NEW.role
           AND NOT public.is_super_admin() THEN

            RAISE EXCEPTION 'Only a super administrator can change user roles.';
        END IF;
    END IF;

    -- A non-super-admin cannot create a super_admin profile.
    IF TG_OP = 'INSERT' THEN
        IF NEW.role = 'super_admin'
           AND NOT public.is_super_admin() THEN

            RAISE EXCEPTION 'Only a super administrator can create a super_admin profile.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS tr_protect_profile_role ON public.profiles;

CREATE TRIGGER tr_protect_profile_role
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_role();


-- =============================================================================
-- 3. REMOVE OLD / OVERLY BROAD RLS POLICIES
-- =============================================================================

-- PROFILES
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

-- WEBSITE SETTINGS
DROP POLICY IF EXISTS "Public can view website settings" ON public.website_settings;
DROP POLICY IF EXISTS "Staff can manage website settings" ON public.website_settings;

-- HOMEPAGE
DROP POLICY IF EXISTS "Public can view visible homepage sections" ON public.homepage_sections;
DROP POLICY IF EXISTS "Staff can manage homepage sections" ON public.homepage_sections;

-- TEAM
DROP POLICY IF EXISTS "Public can view published team members" ON public.team_members;
DROP POLICY IF EXISTS "Staff can manage team members" ON public.team_members;

-- PRACTICE AREAS
DROP POLICY IF EXISTS "Public can view published practice areas" ON public.practice_areas;
DROP POLICY IF EXISTS "Staff can manage practice areas" ON public.practice_areas;

-- EXPERTISE
DROP POLICY IF EXISTS "Public can view published expertise" ON public.expertise;
DROP POLICY IF EXISTS "Staff can manage expertise" ON public.expertise;

-- EXPERIENCE
DROP POLICY IF EXISTS "Public can view published experience items" ON public.experience_items;
DROP POLICY IF EXISTS "Staff can manage experience items" ON public.experience_items;

-- SERVICES
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
DROP POLICY IF EXISTS "Staff can manage services" ON public.services;

-- ARTICLES
DROP POLICY IF EXISTS "Public can view published legal articles" ON public.legal_articles;
DROP POLICY IF EXISTS "Staff can manage legal articles" ON public.legal_articles;

-- FAQS
DROP POLICY IF EXISTS "Public can view published faqs" ON public.faqs;
DROP POLICY IF EXISTS "Staff can manage faqs" ON public.faqs;

-- TESTIMONIALS
DROP POLICY IF EXISTS "Public can view confirmed published testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can manage testimonials" ON public.testimonials;

-- CONSULTATION REQUESTS
DROP POLICY IF EXISTS "Public can submit consultation inquiries" ON public.consultation_requests;
DROP POLICY IF EXISTS "Staff can view and manage all consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Staff can update consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Staff can delete consultation requests" ON public.consultation_requests;

-- MEDIA
DROP POLICY IF EXISTS "Public can view media" ON public.media;
DROP POLICY IF EXISTS "Staff can manage media" ON public.media;

-- REVISIONS
DROP POLICY IF EXISTS "Staff can view revisions" ON public.revisions;
DROP POLICY IF EXISTS "Staff can insert revisions" ON public.revisions;


-- =============================================================================
-- 4. ENABLE RLS
-- =============================================================================

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


-- =============================================================================
-- 5. PROFILES POLICIES
-- =============================================================================

-- Users can see their own profile.
-- Super admins can see all profiles.

CREATE POLICY "profiles_select_own_or_super_admin"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id
    OR public.is_super_admin()
);


-- Users may update their own basic profile.
-- The trigger above prevents them from changing their role.

CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);


-- Only super admins can create profiles.

CREATE POLICY "profiles_insert_super_admin"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
    public.is_super_admin()
);


-- Only super admins can delete profiles.

CREATE POLICY "profiles_delete_super_admin"
ON public.profiles
FOR DELETE
TO authenticated
USING (
    public.is_super_admin()
);


-- =============================================================================
-- 6. WEBSITE SETTINGS
-- =============================================================================

CREATE POLICY "website_settings_public_read"
ON public.website_settings
FOR SELECT
USING (true);


CREATE POLICY "website_settings_staff_manage"
ON public.website_settings
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 7. HOMEPAGE SECTIONS
-- =============================================================================

CREATE POLICY "homepage_sections_public_read"
ON public.homepage_sections
FOR SELECT
USING (
    is_visible = true
);


CREATE POLICY "homepage_sections_staff_manage"
ON public.homepage_sections
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 8. TEAM MEMBERS
-- =============================================================================

CREATE POLICY "team_members_public_read"
ON public.team_members
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "team_members_staff_manage"
ON public.team_members
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 9. PRACTICE AREAS
-- =============================================================================

CREATE POLICY "practice_areas_public_read"
ON public.practice_areas
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "practice_areas_staff_manage"
ON public.practice_areas
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 10. EXPERTISE
-- =============================================================================

CREATE POLICY "expertise_public_read"
ON public.expertise
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "expertise_staff_manage"
ON public.expertise
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 11. EXPERIENCE
-- =============================================================================

CREATE POLICY "experience_items_public_read"
ON public.experience_items
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "experience_items_staff_manage"
ON public.experience_items
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 12. SERVICES
-- =============================================================================

CREATE POLICY "services_public_read"
ON public.services
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "services_staff_manage"
ON public.services
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 13. LEGAL ARTICLES
-- =============================================================================

CREATE POLICY "legal_articles_public_read"
ON public.legal_articles
FOR SELECT
USING (
    status = 'published'
);


CREATE POLICY "legal_articles_staff_manage"
ON public.legal_articles
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 14. FAQS
-- =============================================================================

CREATE POLICY "faqs_public_read"
ON public.faqs
FOR SELECT
USING (
    is_published = true
);


CREATE POLICY "faqs_staff_manage"
ON public.faqs
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 15. TESTIMONIALS
-- =============================================================================

CREATE POLICY "testimonials_public_read"
ON public.testimonials
FOR SELECT
USING (
    is_published = true
    AND permission_confirmed = true
);


CREATE POLICY "testimonials_staff_manage"
ON public.testimonials
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 16. CONSULTATION REQUESTS
-- =============================================================================

-- IMPORTANT:
-- Visitors can submit a consultation request.
-- Visitors cannot read, modify, or delete consultation requests.

CREATE POLICY "consultation_requests_public_insert"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
    true
);


-- ONLY super_admin can read confidential inquiries.

CREATE POLICY "consultation_requests_super_admin_select"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (
    public.is_super_admin()
);


-- ONLY super_admin can update inquiries.

CREATE POLICY "consultation_requests_super_admin_update"
ON public.consultation_requests
FOR UPDATE
TO authenticated
USING (
    public.is_super_admin()
)
WITH CHECK (
    public.is_super_admin()
);


-- ONLY super_admin can delete inquiries.

CREATE POLICY "consultation_requests_super_admin_delete"
ON public.consultation_requests
FOR DELETE
TO authenticated
USING (
    public.is_super_admin()
);


-- =============================================================================
-- 17. MEDIA TABLE
-- =============================================================================

-- Public website media can be viewed publicly.

CREATE POLICY "media_public_read"
ON public.media
FOR SELECT
USING (true);


-- Chamber staff can manage public media.

CREATE POLICY "media_staff_manage"
ON public.media
FOR ALL
TO authenticated
USING (
    public.is_chamber_staff()
)
WITH CHECK (
    public.is_chamber_staff()
);


-- =============================================================================
-- 18. REVISIONS / AUDIT LOG
-- =============================================================================

CREATE POLICY "revisions_staff_read"
ON public.revisions
FOR SELECT
TO authenticated
USING (
    public.is_chamber_staff()
);


CREATE POLICY "revisions_staff_insert"
ON public.revisions
FOR INSERT
TO authenticated
WITH CHECK (
    public.is_chamber_staff()
);


-- Only super admins may delete audit history.

CREATE POLICY "revisions_super_admin_delete"
ON public.revisions
FOR DELETE
TO authenticated
USING (
    public.is_super_admin()
);


-- =============================================================================
-- 19. CREATE PRIVATE STORAGE BUCKET FOR CONFIDENTIAL DOCUMENTS
-- =============================================================================

INSERT INTO storage.buckets (
    id,
    name,
    public
)
VALUES (
    'consultation-documents',
    'consultation-documents',
    false
)
ON CONFLICT (id) DO UPDATE
SET public = false;


-- =============================================================================
-- 20. PRIVATE CONSULTATION DOCUMENT STORAGE POLICIES
-- =============================================================================

DROP POLICY IF EXISTS "consultation_documents_super_admin_read"
ON storage.objects;

DROP POLICY IF EXISTS "consultation_documents_super_admin_insert"
ON storage.objects;

DROP POLICY IF EXISTS "consultation_documents_super_admin_update"
ON storage.objects;

DROP POLICY IF EXISTS "consultation_documents_super_admin_delete"
ON storage.objects;


CREATE POLICY "consultation_documents_super_admin_read"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'consultation-documents'
    AND public.is_super_admin()
);


CREATE POLICY "consultation_documents_super_admin_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'consultation-documents'
    AND public.is_super_admin()
);


CREATE POLICY "consultation_documents_super_admin_update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'consultation-documents'
    AND public.is_super_admin()
)
WITH CHECK (
    bucket_id = 'consultation-documents'
    AND public.is_super_admin()
);


CREATE POLICY "consultation_documents_super_admin_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'consultation-documents'
    AND public.is_super_admin()
);


-- =============================================================================
-- 21. FIX PUBLIC CHAMBER MEDIA STORAGE
-- =============================================================================

DROP POLICY IF EXISTS "Public Read Access for Chamber Media"
ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Users can upload Chamber Media"
ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Users can update Chamber Media"
ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Users can delete Chamber Media"
ON storage.objects;


-- Public visitors can view public chamber media.

CREATE POLICY "chamber_media_public_read"
ON storage.objects
FOR SELECT
USING (
    bucket_id = 'chamber-media'
);


-- Only chamber staff can upload public media.

CREATE POLICY "chamber_media_staff_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'chamber-media'
    AND public.is_chamber_staff()
);


-- Only chamber staff can update public media.

CREATE POLICY "chamber_media_staff_update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'chamber-media'
    AND public.is_chamber_staff()
)
WITH CHECK (
    bucket_id = 'chamber-media'
    AND public.is_chamber_staff()
);


-- Only chamber staff can delete public media.

CREATE POLICY "chamber_media_staff_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'chamber-media'
    AND public.is_chamber_staff()
);


-- =============================================================================
-- 22. UNPUBLISH PLACEHOLDER ADVOCATE
-- =============================================================================

UPDATE public.team_members
SET is_published = false
WHERE id = 'adv-placeholder-1'
  AND name = 'Add Advocate Name';


-- =============================================================================
-- 23. SECURITY GRANTS
-- =============================================================================

-- These are normal PostgREST privileges.
-- RLS remains responsible for deciding WHICH rows can be accessed.

GRANT SELECT ON public.website_settings TO anon, authenticated;
GRANT SELECT ON public.homepage_sections TO anon, authenticated;
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT SELECT ON public.practice_areas TO anon, authenticated;
GRANT SELECT ON public.expertise TO anon, authenticated;
GRANT SELECT ON public.experience_items TO anon, authenticated;
GRANT SELECT ON public.services TO anon, authenticated;
GRANT SELECT ON public.legal_articles TO anon, authenticated;
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT SELECT ON public.media TO anon, authenticated;

GRANT INSERT ON public.consultation_requests TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.profiles
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.homepage_sections
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.team_members
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.practice_areas
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.expertise
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.experience_items
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.services
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.legal_articles
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.faqs
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.testimonials
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.website_settings
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.media
TO authenticated;

GRANT SELECT, INSERT
ON public.revisions
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.consultation_requests
TO authenticated;


-- =============================================================================
-- 24. FINAL VERIFICATION
-- =============================================================================

-- These should return:
-- super_admin
-- true
-- true

SELECT
    public.current_chamber_role() AS current_role,
    public.is_chamber_staff() AS is_staff,
    public.is_super_admin() AS is_super_admin;


COMMIT;

-- =============================================================================
-- END OF SECURITY MIGRATION
-- =============================================================================
