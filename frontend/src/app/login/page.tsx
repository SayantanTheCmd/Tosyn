"use client";

import { useState } from "react";
import JellyRadio from "@/components/JellyRadio";
import CodeSlots from "@/components/CodeSlots";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, SmartPhone01Icon, ArrowRight02Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [method, setMethod] = useState<"options" | "email" | "phone" | "otp" | "details">("options");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);

  // Profile Registration states
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [targetExam, setTargetExam] = useState<"JEE" | "NEET">("JEE");
  const [targetYear, setTargetYear] = useState("2026");

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
      await new Promise(resolve => setTimeout(resolve, 600));
      if (code === "123456" || code.length === 6) {
        setOtpStatus("success");
        if (mode === "register") {
          setTimeout(() => { setMethod("details"); }, 600);
        } else {
          localStorage.setItem("access_token", "fake-jwt-token");
          setTimeout(() => { window.location.href = "/dashboard"; }, 800);
        }
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
    if (mode === "register") {
      setTimeout(() => {
        setIsLoading(false);
        setMethod("details");
      }, 600);
    } else {
      localStorage.setItem("user_email", email);
      setTimeout(() => { window.location.href = "/dashboard"; }, 800);
    }
  };

  const handleProfileRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem("user_name", fullName || "Sayantan");
    localStorage.setItem("user_email", regEmail || email || "sayantan@ranktorque.in");
    localStorage.setItem("user_phone", regPhone || phoneNumber || "9876543210");
    localStorage.setItem("selectedExam", targetExam);
    localStorage.setItem("user_target_year", targetYear);
    localStorage.setItem("user_password", regPassword || "••••••••");
    localStorage.setItem("access_token", "fake-jwt-token");

    setTimeout(() => {
      window.location.href = "/select-exam";
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* LEFT PANEL */}
      <div className="flex-1 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-white/[0.06] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[400px] lg:min-h-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span className="font-black text-xl tracking-tighter leading-none">R</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">RankTorque</h1>
        </div>
        
        <div className="z-10 w-full mb-12 flex flex-col justify-center h-full">
          <h2 className="text-[3.5rem] lg:text-[4.5rem] font-bold tracking-tighter text-white leading-[1.05] mb-6">
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              impossible.
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 font-medium max-w-md leading-relaxed">
            The RankTorque mission is to empower competitive exam aspirants with distraction-free, high-precision problem-solving tools.
          </p>
        </div>

        <div className="z-10 flex items-center gap-6 text-sm font-medium text-zinc-600">
          <span className="text-zinc-500">&copy; 2026 RankTorque</span>
          <a href="/about" className="hover:text-zinc-300 transition-colors">About &amp; Support</a>
        </div>
      </div>

      {/* RIGHT PANEL: Auth & Registration Flow */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-[#050505]">
        <div className="w-full max-w-[460px] z-10 flex flex-col gap-8">
          
          <div className="flex flex-col items-center gap-6">
            <JellyRadio 
              items={[{ value: "signin", label: "Sign In" }, { value: "register", label: "Register" }] as any}
              value={mode}
              onChange={(val: any) => { setMode(val); setMethod("options"); }}
              size="lg"
            />
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {method === "details" ? "Create Profile Details" : (mode === "signin" ? "Welcome back" : "Create an account")}
              </h2>
              <p className="text-sm text-zinc-400">
                {method === "details" ? "Fill in your profile details to personalize your exam practice." : (mode === "signin" ? "Enter your details to access your dashboard." : "Join thousands of top-tier aspirants today.")}
              </p>
            </div>
          </div>

          <div className="relative w-full bg-[#0a0a0a] backdrop-blur-xl border border-white/[0.06] rounded-[24px] p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              
              {method === "options" && (
                <motion.div key="options" variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-3">
                  <button onClick={() => { if (mode === "register") setMethod("details"); else window.location.href = "/dashboard"; }} className="group relative flex items-center justify-center gap-3 w-full bg-white text-black font-medium rounded-2xl px-4 py-3.5 hover:bg-zinc-100 transition-all active:scale-[0.98]">
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
                    {isLoading ? "Please wait..." : (mode === "signin" ? "Sign In" : "Next: Enter Details")} 
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

              {/* Registration Form Details Step */}
              {method === "details" && (
                <motion.form key="details" onSubmit={handleProfileRegisterSubmit} variants={containerVariants as any} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm" placeholder="e.g. Sayantan" required />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Target Exam</label>
                      <select value={targetExam} onChange={e => setTargetExam(e.target.value as "JEE" | "NEET")} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm">
                        <option value="JEE">JEE (PCM)</option>
                        <option value="NEET">NEET (PCB)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Target Year</label>
                      <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm">
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input type="email" value={regEmail || email} onChange={e => setRegEmail(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm" placeholder="sayantan@example.com" required />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pl-1">Password</label>
                    <input type="password" value={regPassword || password} onChange={e => setRegPassword(e.target.value)} className="bg-[#111] border border-white/[0.06] rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm" placeholder="••••••••" required />
                  </div>

                  <button type="submit" disabled={isLoading} className="mt-2 group flex items-center justify-center gap-2 bg-white text-black font-medium rounded-2xl px-4 py-3.5 hover:bg-zinc-200 transition-all active:scale-[0.98]">
                    {isLoading ? "Creating Profile..." : "Complete Setup & Launch"}
                    {!isLoading && <HugeiconsIcon icon={ArrowRight02Icon} size={18} className="text-zinc-500 group-hover:text-black transition-colors" />}
                  </button>

                  <button type="button" onClick={() => setMethod("options")} className="text-xs font-medium text-zinc-500 hover:text-zinc-300 mt-1 transition-colors">← Back to start</button>
                </motion.form>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
