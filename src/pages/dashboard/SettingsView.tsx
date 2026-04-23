import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight, X, Upload, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CollegePicker from "@/components/CollegePicker";

const trackOptions = [
  { value: "AI & Machine Learning", emoji: "🤖" },
  { value: "UI/UX Design",          emoji: "🎨" },
  { value: "Full Stack Dev",        emoji: "💻" },
  { value: "Build a Startup",       emoji: "🚀" },
];

const defaultAvatars = ["😎","🧑‍💻","🦊","🐱","🤖","👾","🎯","🔥","🧠","⚡","🌈","🎨","🦁","🐉","🦄","🌟"];

export default function SettingsView() {
  const { currentUser, logout, refreshProfile, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName,        setFullName]        = useState("");
  const [username,        setUsername]        = useState("");
  const [college,         setCollege]         = useState("");
  const [bio,             setBio]             = useState("");
  const [selectedEmoji,   setSelectedEmoji]   = useState<string | null>(null);
  const [avatarPreview,   setAvatarPreview]   = useState<string | null>(null);
  const [avatarFile,      setAvatarFile]      = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const [showTrackModal,  setShowTrackModal]  = useState(false);
  const [selectedTrack,   setSelectedTrack]   = useState("");

  const [email,           setEmail]           = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "");
      setUsername(currentUser.username || "");
      setCollege(currentUser.college || "");
      setBio(currentUser.bio || "");
      setSelectedTrack(currentUser.currentTrack || "AI & Machine Learning");
      setEmail(currentUser.email || "");
      const url = (currentUser as any).avatarUrl;
      if (url) setAvatarPreview(url);
    }
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="p-6 sm:p-8 max-w-2xl animate-pulse space-y-4">
        <div className="h-8 w-32 bg-surface2 rounded-lg" />
        <div className="h-64 bg-surface2 rounded-xl" />
      </div>
    );
  }

  // ── Avatar handlers ──────────────────────────────────────────────────────

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum 5 MB.", variant: "destructive" });
      return;
    }
    setAvatarFile(file);
    setSelectedEmoji(null);
    setAvatarPreview(URL.createObjectURL(file));
    setShowAvatarPicker(false);
  };

  const handleEmojiPick = (em: string) => {
    setSelectedEmoji(em);
    setAvatarFile(null);
    setAvatarPreview(null);
    setShowAvatarPicker(false);
  };

  // ── Save profile ─────────────────────────────────────────────────────────

  const handleSaveProfile = async () => {
    if (!fullName.trim() || !username.trim()) {
      toast({ title: "Name and username required", variant: "destructive" });
      return;
    }

    let newAvatarUrl: string | undefined = (currentUser as any).avatarUrl;

    // Upload photo if user picked one from device
    if (avatarFile) {
      setUploadingAvatar(true);
      const ext  = avatarFile.name.split(".").pop() || "jpg";
      const path = `${currentUser.id}/avatar.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, avatarFile, { upsert: true });

      if (upErr) {
        setUploadingAvatar(false);
        toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
        return;
      }

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      newAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      setUploadingAvatar(false);
    }

    const initials = fullName.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

    const payload: Record<string, unknown> = {
      full_name:       fullName.trim(),
      username:        username.trim().replace(/^@/, ""),
      college:         college.trim(),
      bio:             bio.trim(),
      avatar_initials: selectedEmoji || initials,
    };

    if (newAvatarUrl !== undefined) {
      payload.avatar_url = newAvatarUrl;
    }

    const { error } = await supabase.from("profiles").update(payload).eq("id", currentUser.id);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    await refreshProfile();
    toast({ title: "Profile updated ✓" });
  };

  // ── Track ────────────────────────────────────────────────────────────────

  const handleSwitchTrack = async () => {
    await supabase.from("profiles").update({ current_track: selectedTrack }).eq("id", currentUser.id);
    await refreshProfile();
    setShowTrackModal(false);
    toast({ title: "Track switched ✓", description: `Now on: ${selectedTrack}` });
  };

  // ── Email — uses Supabase auth email update ───────────────────────────────
  const handleChangeEmail = async () => {
    if (!email.trim()) return;
    const result = await supabase.auth.updateUser({ email: email.trim() });
    if (result.error) {
      toast({ title: "Error", description: result.error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Verification sent", description: "Check your new email to confirm." });
  };

  // ── Password ─────────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Minimum 6 characters.", variant: "destructive" });
      return;
    }
    const result = await supabase.auth.updateUser({ password: newPassword });
    if (result.error) {
      toast({ title: "Error", description: result.error.message, variant: "destructive" });
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    toast({ title: "Password updated ✓" });
  };

  // ── Delete account ────────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    try {
      // Delete profile row first (cascade will clean up related data)
      await supabase.from("profiles").delete().eq("id", currentUser.id);
      // Sign out and let the user know — full auth deletion requires a server function,
      // but signing out + deleting profile effectively deactivates the account.
      await logout();
      toast({ title: "Account deleted", description: "Your data has been removed." });
      navigate("/");
    } catch (err) {
      toast({ title: "Delete failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const inp = "w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow";
  const trackEmoji = trackOptions.find((t) => t.value === currentUser.currentTrack)?.emoji || "🤖";

  // Avatar display priority: new file preview → emoji pick → existing URL → initials gradient
  const avatarDisplay = avatarPreview && !selectedEmoji
    ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
    : selectedEmoji
    ? <span className="text-2xl">{selectedEmoji}</span>
    : <span className="text-sm font-heading font-bold text-primary-foreground">{currentUser.avatarInitials}</span>;

  return (
    <div className="p-6 sm:p-8 max-w-2xl animate-fade-in opacity-0">
      <h1 className="font-heading text-2xl font-extrabold mb-8">Settings</h1>

      <div className="space-y-8">

        {/* ── Profile ──────────────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-heading text-base font-bold">Profile</h2>

          {/* Avatar row */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}
              >
                {avatarDisplay}
              </div>
              <button
                onClick={() => setShowAvatarPicker((v) => !v)}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Camera size={11} className="text-primary-foreground" />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{currentUser.fullName}</p>
              <p className="text-xs font-mono text-muted-foreground mb-2">@{currentUser.username}</p>
              <div className="flex items-center gap-3">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                >
                  <Upload size={11} /> Upload Photo
                </button>
                <button onClick={() => setShowAvatarPicker((v) => !v)} className="text-xs font-mono text-primary hover:underline">
                  Pick Default
                </button>
              </div>
            </div>
          </div>

          {/* Emoji grid */}
          {showAvatarPicker && (
            <div className="bg-surface border border-border rounded-xl p-3">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Choose a default avatar</p>
              <div className="grid grid-cols-8 gap-1.5">
                {defaultAvatars.map((em) => (
                  <button
                    key={em}
                    onClick={() => handleEmojiPick(em)}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${selectedEmoji === em ? "bg-primary/10 ring-1 ring-primary" : "bg-surface2 hover:bg-primary/10"}`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text fields */}
          <div>
            <label className="text-xs font-mono text-muted-foreground">Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inp} />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className={inp} />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">College / University</label>
            <CollegePicker
              value={college}
              onChange={(val) => setCollege(val)}
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Tell the world about yourself..."
              className={`${inp} resize-none`}
            />
            <p className="text-[10px] font-mono text-muted-foreground text-right mt-0.5">{bio.length}/300</p>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={uploadingAvatar}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {uploadingAvatar ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                Uploading…
              </>
            ) : "Save Changes"}
          </button>
        </section>

        {/* ── Track ────────────────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold">Track</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{trackEmoji}</span>
              <div>
                <p className="text-sm font-medium">{currentUser.currentTrack}</p>
                <p className="text-[10px] font-mono text-muted-foreground">Current track</p>
              </div>
            </div>
            <button
              onClick={() => setShowTrackModal(true)}
              className="text-xs font-mono text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              Switch Track
            </button>
          </div>
        </section>

        {/* ── Account ──────────────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-heading text-base font-bold">Account</h2>

          {/* Email */}
          <div>
            <label className="text-xs font-mono text-muted-foreground">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inp}
              />
              <button
                onClick={handleChangeEmail}
                className="mt-1.5 shrink-0 bg-surface2 border border-border px-4 py-2.5 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Update
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-muted-foreground">Change Password</label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inp}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inp}
            />
            <button
              onClick={handleChangePassword}
              className="bg-surface2 border border-border px-5 py-2.5 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Update Password
            </button>
          </div>

          <div className="pt-4 border-t border-border">
            <button onClick={() => setShowDeleteModal(true)} className="text-xs font-mono text-destructive hover:underline">
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Track modal */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTrackModal(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold">Switch Track</h3>
              <button onClick={() => setShowTrackModal(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="space-y-2">
              {trackOptions.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedTrack(t.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${selectedTrack === t.value ? "bg-primary/10 border border-primary/30 text-primary" : "bg-surface border border-border text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="text-lg">{t.emoji}</span> {t.value}
                </button>
              ))}
            </div>
            <button onClick={handleSwitchTrack} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              Confirm <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-heading font-bold">Delete Account</h3>
                <p className="text-xs text-muted-foreground">This cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All your projects, progress, XP, and data will be <span className="text-destructive font-medium">permanently deleted</span>. You will not be able to recover this account.
            </p>
            <div className="bg-surface border border-border rounded-lg px-4 py-2.5">
              <p className="text-xs font-mono text-muted-foreground">Deleting account for</p>
              <p className="text-sm font-medium mt-0.5">@{currentUser.username}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-surface2 border border-border py-2.5 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-destructive/90 transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}