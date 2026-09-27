"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SpotlightCard from "@/components/SpotlightCard";

export default function SelectExamPage() {
  const router = useRouter();

  const handleSelect = (track: "JEE" | "NEET") => {
    localStorage.setItem("selectedExam", track);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Choose Your Path</h1>
        <p className="text-lg text-zinc-400 max-w-md mx-auto">Select your target examination to customize your learning experience.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl z-10">
        <div className="flex-1 cursor-pointer" onClick={() => handleSelect("JEE")}>
          <SpotlightCard className="h-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-all">
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 tracking-tighter">JEE</h2>
            <p className="text-zinc-400 font-medium">Physics • Chemistry • Mathematics</p>
            <div className="mt-8 px-6 py-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20">
              Select JEE
            </div>
          </SpotlightCard>
        </div>

        <div className="flex-1 cursor-pointer" onClick={() => handleSelect("NEET")}>
          <SpotlightCard className="h-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-rose-500/30 transition-all">
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-rose-400 to-orange-600 mb-4 tracking-tighter">NEET</h2>
            <p className="text-zinc-400 font-medium">Physics • Chemistry • Biology</p>
            <div className="mt-8 px-6 py-3 rounded-full bg-rose-500/10 text-rose-400 text-sm font-semibold border border-rose-500/20">
              Select NEET
            </div>
          </SpotlightCard>
        </div>
      </div>
    </main>
  );
}
