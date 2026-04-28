import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, RefreshCw, Loader2, Mail } from "lucide-react";

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const email = location.state?.email || "";
  const signupData = location.state?.signupData || null;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if accessed directly with no email
  useEffect(() => {
    if (!email) navigate("/signup", { replace: true });
  }, [email, navigate]);

  // 60s resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setHasError(false);
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (newOtp.every((d) => d !== "") && index === 5) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length !== 6) return;
    const digits = pasted.split("");
    setOtp(digits);
    inputRefs.current[5]?.focus();
    verifyOTP(pasted);
  };

  const verifyOTP = async (code: string) => {
    if (verifying) return;
    setVerifying(true);
    setHasError(false);

    try {
      // Step 1: Verify the OTP code
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) throw error;
      if (!data.user) throw new Error("Verification failed. Try again.");

      // Step 2: If user set a password during signup, update it now
      if (signupData?.password) {
        await supabase.auth.updateUser({ password: signupData.password });
      }

      toast({ title: "Email verified! ✅", description: "Setting up your profile..." });

      // Step 3: Go to onboarding — user is now authenticated
      navigate("/onboarding", {
        replace: true,
        state: { signupData },
      });
    } catch (err: any) {
      setHasError(true);
      toast({
        title: "Invalid code",
        description: err.message?.includes("expired")
          ? "Code expired. Request a new one."
          : "Wrong code. Check your email and try again.",
        variant: "destructive",
      });
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      toast({ title: "New code sent! 📧", description: "Check your inbox." });
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      setHasError(false);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast({ title: "Resend failed", description: err.message, variant: "destructive" });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fade-in opacity-0">

        {/* Back */}
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={12} /> Back to signup
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <Mail size={26} className="text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold mb-2">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a 6-digit code to
            <br />
            <span className="text-foreground font-medium">{email}</span>
          </p>
        </div>

        {/* OTP Boxes */}
        <div
          className="flex gap-2.5 justify-center mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={verifying}
              className={`w-12 h-14 text-center text-2xl font-heading font-bold bg-surface border rounded-xl
                focus:outline-none focus:ring-2 transition-all disabled:opacity-50
                ${hasError
                  ? "border-destructive focus:ring-destructive/40"
                  : digit
                  ? "border-primary focus:ring-primary"
                  : "border-border focus:ring-primary"
                }`}
            />
          ))}
        </div>

        {/* Error message */}
        {hasError && (
          <p className="text-center text-xs text-destructive font-mono mb-4">
            Incorrect code. Please try again.
          </p>
        )}

        {/* Verify button */}
        <button
          onClick={() => verifyOTP(otp.join(""))}
          disabled={otp.some((d) => !d) || verifying}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5"
        >
          {verifying ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>

        {/* Resend */}
        <div className="text-center mb-8">
          {countdown > 0 ? (
            <p className="text-xs font-mono text-muted-foreground">
              Resend code in{" "}
              <span className="text-foreground font-semibold tabular-nums">
                {countdown}s
              </span>
            </p>
          ) : (
            <button
              onClick={resendOTP}
              disabled={resending}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline disabled:opacity-50"
            >
              {resending ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <RefreshCw size={11} />
              )}
              Resend code
            </button>
          )}
        </div>

        {/* Tips card */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Didn't get it?
          </p>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>• Check your spam / junk folder</li>
            <li>• Make sure you entered the right email</li>
            <li>• Code expires in 10 minutes</li>
            <li>• You can paste the full 6-digit code directly</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
