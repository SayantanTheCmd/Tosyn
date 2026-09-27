"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import WarmTooltip from "@/components/WarmTooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Time01Icon,
  HelpCircleIcon,
  Alert02Icon,
  PencilEdit02Icon,
  Delete02Icon
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

// Mock Question Bank
const mockQuestions: Record<string, any[]> = {
  physics: [
    { id: 1, text: "A particle is moving in a circular path of radius R with constant speed v. What is the change in velocity when it covers half of the circular path?", options: ["Zero", "v", "2v", "v/2"], correct: 2 },
    { id: 2, text: "In a Young's double slit experiment, if the separation between the slits is halved, and the distance to the screen is doubled, the fringe width will be:", options: ["Halved", "Unchanged", "Doubled", "Quadrupled"], correct: 3 },
    { id: 3, text: "The de Broglie wavelength of an electron moving with kinetic energy E is λ. If the kinetic energy is quadrupled, the wavelength becomes:", options: ["λ/4", "λ/2", "2λ", "4λ"], correct: 1 },
  ],
  chemistry: [
    { id: 1, text: "Which of the following has the highest dipole moment?", options: ["CH3Cl", "CH2Cl2", "CHCl3", "CCl4"], correct: 0 },
    { id: 2, text: "The geometry of XeF4 is:", options: ["Tetrahedral", "Square planar", "Octahedral", "See-saw"], correct: 1 },
  ],
  mathematics: [
    { id: 1, text: "The value of integral from 0 to pi/2 of (sin x) / (sin x + cos x) dx is:", options: ["pi/4", "pi/2", "pi", "0"], correct: 0 },
    { id: 2, text: "The number of real solutions of the equation x^2 - 5|x| + 6 = 0 is:", options: ["2", "4", "0", "1"], correct: 1 },
  ]
};

