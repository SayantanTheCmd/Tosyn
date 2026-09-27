"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Time01Icon,
  Alert02Icon,
  Tick02Icon,
  Cancel01Icon,
  HelpCircleIcon,
  FilterIcon,
  CheckmarkCircle02Icon,
  BookOpen01Icon,
  RefreshIcon,
  PencilEdit02Icon,
  Delete02Icon
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  AUTHENTIC_PYQS,
  PAPER_SESSIONS,
  YEARS_LIST,
  PYQQuestion,
  PaperSession
} from "@/data/pyqData";

export default function PYQTestPage() {
  const params = useParams();
  const router = useRouter();
  
  // URL Param Subject default
  const paramSubject = (params?.subject as string)?.toLowerCase() || "physics";
  
  // Practice Configuration State
  const [selectedSubject, setSelectedSubject] = useState<"physics" | "chemistry" | "mathematics" | "biology">(
    ["physics", "chemistry", "mathematics", "biology"].includes(paramSubject)
      ? (paramSubject as any)
      : "physics"
  );
  const [selectedClass, setSelectedClass] = useState<"11" | "12" | "both">("both");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Workflow Mode: "config" | "test" | "result"
  const [mode, setMode] = useState<"config" | "test" | "result">("config");

  // Test Execution State
  const [activeQuestions, setActiveQuestions] = useState<PYQQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<Record<number, "answered" | "review" | "unanswered" | "not_visited">>({});
  const [timeLeft, setTimeLeft] = useState(900); // default 15 mins
  const [initialTime, setInitialTime] = useState(900);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showRoughDrawer, setShowRoughDrawer] = useState(false);
  const [roughText, setRoughText] = useState("Rough Notebook Working:\n");

  // Result Filter State
  const [resultFilter, setResultFilter] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  // Synchronize when paramSubject changes
  useEffect(() => {
    if (["physics", "chemistry", "mathematics", "biology"].includes(paramSubject)) {
      setSelectedSubject(paramSubject as any);
    }
  }, [paramSubject]);

  // Filter Available Sessions based on selected subject, class, and year
  const availableSessions = PAPER_SESSIONS.filter(session => {
    const matchSubject = session.subject === selectedSubject;
    const matchClass = selectedClass === "both" || session.classLevel === "both" || session.classLevel === selectedClass;
    const matchYear = selectedYear === "all" || session.year === selectedYear;
    return matchSubject && matchClass && matchYear;
  });

  // Start Practice Test
  const handleStartTest = (sessionToStart?: PaperSession) => {
    let pool = AUTHENTIC_PYQS[selectedSubject] || AUTHENTIC_PYQS.physics;
    
    // Filter questions by class level
    if (selectedClass !== "both") {
      const filtered = pool.filter(q => q.classLevel === selectedClass || q.classLevel === "both");
      if (filtered.length > 0) pool = filtered;
    }

    // Filter questions by year if selected
    if (selectedYear !== "all") {
      const filteredYear = pool.filter(q => q.year === selectedYear);
      if (filteredYear.length > 0) pool = filteredYear;
    }

    // Ensure we have questions
    const testQuestions = pool.slice(0, 5);
    setActiveQuestions(testQuestions);
    
    // Initialize Status
    const initStatus: Record<number, "answered" | "review" | "unanswered" | "not_visited"> = {};
    testQuestions.forEach((_, idx) => {
      initStatus[idx] = "not_visited";
    });
    initStatus[0] = "unanswered";
    setStatus(initStatus);
    
    setAnswers({});
    setCurrentQIndex(0);
    const duration = (sessionToStart?.timeMinutes || 15) * 60;
    setTimeLeft(duration);
    setInitialTime(duration);
    setMode("test");
  };

  // Timer countdown during test
  useEffect(() => {
    if (mode !== "test") return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const saveAndNext = () => {
    const isAnswered = answers[currentQIndex] !== undefined;
    setStatus(prev => ({ ...prev, [currentQIndex]: isAnswered ? "answered" : "unanswered" }));
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setStatus(prev => ({ ...prev, [currentQIndex + 1]: prev[currentQIndex + 1] === "not_visited" ? "unanswered" : prev[currentQIndex + 1] }));
    }
  };

  const markForReview = () => {
    setStatus(prev => ({ ...prev, [currentQIndex]: "review" }));
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setStatus(prev => ({ ...prev, [currentQIndex + 1]: prev[currentQIndex + 1] === "not_visited" ? "unanswered" : prev[currentQIndex + 1] }));
    }
  };

  const jumpToQuestion = (idx: number) => {
    const isAnswered = answers[currentQIndex] !== undefined;
    if (status[currentQIndex] !== "review") {
      setStatus(prev => ({ ...prev, [currentQIndex]: isAnswered ? "answered" : "unanswered" }));
    }
    setCurrentQIndex(idx);
    setStatus(prev => ({ ...prev, [idx]: prev[idx] === "not_visited" ? "unanswered" : prev[idx] }));
  };

  const handleSubmitTest = () => {
    setShowQuitModal(false);
    setMode("result");
  };

  // Real Score Calculation
  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    activeQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.correctOptionIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQuestions = activeQuestions.length;
    const attemptedCount = correctCount + incorrectCount;
    // Standard JEE/NEET marking (+4 for correct, -1 for incorrect)
    const score = (correctCount * 4) - (incorrectCount * 1);
    const maxScore = totalQuestions * 4;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeSpent = initialTime - timeLeft;

    return {
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score,
      maxScore,
      accuracy,
      timeSpent
    };
  };

  const results = calculateResults();

  // Filter questions for detailed result review
  const reviewQuestions = activeQuestions.filter((q, idx) => {
    const userAns = answers[idx];
    if (resultFilter === "correct") return userAns === q.correctOptionIndex;
    if (resultFilter === "incorrect") return userAns !== undefined && userAns !== q.correctOptionIndex;
    if (resultFilter === "unattempted") return userAns === undefined;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200 relative">
      
      {/* ---------------------------------------------------- */}
      {/* 1. SELECTION CONFIGURATOR MODE */}
      {/* ---------------------------------------------------- */}
      {mode === "config" && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                title="Back to Dashboard"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>PYQ Practice Hub</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">10-Year Past Papers</span>
                </h1>
                <p className="text-xs text-zinc-400">Official NTA Delhi / All India Authentic Questions &amp; Solutions</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
            >
              Dashboard
            </button>
          </header>

          <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
            
            {/* Step 1: Select Subject */}
            <section className="flex flex-col gap-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">1</span>
                <span>Select Subject</span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "physics", label: "Physics", color: "from-blue-600/20 to-indigo-600/10", border: "border-blue-500/30", text: "text-blue-400" },
                  { id: "chemistry", label: "Chemistry", color: "from-rose-600/20 to-orange-600/10", border: "border-rose-500/30", text: "text-rose-400" },
                  { id: "mathematics", label: "Mathematics", color: "from-purple-600/20 to-pink-600/10", border: "border-purple-500/30", text: "text-purple-400" },
                  { id: "biology", label: "Biology", color: "from-emerald-600/20 to-teal-600/10", border: "border-emerald-500/30", text: "text-emerald-400" }
                ].map(sub => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(sub.id as any);
                      router.replace(`/dashboard/pyqs/${sub.id}`);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                      selectedSubject === sub.id
                        ? `bg-gradient-to-br ${sub.color} ${sub.border} ring-2 ring-blue-500/40 shadow-lg`
                        : "bg-[#0a0a0a] border-white/10 hover:border-white/20 text-zinc-400"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{sub.id}</span>
                    <span className={`text-lg font-bold ${selectedSubject === sub.id ? "text-white" : "text-zinc-200"}`}>{sub.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Select Class Target */}
            <section className="flex flex-col gap-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">2</span>
                <span>Select Class Curriculum</span>
              </label>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "11", title: "Class XI", subtitle: "11th Syllabus Chapters" },
                  { id: "12", title: "Class XII", subtitle: "12th Syllabus Chapters" },
                  { id: "both", title: "Both XI & XII", subtitle: "Full Syllabus Mix" }
                ].map(cls => (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setSelectedClass(cls.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedClass === cls.id
                        ? "bg-blue-600/15 border-blue-500 text-white ring-1 ring-blue-500/50 shadow-md"
                        : "bg-[#0a0a0a] border-white/10 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1">{cls.title}</div>
                    <div className="text-xs text-zinc-500">{cls.subtitle}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Filter Paper Session / Year */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">3</span>
                  <span>Select Past Exam Session (10-Yr Archives)</span>
                </label>

                {/* Year Filter Pill Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-md">
                  <button
                    type="button"
                    onClick={() => setSelectedYear("all")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedYear === "all" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    All Years
                  </button>
                  {YEARS_LIST.map(y => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setSelectedYear(y)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedYear === y ? "bg-blue-600 text-white" : "bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sessions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSessions.length > 0 ? (
                  availableSessions.map(session => (
                    <SpotlightCard
                      key={session.id}
                      className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-blue-500/40 transition-all cursor-pointer group"
                      onClick={() => handleStartTest(session)}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                            {session.year} • {session.session}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">{session.timeMinutes} Mins</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                          {session.title}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Subject: <span className="capitalize text-zinc-200 font-medium">{session.subject}</span> • Target: <span className="uppercase text-zinc-200 font-medium">Class {session.classLevel}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartTest(session);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/5 group-hover:bg-blue-600 text-zinc-200 group-hover:text-white text-xs font-bold transition-all border border-white/5 flex items-center justify-center gap-2 shadow-md"
                      >
                        <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                        <span>Start Practice Session</span>
                      </button>
                    </SpotlightCard>
                  ))
                ) : (
                  <div className="col-span-2 p-8 text-center bg-[#0a0a0a] border border-white/5 rounded-2xl">
                    <p className="text-zinc-400 text-sm mb-4">No exact session card matches the selected filter year, but authentic questions are available!</p>
                    <button
                      type="button"
                      onClick={() => handleStartTest()}
                      className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
                    >
                      Start Practice Test with Available Authentic PYQs
                    </button>
                  </div>
                )}
              </div>
            </section>

          </main>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. ACTIVE TEST RUNNER MODE */}
      {/* ---------------------------------------------------- */}
      {mode === "test" && activeQuestions.length > 0 && (
        <div className="flex-1 flex flex-col">
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
                    Are you sure you want to quit? Your current test responses will not be evaluated.
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
                        setMode("config");
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/30"
                    >
                      Quit Session
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide-over Rough Notebook Drawer for longer questions */}
          <AnimatePresence>
            {showRoughDrawer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full max-w-md bg-[#0a0a0a] border-l border-white/10 h-full p-6 flex flex-col gap-5 shadow-2xl relative"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                        <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">Rough Notebook</h3>
                        <p className="text-[11px] text-zinc-500">Scratchpad for longer question working</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowRoughDrawer(false)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={18} />
                    </button>
                  </div>

                  {/* Formula Insert Toolbar */}
                  <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-xl text-xs">
                    <span className="text-zinc-500 font-semibold text-[11px]">Quick Tools:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setRoughText(prev => prev + "\n[PHY] v = u + at | F = ma | λ = h/p")}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-bold"
                      >
                        + PHY
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoughText(prev => prev + "\n[CHM] PV = nRT | pH = -log[H+]")}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-bold"
                      >
                        + CHM
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoughText("")}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400"
                        title="Clear"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={roughText}
                    onChange={e => setRoughText(e.target.value)}
                    placeholder="Work out step-by-step equations, formula substitutions, and scratch calculations..."
                    rows={18}
                    className="flex-1 w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500 resize-none leading-relaxed shadow-inner"
                  />

                  <button
                    type="button"
                    onClick={() => setShowRoughDrawer(false)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg"
                  >
                    Close Rough Notebook
                  </button>
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
                title="Back to Config"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white capitalize">
                  {selectedSubject} - Authentic 10-Yr PYQs
                </h1>
                <p className="text-xs text-zinc-400">Class {selectedClass === "both" ? "XI & XII Mix" : selectedClass}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowRoughDrawer(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-xs font-bold shadow-md"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                <span>Rough Notebook</span>
              </button>

              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
                <HugeiconsIcon icon={Time01Icon} size={18} className="text-red-400" />
                <span className="text-red-400 font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </header>

          <div className="flex-1 flex max-h-[calc(100vh-73px)]">
            {/* Main Question Area */}
            <div className="flex-1 flex flex-col border-r border-white/[0.04]">
              <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">Question {currentQIndex + 1} of {activeQuestions.length}</h2>
                    <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20 font-mono">
                      {activeQuestions[currentQIndex].year} • {activeQuestions[currentQIndex].chapter}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full border border-white/10">Single Choice Correct (+4, -1)</span>
                </div>
                
                <div className="text-lg text-zinc-200 leading-relaxed mb-8 bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                  {activeQuestions[currentQIndex].question}
                </div>

                <div className="flex flex-col gap-4">
                  {activeQuestions[currentQIndex].options.map((opt, idx) => {
                    const isSelected = answers[currentQIndex] === idx;
                    return (
                      <button 
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          isSelected ? 'bg-blue-600/20 border-blue-500/50 shadow-md' : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'border-blue-400 text-blue-400 bg-blue-500/20' : 'border-zinc-600 text-zinc-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={isSelected ? 'text-blue-100 font-medium text-base' : 'text-zinc-300 text-base'}>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 border-t border-white/[0.04] bg-[#0a0a0a] flex items-center justify-between">
                <button 
                  onClick={markForReview} 
                  className="px-6 py-3 rounded-xl bg-orange-500/10 text-orange-400 font-medium border border-orange-500/20 hover:bg-orange-500/20 transition-all text-sm"
                >
                  Mark for Review
                </button>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={saveAndNext} 
                    className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 text-sm"
                  >
                    Save &amp; Next
                  </button>
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/50 text-sm"
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Question Palette */}
            <div className="w-[320px] bg-[#0a0a0a] flex flex-col justify-between">
              <div className="p-6 border-b border-white/[0.04]">
                <h3 className="font-semibold text-white mb-4">Question Palette</h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-green-500"></div> Answered</div>
                  <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-red-500"></div> Not Answered</div>
                  <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-orange-500"></div> Review</div>
                  <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-zinc-700"></div> Not Visited</div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-4 gap-3">
                  {activeQuestions.map((_, idx) => {
                    const s = status[idx];
                    let bg = "bg-zinc-800 border-zinc-700 text-zinc-400";
                    if (s === "answered") bg = "bg-green-500 border-green-400 text-white shadow-lg shadow-green-900/50";
                    if (s === "unanswered") bg = "bg-red-500 border-red-400 text-white";
                    if (s === "review") bg = "bg-orange-500 border-orange-400 text-white";
                    
                    const isCurrent = currentQIndex === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => jumpToQuestion(idx)}
                        className={`w-11 h-11 rounded-full border flex items-center justify-center font-bold text-sm transition-all ${bg} ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]' : ''}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-white/[0.04]">
                <button 
                  onClick={handleSubmitTest}
                  className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold tracking-wider hover:bg-green-500 transition-all shadow-lg shadow-green-900/50 text-sm"
                >
                  FINISH &amp; SUBMIT TEST
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. REAL RESULT & EVALUATION SCREEN (NOT SIMULATED) */}
      {/* ---------------------------------------------------- */}
      {mode === "result" && (
        <div className="flex-1 flex flex-col bg-[#050505]">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMode("config")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                title="Back to PYQ Config"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Test Evaluation &amp; Detailed Analysis</h1>
                <p className="text-xs text-zinc-400">Authentic Past Paper Evaluation Report</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartTest()}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold text-xs transition-colors flex items-center gap-2 border border-white/5"
              >
                <HugeiconsIcon icon={RefreshIcon} size={14} />
                <span>Re-take Test</span>
              </button>
              <button
                onClick={() => setMode("config")}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
              >
                Select Another Paper
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
            
            {/* Score Overview Banner */}
            <section className="bg-gradient-to-br from-[#0e1726] to-[#0a0a0a] border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 w-fit">
                  Live Test Score Card
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {results.score} <span className="text-xl text-zinc-400 font-normal">/ {results.maxScore} Marks</span>
                </h2>
                <p className="text-sm text-zinc-400">
                  Calculated using official NTA marking scheme (+4 Correct, -1 Incorrect).
                </p>
              </div>

              {/* Stat Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{results.accuracy}%</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Correct</div>
                  <div className="text-2xl font-bold text-green-400">{results.correctCount}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Incorrect</div>
                  <div className="text-2xl font-bold text-rose-400">{results.incorrectCount}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Unattempted</div>
                  <div className="text-2xl font-bold text-zinc-400">{results.unattemptedCount}</div>
                </div>
              </div>
            </section>

            {/* Detailed Question Review & Solutions */}
            <section className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Question &amp; Solution Review</h3>
                  <p className="text-xs text-zinc-400">Step-by-step derivations for all exam questions</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 p-1 rounded-xl">
                  {[
                    { id: "all", label: "All (" + results.totalQuestions + ")" },
                    { id: "correct", label: "Correct (" + results.correctCount + ")" },
                    { id: "incorrect", label: "Incorrect (" + results.incorrectCount + ")" },
                    { id: "unattempted", label: "Skipped (" + results.unattemptedCount + ")" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setResultFilter(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        resultFilter === tab.id ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Review Cards List */}
              <div className="flex flex-col gap-6">
                {reviewQuestions.map((q, idx) => {
                  const originalIndex = activeQuestions.findIndex(orig => orig.id === q.id);
                  const userAns = answers[originalIndex];
                  const isCorrect = userAns === q.correctOptionIndex;
                  const isUnattempted = userAns === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`bg-[#0a0a0a] border rounded-3xl p-6 md:p-8 flex flex-col gap-6 ${
                        isCorrect
                          ? "border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                          : isUnattempted
                          ? "border-white/10"
                          : "border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.05)]"
                      }`}
                    >
                      {/* Q Header */}
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                            Q{originalIndex + 1}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            {q.year} • {q.chapter}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          {isCorrect && (
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-1.5">
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                              <span>Correct (+4)</span>
                            </span>
                          )}
                          {!isCorrect && !isUnattempted && (
                            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1.5">
                              <HugeiconsIcon icon={Cancel01Icon} size={14} />
                              <span>Incorrect (-1)</span>
                            </span>
                          )}
                          {isUnattempted && (
                            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs font-bold flex items-center gap-1.5">
                              <HugeiconsIcon icon={HelpCircleIcon} size={14} />
                              <span>Unattempted (0)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="text-base text-zinc-100 leading-relaxed">
                        {q.question}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, optIdx) => {
                          const isUserChoice = userAns === optIdx;
                          const isRightAnswer = q.correctOptionIndex === optIdx;

                          let optionStyle = "bg-white/[0.02] border-white/5 text-zinc-400";
                          if (isRightAnswer) {
                            optionStyle = "bg-green-500/15 border-green-500/50 text-green-200 font-medium";
                          } else if (isUserChoice && !isRightAnswer) {
                            optionStyle = "bg-rose-500/15 border-rose-500/50 text-rose-200 font-medium";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${optionStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                                <span>{opt}</span>
                              </div>
                              {isRightAnswer && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/20 px-2 py-0.5 rounded">
                                  Correct Answer
                                </span>
                              )}
                              {isUserChoice && !isRightAnswer && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Step-by-Step Derivation Solution Box */}
                      <div className="bg-[#050505] border border-blue-500/20 rounded-2xl p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          <HugeiconsIcon icon={BookOpen01Icon} size={14} />
                          <span>Detailed Derivation &amp; Solution</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                          {q.explanation}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>

          </main>
        </div>
      )}

    </div>
  );
}
