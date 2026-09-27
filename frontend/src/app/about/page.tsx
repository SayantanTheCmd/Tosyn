"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import Footer from "@/components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  UserCircleIcon,
  AiSparklesIcon,
  Mail01Icon,
  GlobalIcon,
  InstagramIcon,
  Github01Icon,
  Tick02Icon
} from "@hugeicons/core-free-icons";

export default function AboutPage() {
  const router = useRouter();

  const creators = [
    {
      name: "Sayantan",
      role: "Creator & Lead Product Architect",
      badge: "Founder",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      avatarBg: "from-blue-600 to-indigo-600",
      description:
        "Building RankTorque with a single mission: to provide JEE & NEET aspirants with a focused, distraction-free environment for pure question practice, high-yield revision, and active recall.",
      instagram: "https://instagram.com",
      instagramHandle: "@sayantan",
      github: "https://github.com",
      githubHandle: "Sayantan-Dev"
    },
    {
      name: "Tosin M",
      role: "Co-Creator & Strategic Director",
      badge: "Guiding & Architecture",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      avatarBg: "from-purple-600 to-pink-600",
      description:
        "Plays a key role in overall website direction, strategic guidance, and technical implementation planning, sculpting RankTorque's user experience and learning workflow.",
      instagram: "https://instagram.com",
      instagramHandle: "@tosin_m",
      github: "https://github.com",
      githubHandle: "Tosin-M"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-zinc-400 hover:text-white"
            title="Back to Dashboard"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
          </button>
          <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            RankTorque <span className="text-xs text-zinc-500 font-medium ml-1">/ About &amp; Contact</span>
          </h1>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
        >
          Return to Dashboard
        </button>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-14">
        
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-semibold mb-4"
          >
            <HugeiconsIcon icon={AiSparklesIcon} size={14} className="text-blue-400" />
            <span>Built for JEE &amp; NEET Aspirants</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Behind RankTorque
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-zinc-400 text-base leading-relaxed"
          >
            RankTorque is engineered to replace distracting test portals with a clean, high-density command center: chapterwise PYQs, dynamic priority revision, and simulated full-syllabus mock exams.
          </motion.p>
        </section>

        {/* Creators & Operators */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-lg font-bold text-white tracking-tight">Creators &amp; Operators</h3>
            <span className="text-xs text-zinc-500 font-medium">Core Engineering &amp; AI Pair</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creators.map((c, i) => (
              <SpotlightCard
                key={i}
                className="bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative"
                spotlightColor="rgba(255, 255, 255, 0.1)"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${c.avatarBg} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {c.name[0]}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-white tracking-tight">{c.name}</h4>
                  <p className="text-xs font-semibold text-blue-400 mb-4">{c.role}</p>
                  
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {c.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.05] flex flex-col gap-2.5">
                  <a
                    href={c.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition-colors text-xs font-medium text-zinc-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={InstagramIcon} size={16} className="text-pink-400" />
                      <span>Instagram</span>
                    </div>
                    <span className="text-zinc-500 group-hover:text-white transition-colors">{c.instagramHandle} &rarr;</span>
                  </a>

                  <a
                    href={c.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition-colors text-xs font-medium text-zinc-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Github01Icon} size={16} className="text-zinc-300" />
                      <span>GitHub</span>
                    </div>
                    <span className="text-zinc-500 group-hover:text-white transition-colors">{c.githubHandle} &rarr;</span>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Have Feedback or Questions?</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We are constantly refining questions, testing algorithms, and UI ergonomics. Reach out directly for support, question error reporting, or feature suggestions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:contact@tosyn.in"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <HugeiconsIcon icon={Mail01Icon} size={16} />
              <span>Email Support</span>
            </a>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              <span>Back to Dashboard</span>
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
