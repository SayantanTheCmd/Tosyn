"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import TiltedCard from "@/components/TiltedCard";

export default function SelectExamPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<"JEE" | "NEET" | null>(null);

  const handleSelect = (track: "JEE" | "NEET") => {
    setSelectedTrack(track);
    setIsExiting(true);
    localStorage.setItem("selectedExam", track);
    
    // Wait for the exit animation to complete before routing
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        animate={{ 
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.5 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 z-10"
          >
            <ShinyText 
              text="Choose Your Path" 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4" 
              speed={3}
            />
            <p className="text-lg text-zinc-400 max-w-md mx-auto">Select your target examination to customize your learning experience.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl z-10">
        <AnimatePresence>
          {(!isExiting || selectedTrack === "JEE") && (
            <motion.div 
              key="jee-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isExiting && selectedTrack === "JEE" ? 1.1 : 1,
                zIndex: isExiting && selectedTrack === "JEE" ? 50 : 1
              }}
              exit={{ opacity: 0, x: -100, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="flex-1 cursor-pointer" 
              onClick={() => !isExiting && handleSelect("JEE")}
            >
              <TiltedCard 
                containerHeight="350px"
                containerWidth="100%"
                imageHeight="350px"
                imageWidth="100%"
                displayOverlayContent={true}
                showMobileWarning={false}
                overlayContent={
                  <div className={`w-full h-full bg-[#0a0a0a] border ${isExiting && selectedTrack === "JEE" ? "border-blue-500" : "border-white/5"} rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-all shadow-2xl`}>
                    <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 tracking-tighter">JEE</h2>
                    <p className="text-zinc-400 font-medium">Physics • Chemistry • Mathematics</p>
                    <div className={`mt-8 px-6 py-3 rounded-full text-sm font-semibold border transition-all ${isExiting && selectedTrack === "JEE" ? "bg-blue-500 text-white border-blue-400" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}>
                      {isExiting && selectedTrack === "JEE" ? "Loading Dashboard..." : "Select JEE"}
                    </div>
                  </div>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(!isExiting || selectedTrack === "NEET") && (
            <motion.div 
              key="neet-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isExiting && selectedTrack === "NEET" ? 1.1 : 1,
                zIndex: isExiting && selectedTrack === "NEET" ? 50 : 1
              }}
              exit={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="flex-1 cursor-pointer" 
              onClick={() => !isExiting && handleSelect("NEET")}
            >
              <TiltedCard 
                containerHeight="350px"
                containerWidth="100%"
                imageHeight="350px"
                imageWidth="100%"
                displayOverlayContent={true}
                showMobileWarning={false}
                overlayContent={
                  <div className={`w-full h-full bg-[#0a0a0a] border ${isExiting && selectedTrack === "NEET" ? "border-rose-500" : "border-white/5"} rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-rose-500/30 transition-all shadow-2xl`}>
                    <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-rose-400 to-orange-600 mb-4 tracking-tighter">NEET</h2>
                    <p className="text-zinc-400 font-medium">Physics • Chemistry • Biology</p>
                    <div className={`mt-8 px-6 py-3 rounded-full text-sm font-semibold border transition-all ${isExiting && selectedTrack === "NEET" ? "bg-rose-500 text-white border-rose-400" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                      {isExiting && selectedTrack === "NEET" ? "Loading Dashboard..." : "Select NEET"}
                    </div>
                  </div>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
