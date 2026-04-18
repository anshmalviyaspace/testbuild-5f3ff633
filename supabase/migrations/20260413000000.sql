-- ============================================================
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- Creates the track progress table TrackView writes to.
-- ============================================================
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
CREATE POLICY "Users can read own track progress"   ON public.user_track_progress FOR SELECT  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own track progress" ON public.user_track_progress FOR INSERT  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own track progress" ON public.user_track_progress FOR UPDATE  USING (auth.uid() = user_id);
CREATE TRIGGER update_user_track_progress_updated_at
  BEFORE UPDATE ON public.user_track_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();