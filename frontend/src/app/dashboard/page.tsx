"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JellyRadio from "@/components/JellyRadio";
import BellToggle from "@/components/BellToggle";
import SpotlightCard from "@/components/SpotlightCard";
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen01Icon, AnalyticsUpIcon, UserCircleIcon, PlayIcon, File02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [track, setTrack] = useState<"JEE" | "NEET" | null>(null);
  const [bellPressed, setBellPressed] = useState(false);

  useEffect(() => {
    const selected = localStorage.getItem("selectedExam") as "JEE" | "NEET";
    if (!selected) {
      router.push("/select-exam");
    } else {
      setTrack(selected);
    }
  }, [router]);

  const navItems = [
    { value: "courses", label: "Practice", icon: <HugeiconsIcon icon={BookOpen01Icon} size={18} /> },
    { value: "tests", label: "Mock Tests", icon: <HugeiconsIcon icon={File02Icon} size={18} /> },
    { value: "analytics", label: "Analytics", icon: <HugeiconsIcon icon={AnalyticsUpIcon} size={18} /> },
    { value: "profile", label: "Profile", icon: <HugeiconsIcon icon={UserCircleIcon} size={18} /> },
  ];

  const tests = [
    { id: 1, title: `AITS - Full Syllabus Mock 1`, type: `${track || ""} Mains` },
    { id: 2, title: track === "NEET" ? "Botany + Zoology Half Syllabus" : "Mechanics + Electrodynamics Half Syllabus", type: track || "" },
    { id: 3, title: track === "NEET" ? "Genetics Chapter Test" : "Mechanics Chapter Test", type: "Topic Wise" },
  ];

  const jeeSubjects = [
    { subject: "Physics", href: "/dashboard/practice/physics", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-500/50" },
    { subject: "Chemistry", href: "/dashboard/practice/chemistry", color: "from-rose-600/20 to-rose-900/10", border: "border-rose-500/50" },
    { subject: "Mathematics", href: "/dashboard/practice/mathematics", color: "from-purple-600/20 to-purple-900/10", border: "border-purple-500/50" }
  ];

  const neetSubjects = [
    { subject: "Physics", href: "/dashboard/practice/physics", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-500/50" },
    { subject: "Chemistry", href: "/dashboard/practice/chemistry", color: "from-rose-600/20 to-rose-900/10", border: "border-rose-500/50" },
    { subject: "Biology", href: "/dashboard/practice/biology", color: "from-green-600/20 to-green-900/10", border: "border-green-500/50" }
  ];

  const subjects = track === "NEET" ? neetSubjects : jeeSubjects;

  if (!track) return null; // Wait for track resolution

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Premium Header */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            ToSyn <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">{track}</span>
          </h1>
          <JellyRadio items={navItems as any} defaultValue="courses" size="md" />
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Support</button>
          <BellToggle 
            count={bellPressed ? 0 : 3} 
            icon={undefined} 
            label="" 
            pressed={bellPressed} 
            onChange={(pressed: boolean) => setBellPressed(pressed)} 
          />
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
            <HugeiconsIcon icon={UserCircleIcon} size={20} className="text-zinc-300" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-8 md:p-12 flex flex-col gap-16">
        
        {/* Practice Section */}
        <section className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Subject Practice</h2>
              <p className="text-sm text-zinc-400">Master every concept for {track}. Access topic-wise and full-syllabus questions.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map(item => (
              <a href={item.href} key={item.subject} className="block group">
                <SpotlightCard className={`h-full bg-gradient-to-br ${item.color} border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4 shadow-lg shadow-black/50 transition-all group-hover:border-white/20`} spotlightColor="rgba(255, 255, 255, 0.15)">
                  <div className="flex items-center justify-between z-10 w-full">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{item.subject}</h3>
                    <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                      <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="z-10 mt-auto">
                    <p className="text-sm text-zinc-300 font-medium mb-1">Class 11 & 12 • Past 10 Years</p>
                    <p className="text-xs text-zinc-400">Fully solved, actual NTA interface.</p>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </section>

        {/* Mock Tests Section */}
        <section className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Latest Mock Tests</h2>
              <p className="text-sm text-zinc-400">Benchmark your preparation against top candidates.</p>
            </div>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">View all tests &rarr;</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tests.map(test => (
              <a href="/dashboard/mock-test" key={test.id} className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 hover:bg-[#111] transition-all cursor-pointer group flex items-center justify-between shadow-lg shadow-black/50 hover:border-white/10 block">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">{test.type}</span>
                  <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors">{test.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <HugeiconsIcon icon={PlayIcon} size={18} />
                </div>
              </a>
            ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}