export default function PYQTestPage() {
  const params = useParams();
  const router = useRouter();
  const subject = (params?.subject as string)?.toLowerCase() || "physics";
  
  const questions = mockQuestions[subject] || mockQuestions.physics;
  
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<Record<number, "answered" | "review" | "unanswered" | "not_visited">>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"palette" | "roughwork">("palette");
  const [roughText, setRoughText] = useState("Exam RoughWork:\n");

  useEffect(() => {
    // Initialize status
    const initStatus: any = {};
    questions.forEach((_, idx) => {
      initStatus[idx] = "not_visited";
    });
    initStatus[0] = "unanswered";
    setStatus(initStatus);
    
    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ]: optIndex }));
  };

  const saveAndNext = () => {
    const isAnswered = answers[currentQ] !== undefined;
    setStatus(prev => ({ ...prev, [currentQ]: isAnswered ? "answered" : "unanswered" }));
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setStatus(prev => ({ ...prev, [currentQ + 1]: prev[currentQ + 1] === "not_visited" ? "unanswered" : prev[currentQ + 1] }));
    }
  };

  const markForReview = () => {
    setStatus(prev => ({ ...prev, [currentQ]: "review" }));
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setStatus(prev => ({ ...prev, [currentQ + 1]: prev[currentQ + 1] === "not_visited" ? "unanswered" : prev[currentQ + 1] }));
    }
  };

  const jumpToQuestion = (idx: number) => {
    const isAnswered = answers[currentQ] !== undefined;
    if (status[currentQ] !== "review") {
      setStatus(prev => ({ ...prev, [currentQ]: isAnswered ? "answered" : "unanswered" }));
    }
    setCurrentQ(idx);
    setStatus(prev => ({ ...prev, [idx]: prev[idx] === "not_visited" ? "unanswered" : prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200 relative">
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
              <h3 className="text-xl font-bold text-white mb-2">Quit Practice Session?</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Are you sure you want to quit? Your current test responses and progress will not be saved.
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
                  onClick={() => {
                    setShowQuitModal(false);
                    router.push('/dashboard');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/30"
                >
                  Quit to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/[0.04] bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowQuitModal(true)} 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Back to Dashboard"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white capitalize">{subject} - Class 12 PYQs</h1>
            <p className="text-xs text-zinc-400">Target 2026 Batch</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
          <HugeiconsIcon icon={Time01Icon} size={18} className="text-red-400" />
          <span className="text-red-400 font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="flex-1 flex max-h-[calc(100vh-73px)]">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col border-r border-white/[0.04]">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Question {currentQ + 1}</h2>
              <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full border border-white/10">Single Choice Correct</span>
            </div>
            
            <div className="text-lg text-zinc-200 leading-relaxed mb-10">
              {questions[currentQ].text}
            </div>

            <div className="flex flex-col gap-4">
              {questions[currentQ].options.map((opt: string, idx: number) => {
                const isSelected = answers[currentQ] === idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${isSelected ? 'bg-blue-600/20 border-blue-500/50' : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${isSelected ? 'border-blue-400 text-blue-400' : 'border-zinc-500 text-zinc-500'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={isSelected ? 'text-blue-100 font-medium' : 'text-zinc-300'}>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-6 border-t border-white/[0.04] bg-[#0a0a0a] flex items-center justify-between">
            <button onClick={markForReview} className="px-6 py-3 rounded-xl bg-orange-500/10 text-orange-400 font-medium border border-orange-500/20 hover:bg-orange-500/20 transition-all">
              Mark for Review
            </button>
            <button onClick={saveAndNext} className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50">
              Save &amp; Next
            </button>
          </div>
        </div>

        {/* Right Sidebar: Palette or RoughWork */}
        <div className="w-[340px] bg-[#0a0a0a] flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-white/[0.06] bg-black/40 p-2 gap-2">
            <button
              onClick={() => setSidebarTab("palette")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${sidebarTab === "palette" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Question Palette
            </button>
            <button
              onClick={() => setSidebarTab("roughwork")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${sidebarTab === "roughwork" ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
              <span>RoughWork</span>
            </button>
          </div>

          {sidebarTab === "palette" ? (
            <>
              <div className="p-6 border-b border-white/[0.04]">
                <h3 className="font-semibold text-white mb-4">Question Palette</h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"></div> Answered</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500"></div> Not Answered</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-orange-500"></div> Review</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-zinc-700"></div> Not Visited</div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-4 gap-3">
                  {questions.map((_: any, idx: number) => {
                    const s = status[idx];
                    let bg = "bg-zinc-800 border-zinc-700 text-zinc-400"; // not visited
                    if (s === "answered") bg = "bg-green-500 border-green-400 text-white shadow-lg shadow-green-900/50";
                    if (s === "unanswered") bg = "bg-red-500 border-red-400 text-white";
                    if (s === "review") bg = "bg-orange-500 border-orange-400 text-white";
                    
                    const isCurrent = currentQ === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => jumpToQuestion(idx)}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold transition-all ${bg} ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]' : ''}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-white/[0.04]">
                <button className="w-full py-4 rounded-xl bg-green-600 text-white font-bold tracking-widest hover:bg-green-500 transition-all shadow-lg shadow-green-900/50">
                  SUBMIT TEST
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col p-6 gap-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-bold text-white">Exam Scratchpad</h3>
                <div className="flex items-center gap-1.5">
                  <WarmTooltip content="Insert Physics formula" side="top">
                    <button
                      type="button"
                      onClick={() => setRoughText(prev => prev + "\n[PHY] v = u + at")}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 text-[10px] font-bold"
                    >
                      PHY
                    </button>
                  </WarmTooltip>
                  <WarmTooltip content="Clear scratchpad" side="top">
                    <button
                      type="button"
                      onClick={() => setRoughText("Exam RoughWork:\n")}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={14} />
                    </button>
                  </WarmTooltip>
                </div>
              </div>

              <textarea
                value={roughText}
                onChange={e => setRoughText(e.target.value)}
                placeholder="Type temporary working..."
                rows={16}
                className="flex-1 w-full bg-[#050505] border border-white/5 rounded-2xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed shadow-inner"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
