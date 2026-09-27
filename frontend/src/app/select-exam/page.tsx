"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

export default function SelectExamPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<"JEE" | "NEET" | null>(null);

  const handleSelect = (track: "JEE" | "NEET") => {
    setSelectedTrack(track);
    setIsExiting(true);
    localStorage.setItem("selectedExam", track);
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const jeeFeatures = [
    "Physics, Chemistry, Mathematics (PCM)",
    "Targeting JEE Mains & Advanced exams",
    "Engineering & Architecture focus",
    "Advanced problem-solving & derivations"
  ];

  const neetFeatures = [
    "Physics, Chemistry, Biology (PCB)",
    "Targeting NEET UG medical exam",
    "Medical & Dental sciences focus",
    "High-yield theory & factual retention"
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Sleek Background glow */}
      <motion.div 
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="text-center mb-16 z-10 pt-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Choose Your Path</h1>
        <p className="text-lg text-zinc-400 max-w-md mx-auto">Select your target examination to customize your learning experience and curriculum.</p>
      </motion.div>

      <div className="flex flex-col gap-6 w-full max-w-3xl z-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isExiting && selectedTrack !== "JEE" ? 0 : 1, 
            y: isExiting && selectedTrack !== "JEE" ? 30 : 0,
            scale: isExiting && selectedTrack === "JEE" ? 1.02 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="cursor-pointer group" 
          onClick={() => !isExiting && handleSelect("JEE")}
        >
          <SpotlightCard className={`bg-[#0a0a0a] border ${isExiting && selectedTrack === "JEE" ? "border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]" : "border-white/5"} rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-300`}>
            
            <div className="flex-1 text-left w-full">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-600 tracking-tighter">JEE</h2>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isExiting && selectedTrack === "JEE" ? "bg-blue-500 text-white" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                  {isExiting && selectedTrack === "JEE" ? "Selected" : "Engineering"}
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">For students aspiring to join IITs, NITs, and top engineering institutions across India.</p>
            </div>
            
            <div className="flex-1 w-full bg-white/[0.02] rounded-2xl p-6 border border-white/[0.03]">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4">Curriculum</h3>
              <ul className="flex flex-col gap-3">
                {jeeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                    <div className="mt-0.5 text-blue-400 shrink-0"><HugeiconsIcon icon={Tick02Icon} size={16} /></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-colors text-zinc-500 border border-white/5 group-hover:border-blue-400">
              <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
            </div>

          </SpotlightCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isExiting && selectedTrack !== "NEET" ? 0 : 1, 
            y: isExiting && selectedTrack !== "NEET" ? 30 : 0,
            scale: isExiting && selectedTrack === "NEET" ? 1.02 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="cursor-pointer group" 
          onClick={() => !isExiting && handleSelect("NEET")}
        >
          <SpotlightCard className={`bg-[#0a0a0a] border ${isExiting && selectedTrack === "NEET" ? "border-rose-500 shadow-[0_0_40px_rgba(244,63,113,0.3)]" : "border-white/5"} rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-300`}>
            
            <div className="flex-1 text-left w-full">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-rose-400 to-orange-600 tracking-tighter">NEET</h2>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isExiting && selectedTrack === "NEET" ? "bg-rose-500 text-white" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                  {isExiting && selectedTrack === "NEET" ? "Selected" : "Medical"}
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">For students aiming for AIIMS, JIPMER, and top medical colleges nationwide.</p>
            </div>
            
            <div className="flex-1 w-full bg-white/[0.02] rounded-2xl p-6 border border-white/[0.03]">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4">Curriculum</h3>
              <ul className="flex flex-col gap-3">
                {neetFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                    <div className="mt-0.5 text-rose-400 shrink-0"><HugeiconsIcon icon={Tick02Icon} size={16} /></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-rose-500 group-hover:text-white transition-colors text-zinc-500 border border-white/5 group-hover:border-rose-400">
              <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
            </div>

          </SpotlightCard>
        </motion.div>
      </div>
    </main>
  );
}
