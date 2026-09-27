"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/Stepper";
import WarmTooltip from "@/components/WarmTooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Tick02Icon,
  Alert02Icon,
  PencilEdit02Icon,
  Delete02Icon
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function MockTestPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showQuitModal, setShowQuitModal] = useState(false);

  // Exam RoughWork state
  const [roughText, setRoughText] = useState("RoughWork Scratchpad:\n- Q1: ");

  const questions = [
    {
      id: 1,
      question: "What is the unit of Electric Flux?",
      options: ["V/m", "V.m", "N/C", "C/m²"],
      correct: "V.m"
    },
    {
      id: 2,
      question: "Which of the following acts as a circuit protection device?",
      options: ["Conductor", "Inductor", "Switch", "Fuse"],
      correct: "Fuse"
    },
    {
      id: 3,
      question: "The half-life of a radioactive substance depends upon:",
      options: ["Nature of the substance", "Temperature", "Pressure", "Amount of substance"],
      correct: "Nature of the substance"
    }
  ];

  // Prevent accidental navigation
  useEffect(() => {
    if (completed) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [completed]);

  const handleSelect = (qId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleBackClick = () => {
    if (completed) {
      router.push("/dashboard");
    } else {
      setShowQuitModal(true);
    }
  };

  const confirmQuit = () => {
    setShowQuitModal(false);
    router.push("/dashboard");
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <HugeiconsIcon icon={Tick02Icon} size={40} className="text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Test Submitted!</h1>
        <p className="text-zinc-400 mb-8 max-w-md text-center">Your mock test has been successfully evaluated. Check your analytics dashboard for detailed performance metrics.</p>
        <button 
          onClick={() => router.push("/dashboard")}
          className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col p-6 md:p-8 font-sans relative">
      {/* Quit Warning Modal */}
      <AnimatePresence>
        {showQuitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#0d0d0f] border border-white/10 rounded-3xl p-7 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <HugeiconsIcon icon={Alert02Icon} size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quit Mock Test?</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Are you sure you want to quit? Your current progress and test answers will be lost.
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setShowQuitModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 font-semibold text-sm transition-colors border border-white/5"
                >
                  Resume Test
                </button>
                <button
                  type="button"
                  onClick={confirmQuit}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/30"
                >
                  Quit to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleBackClick}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit mb-8 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
          <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
        </div>
        <span className="text-sm font-medium">Back to Dashboard</span>
      </button>

      {/* Main Grid: Exam Stepper on Left, RoughWork Panel on Right */}
      <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Area: Test Stepper */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">AITS - Full Syllabus Mock 1</h1>
            <p className="text-zinc-500 text-sm">Physics Section • 3 Questions</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-black/50">
            <Stepper
              initialStep={1}
              onFinalStepCompleted={() => setCompleted(true)}
              backButtonText="Previous Question"
              nextButtonText="Next Question"
              stepCircleContainerClassName="mb-10"
            >
              {questions.map((q) => (
                <Step key={q.id}>
                  <div className="flex flex-col min-h-[300px]">
                    <h2 className="text-2xl font-semibold mb-8 text-white leading-relaxed">
                      <span className="text-blue-500 mr-3">Q{q.id}.</span> 
                      {q.question}
                    </h2>
                    
                    <div className="flex flex-col gap-4 flex-1">
                      {q.options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all text-left ${
                            answers[q.id] === opt 
                              ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                              : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/20"
                          }`}
                        >
                          <span className={`text-lg ${answers[q.id] === opt ? "text-blue-400 font-medium" : "text-zinc-300"}`}>
                            {opt}
                          </span>
                          
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            answers[q.id] === opt ? "border-blue-500 bg-blue-500" : "border-zinc-700"
                          }`}>
                            {answers[q.id] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>

        {/* Right Area: Dedicated Exam RoughWork Panel */}
        <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-[32px] p-6 shadow-2xl flex flex-col gap-5 sticky top-8">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">RoughWork</h3>
                <p className="text-[11px] text-zinc-500">Live scratchpad during test</p>
              </div>
            </div>

            {/* Quick Insert Tools with WarmTooltip */}
            <div className="flex items-center gap-1.5">
              <WarmTooltip content="Insert Physics formula" side="top">
                <button
                  type="button"
                  onClick={() => setRoughText(prev => prev + "\n[PHY] v = u + at | F = ma")}
                  className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-[10px] font-bold"
                >
                  PHY
                </button>
              </WarmTooltip>

              <WarmTooltip content="Insert Chemistry formula" side="top">
                <button
                  type="button"
                  onClick={() => setRoughText(prev => prev + "\n[CHM] PV = nRT | pH = -log[H+]")}
                  className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-[10px] font-bold"
                >
                  CHM
                </button>
              </WarmTooltip>

              <WarmTooltip content="Clear scratchpad" side="top">
                <button
                  type="button"
                  onClick={() => setRoughText("RoughWork Scratchpad:\n")}
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                </button>
              </WarmTooltip>
            </div>
          </div>

          <textarea
            value={roughText}
            onChange={e => setRoughText(e.target.value)}
            placeholder="Work out your step-by-step calculations here..."
            rows={14}
            className="w-full bg-[#050505] border border-white/5 rounded-2xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed shadow-inner"
          />

          <p className="text-[11px] text-zinc-500 italic text-center">
            Scratchpad stays active while navigating questions.
          </p>
        </div>

      </div>
    </main>
  );
}
