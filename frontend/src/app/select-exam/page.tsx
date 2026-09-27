"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";

export default function SelectExamPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<"JEE" | "NEET" | null>(null);

  const handleSelect = (track: "JEE" | "NEET") => {
    setSelectedTrack(track);
    setIsExiting(true);
    localStorage.setItem("selectedExam", track);
    
    // Snappy transition
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

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
        className="text-center mb-16 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Choose Your Path</h1>
        <p className="text-lg text-zinc-400 max-w-md mx-auto">Select your target examination to customize your learning experience.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isExiting && selectedTrack !== "JEE" ? 0 : 1, 
            y: isExiting && selectedTrack !== "JEE" ? 30 : 0,
            scale: isExiting && selectedTrack === "JEE" ? 1.05 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 cursor-pointer" 
          onClick={() => !isExiting && handleSelect("JEE")}
        >
          <SpotlightCard className={`h-full bg-[#0a0a0a] border ${isExiting && selectedTrack === "JEE" ? "border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]" : "border-white/5"} rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300`}>
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 tracking-tighter">JEE</h2>
            <p className="text-zinc-400 font-medium">Physics • Chemistry • Mathematics</p>
            <div className={`mt-8 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${isExiting && selectedTrack === "JEE" ? "bg-blue-500 text-white" : "bg-white/5 text-zinc-300 group-hover:bg-blue-500/10 group-hover:text-blue-400"}`}>
              {isExiting && selectedTrack === "JEE" ? "Preparing Dashboard..." : "Select JEE"}
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isExiting && selectedTrack !== "NEET" ? 0 : 1, 
            y: isExiting && selectedTrack !== "NEET" ? 30 : 0,
            scale: isExiting && selectedTrack === "NEET" ? 1.05 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex-1 cursor-pointer" 
          onClick={() => !isExiting && handleSelect("NEET")}
        >
          <SpotlightCard className={`h-full bg-[#0a0a0a] border ${isExiting && selectedTrack === "NEET" ? "border-rose-500 shadow-[0_0_40px_rgba(244,63,113,0.3)]" : "border-white/5"} rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300`}>
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-rose-400 to-orange-600 mb-4 tracking-tighter">NEET</h2>
            <p className="text-zinc-400 font-medium">Physics • Chemistry • Biology</p>
            <div className={`mt-8 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${isExiting && selectedTrack === "NEET" ? "bg-rose-500 text-white" : "bg-white/5 text-zinc-300 group-hover:bg-rose-500/10 group-hover:text-rose-400"}`}>
              {isExiting && selectedTrack === "NEET" ? "Preparing Dashboard..." : "Select NEET"}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </main>
  );
}
