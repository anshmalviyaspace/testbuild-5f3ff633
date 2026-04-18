-- ================================================================
-- RUN IN: Supabase Dashboard → SQL Editor → New Query → Run
-- ================================================================

-- 1. Add plan_type to profiles (free | pro)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan_type TEXT NOT NULL DEFAULT 'free'
    CHECK (plan_type IN ('free', 'pro'));

-- 2. Add last_active_date for streak tracking
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_active_date DATE DEFAULT NULL;

-- 3. Create user_track_progress if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.user_track_progress (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track              TEXT        NOT NULL DEFAULT 'AI & Machine Learning',
  completed_modules  TEXT[]      NOT NULL DEFAULT '{}',
  checked_resources  TEXT[]      NOT NULL DEFAULT '{}',
  active_module_id   INT         NOT NULL DEFAULT 1,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, track)
);

ALTER TABLE public.user_track_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can read own track progress"
    ON public.user_track_progress FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own track progress"
    ON public.user_track_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own track progress"
    ON public.user_track_progress FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER update_user_track_progress_updated_at
    BEFORE UPDATE ON public.user_track_progress
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 4. Fix profiles RLS: allow authenticated users to read all profiles
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
EXCEPTION WHEN undefined_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can read all profiles"
    ON public.profiles FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 5. Rebuild leaderboard_view without security_invoker (so it sees all users)
DROP VIEW IF EXISTS public.leaderboard_view;
CREATE OR REPLACE VIEW public.leaderboard_view AS
  SELECT
    p.id,
    p.username,
    p.full_name,
    p.avatar_initials,
    p.college,
    p.xp_points,
    p.current_track,
    p.plan_type,
    COUNT(cp.id)::int AS project_count
  FROM public.profiles p
  LEFT JOIN public.community_projects cp ON cp.user_id = p.id
  WHERE p.username IS NOT NULL
  GROUP BY p.id
  ORDER BY p.xp_points DESC NULLS LAST;

GRANT SELECT ON public.leaderboard_view TO authenticated;

-- 6. Enable realtime on all community tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_comments;