"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassSurface from "@/components/GlassSurface";
import CodeSlots from "@/components/CodeSlots";
import JellyRadio from "@/components/JellyRadio";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, SmartPhone01Icon, ArrowRight02Icon, Mortarboard01Icon, StarIcon } from "@hugeicons/core-free-icons";

export default function LoginPage() {
  const [mode, setMode] = useState("signin");
  const [method, setMethod] = useState<"options" | "phone" | "otp" | "email">("options");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setIsLoading(true);
    try {
      // Fake network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setMethod("otp");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = async (code: string) => {
    try {
      // Fake network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      if (code === "123456" || code.length === 6) {
        localStorage.setItem("access_token", "fake-jwt-token");
        setOtpStatus("success");
        setTimeout(() => { window.location.href = "/select-exam"; }, 1000);
      } else {
        setOtpStatus("error");
        setTimeout(() => setOtpStatus("idle"), 2000);
      }
    } catch (error) {
      setOtpStatus("error");
      setTimeout(() => setOtpStatus("idle"), 2000);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { window.location.href = "/select-exam"; }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] flex text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* 
        LEFT PANEL: Ultra-Premium Minimalist Typography & Grid
      */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-16 border-r border-white/[0.04] overflow-hidden bg-black">
        {/* Subtle Fading Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_0%_0%,#000_40%,transparent_100%)] pointer-events-none" />
        
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span className="font-black text-xl tracking-tighter leading-none">T</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">ToSyn</h1>
        </div>
        
        <div className="z-10 w-full mb-12 flex flex-col justify-center h-full">
          <h2 className="text-[4rem] lg:text-[5rem] font-bold tracking-tighter text-white leading-[1.05] mb-6">
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              impossible.
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 font-medium max-w-md leading-relaxed">
            The ToSyn aim is to democratize elite-tier education. We fuse cutting-edge software with world-class curriculum to unlock your true potential.
          </p>
        </div>

        <div className="z-10 flex items-center gap-6 text-sm font-medium text-zinc-600">
          <span className="text-zinc-500">© 2026 ToSyn</span>
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
        </div>
      </div>

      {/* 
        RIGHT PANEL: Auth Flow 
        Uses Framer Motion AnimatePresence for flawless layout shifts and state transitions.
      */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-[#050505]">
        <div className="w-full max-w-[420px] z-10 flex flex-col gap-10">
          
          <div className="flex flex-col items-center gap-8">
            <JellyRadio 
              items={[{ value: "signin", label: "Sign In" }, { value: "register", label: "Register" }] as any}
              value={mode}
              onChange={(val: any) => { setMode(val); setMethod("options"); }}
              size="lg"
            />
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {mode === "signin" ? "Welcome back" : "Create an account"}
              </h2>
              <p className="text-sm text-zinc-400">
                {mode === "signin" ? "Enter your details to access your premium courses." : "Join thousands of top-tier aspirants today."}
              </p>
            </div>
          </div>

          <div className="relative w-full bg-[#0a0a0a] backdrop-blur-xl border border-white/[0.06] rounded-[24px] p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              
              {method === "options" && (
                <motion.div key="options" variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-3">
                  <button className="group relative flex items-center justify-center gap-3 w-full bg-white text-black font-medium rounded-2xl px-4 py-3.5 hover:bg-zinc-100 transition-all active:scale-[0.98]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.01 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Continue with Google
                  </button>
                  <button onClick={() => setMethod("email")} className="group relative flex items-center justify-center gap-3 w-full bg-[#111] border border-white/[0.06] text-zinc-300 font-medium rounded-2xl px-4 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-all active:scale-[0.98]">
                    <HugeiconsIcon icon={Mail01Icon} size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                    Continue with Email
                  </button>
                  <button onClick={() => setMethod("phone")} className="group relative flex items-center justify-center gap-3 w-full bg-[#111] border border-white/[0.06] text-zinc-300 font-medium rounded-2xl px-4 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-all active:scale-[0.98]">
                    <HugeiconsIcon icon={SmartPhone01Icon} size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                    Continue with Phone
                  </button>
                </motion.div>
              )}

              {method === "email" && (
                <motion.form key="email" onSubmit={handleEmailSubmit} variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all shadow-inner" placeholder="name@example.com" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all shadow-inner" placeholder="••••••••" required />
                  </div>
                  <button type="submit" disabled={isLoading} className="mt-2 group flex items-center justify-center gap-2 bg-white text-black font-medium rounded-2xl px-4 py-3.5 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoading ? "Please wait..." : (mode === "signin" ? "Sign In" : "Create Account")} 
                    {!isLoading && <HugeiconsIcon icon={ArrowRight02Icon} size={18} className="text-zinc-500 group-hover:text-black transition-colors" />}
                  </button>
                  <button type="button" onClick={() => setMethod("options")} className="text-xs font-medium text-zinc-500 hover:text-zinc-300 mt-3 transition-colors">← Back to options</button>
                </motion.form>
              )}

              {method === "phone" && (
                <motion.form key="phone" onSubmit={handlePhoneSubmit} variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Phone Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-zinc-500 font-medium">+91</span>
                      <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))} maxLength={10} className="w-full bg-[#111] border border-white/[0.06] rounded-2xl pl-14 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all shadow-inner text-lg tracking-widest font-mono" placeholder="9876543210" required />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading || phoneNumber.length < 10} className="mt-2 group flex items-center justify-center gap-2 bg-white text-black font-medium rounded-2xl px-4 py-3.5 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Sending..." : "Send Secure OTP"}
                    {!isLoading && <HugeiconsIcon icon={ArrowRight02Icon} size={18} className="text-zinc-500 group-hover:text-black transition-colors" />}
                  </button>
                  <button type="button" onClick={() => setMethod("options")} className="text-xs font-medium text-zinc-500 hover:text-zinc-300 mt-3 transition-colors">← Back to options</button>
                </motion.form>
              )}

              {method === "otp" && (
                <motion.div key="otp" variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center gap-8 py-2">
                  <div className="text-center space-y-1">
                    <p className="text-[13px] text-zinc-400">Enter the 6-digit code sent to</p>
                    <p className="text-zinc-200 font-mono tracking-wider font-medium">+91 {phoneNumber}</p>
                  </div>
                  
                  <div className="w-full flex justify-center scale-100">
                    <CodeSlots length={6} onComplete={handleOtpComplete} status={otpStatus as any} autoFocus 
                      accentColor="#3b82f6" inkColor="#ffffff" slotColor="#111" digitColor="#ffffff" value="" onChange={() => {}} />
                  </div>
                  
                  {otpStatus === "error" && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-medium bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">Incorrect code. Please try again.</motion.p>}
                  
                  <button onClick={() => setMethod("phone")} className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">← Change Phone Number</button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
