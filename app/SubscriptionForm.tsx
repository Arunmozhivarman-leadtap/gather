"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Send, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { subscribeAction } from "./actions";

export default function SubscriptionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    if (!captchaToken) {
      setError("Please verify you are not a robot.");
      setLoading(false);
      return;
    }

    const result = await subscribeAction(formData, captchaToken);

    if (result.error) {
      setError(result.error);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-brand-green/20 backdrop-blur-md p-8 rounded-3xl border border-brand-green/30 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-brand-green" />
          <h3 className="text-2xl font-serif text-brand-linen">You&apos;re on the list!</h3>
          <p className="text-brand-linen/70 font-normal">
            We&apos;ll notify you as soon as we&apos;re live in BH6.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setCaptchaToken(null);
            }}
            className="mt-4 text-sm font-normal uppercase tracking-widest text-brand-green hover:underline"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 animate-in fade-in duration-500 delay-300">
      
     

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="flex-grow bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-brand-green/50 outline-none transition font-normal"
        />
        <div className="relative md:w-1/3">
          <select
            name="intent"
            defaultValue="Just Curious"
            className="w-full h-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white focus:ring-2 focus:ring-brand-green/50 outline-none transition font-normal appearance-none cursor-pointer pr-10"
          >
            <option className="text-brand-dark" value="Find Gathering">Find Gathering</option>
            <option className="text-brand-dark" value="Create Gathering">Create Gathering</option>
            <option className="text-brand-dark" value="Share a place or Venue">Share a place or Venue</option>
            <option className="text-brand-dark" value="All of the above">All of the above</option>
            <option className="text-brand-dark" value="Just Curious">Just Curious</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {error && <p className="text-brand-terracotta text-sm text-center font-medium bg-white/10 p-2 rounded-lg">{error}</p>}

       <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Using a test key fallback if env is missing for dev
          onChange={onCaptchaChange}
          theme="dark"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-linen text-brand-teal py-4 rounded-2xl text-xl font-normal hover:bg-white transition shadow-xl transform active:scale-[0.98] uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Keep me posted <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}