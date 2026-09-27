"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/Stepper";
import SpotlightCard from "@/components/SpotlightCard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Tick02Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  BookOpen01Icon,
  RefreshIcon,
  FilterIcon,
  Time01Icon,
  PencilEdit02Icon,
  Delete02Icon
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { CHAPTER_MOCK_TESTS, ChapterMockTest, MockQuestion } from "@/data/mockTestData";

export default function MockTestPage() {
  const router = useRouter();

  // Mode: "selector" | "runner" | "result"
  const [mode, setMode] = useState<"selector" | "runner" | "result">("selector");

  // Filters
  const [selectedClass, setSelectedClass] = useState<"11" | "12" | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<"physics" | "chemistry" | "mathematics" | "biology" | "all">("all");

  // Active Selected Test
  const [activeTest, setActiveTest] = useState<ChapterMockTest>(CHAPTER_MOCK_TESTS[0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showRoughDrawer, setShowRoughDrawer] = useState(false);
  const [roughText, setRoughText] = useState("Chapter Test Rough Notebook:\n");

  // Filtered Tests
  const filteredTests = CHAPTER_MOCK_TESTS.filter(test => {
    const matchClass = selectedClass === "all" || test.classLevel === selectedClass;
    const matchSub = selectedSubject === "all" || test.subject === selectedSubject;
    return matchClass && matchSub;
  });

  const handleStartTest = (test: ChapterMockTest) => {
    setActiveTest(test);
    setAnswers({});
    setCompleted(false);
    setMode("runner");
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinalSubmit = () => {
    setCompleted(true);
    setMode("result");
  };

  // Score Calculation
  const calculateResult = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    activeTest.questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) {
        unattempted++;
      } else if (userAns === q.correctOptionIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const total = activeTest.questions.length;
    const attempted = correct + incorrect;
    const score = (correct * 4) - (incorrect * 1);
    const maxScore = total * 4;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return { total, attempted, correct, incorrect, unattempted, score, maxScore, accuracy };
  };

  const results = calculateResult();

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative">
      
      {/* ---------------------------------------------------- */}
      {/* 1. MOCK TEST SELECTOR VIEW */}
      {/* ---------------------------------------------------- */}
      {mode === "selector" && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                title="Back to Dashboard"
              >
                <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                  <span>Chapterwise Mock Test Center</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider">
                    Class 11 &amp; 12 Focused
                  </span>
                </h1>
                <p className="text-xs text-zinc-400">20+ Authentic Chapterwise Tests with Real Scoring &amp; Derivation Solutions</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
            >
              Dashboard
            </button>
          </header>

          <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
            
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl">
              {/* Class Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Class Filter:</span>
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                  {[
                    { id: "all", label: "All Classes" },
                    { id: "11", label: "Class 11" },
                    { id: "12", label: "Class 12" }
                  ].map(cls => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => setSelectedClass(cls.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedClass === cls.id ? "bg-blue-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {cls.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject:</span>
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto">
                  {[
                    { id: "all", label: "All Subjects" },
                    { id: "physics", label: "Physics" },
                    { id: "chemistry", label: "Chemistry" },
                    { id: "mathematics", label: "Math" },
                    { id: "biology", label: "Biology" }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubject(sub.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedSubject === sub.id ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Tests Grid (20+ Tests) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map(test => (
                <SpotlightCard
                  key={test.id}
                  className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-5 hover:border-blue-500/40 transition-all cursor-pointer group"
                  onClick={() => handleStartTest(test)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        test.classLevel === "11"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>
                        Class {test.classLevel}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {test.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {test.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                      <span>{test.questionsCount} Qs (+4, -1)</span>
                      <span>•</span>
                      <span>{test.durationMinutes} Mins</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartTest(test);
                    }}
                    className="w-full py-3 rounded-2xl bg-white/5 group-hover:bg-blue-600 text-zinc-200 group-hover:text-white text-xs font-bold transition-all border border-white/5 flex items-center justify-center gap-2 shadow-md"
                  >
                    <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                    <span>Start Chapter Mock Test</span>
                  </button>
                </SpotlightCard>
              ))}
            </div>

          </main>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. INTERACTIVE TEST RUNNER VIEW */}
      {/* ---------------------------------------------------- */}
      {mode === "runner" && (
        <div className="flex-1 flex flex-col p-6 md:p-8">
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
                  <h3 className="text-xl font-bold text-white mb-2">Quit Chapter Mock Test?</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Are you sure you want to quit? Your current test progress will be lost.
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
                        setMode("selector");
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/30"
                    >
                      Quit to Selection
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
                        <p className="text-[11px] text-zinc-500">Scratchpad for longer question calculations</p>
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

          <div className="flex items-center justify-between mb-8 max-w-4xl w-full mx-auto">
            <button 
              onClick={() => setShowQuitModal(true)}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
              </div>
              <span className="text-sm font-medium">Back to Chapter Selection</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRoughDrawer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors text-xs font-bold shadow-md"
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
              <span>Rough Notebook</span>
            </button>
          </div>

          {/* Main Container: Centered Test Stepper */}
          <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold uppercase">
                  Class {activeTest.classLevel} • {activeTest.chapter}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">{activeTest.title}</h1>
              <p className="text-zinc-500 text-sm">{activeTest.questionsCount} Questions • {activeTest.durationMinutes} Minutes</p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-black/50">
              <Stepper
                initialStep={1}
                onFinalStepCompleted={handleFinalSubmit}
                backButtonText="Previous Question"
                nextButtonText="Next Question"
                stepCircleContainerClassName="mb-10"
              >
                {activeTest.questions.map((q, idx) => (
                  <Step key={q.id}>
                    <div className="flex flex-col min-h-[300px]">
                      <h2 className="text-2xl font-semibold mb-8 text-white leading-relaxed">
                        <span className="text-blue-500 mr-3">Q{idx + 1}.</span> 
                        {q.question}
                      </h2>
                      
                      <div className="flex flex-col gap-4 flex-1">
                        {q.options.map((opt, j) => {
                          const isSelected = answers[q.id] === j;
                          return (
                            <button
                              key={j}
                              onClick={() => handleSelectOption(q.id, j)}
                              className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all text-left ${
                                isSelected 
                                  ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                                  isSelected ? "border-blue-400 text-blue-400 bg-blue-500/20" : "border-zinc-600 text-zinc-500"
                                }`}>
                                  {String.fromCharCode(65 + j)}
                                </div>
                                <span className={`text-base ${isSelected ? "text-blue-400 font-medium" : "text-zinc-300"}`}>
                                  {opt}
                                </span>
                              </div>
                              
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected ? "border-blue-500 bg-blue-500" : "border-zinc-700"
                              }`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. REAL RESULT & SOLUTION REVIEW VIEW */}
      {/* ---------------------------------------------------- */}
      {mode === "result" && (
        <div className="flex-1 flex flex-col bg-[#050505]">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMode("selector")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                title="Back to Selection"
              >
                <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">{activeTest.title} - Score Evaluation</h1>
                <p className="text-xs text-zinc-400">Class {activeTest.classLevel} Chapter Mock Results</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartTest(activeTest)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold text-xs transition-colors flex items-center gap-2 border border-white/5"
              >
                <HugeiconsIcon icon={RefreshIcon} size={14} />
                <span>Re-take Chapter Test</span>
              </button>
              <button
                onClick={() => setMode("selector")}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
              >
                Select Another Chapter Test
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">
            
            {/* Banner */}
            <section className="bg-gradient-to-br from-[#0e1726] to-[#0a0a0a] border border-blue-500/20 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 w-fit">
                  Live Test Score Card
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {results.score} <span className="text-xl text-zinc-400 font-normal">/ {results.maxScore} Marks</span>
                </h2>
                <p className="text-sm text-zinc-400">
                  Evaluated using standard NTA marking scheme (+4 Correct, -1 Incorrect).
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{results.accuracy}%</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Correct</div>
                  <div className="text-2xl font-bold text-green-400">{results.correct}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Incorrect</div>
                  <div className="text-2xl font-bold text-rose-400">{results.incorrect}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Skipped</div>
                  <div className="text-2xl font-bold text-zinc-400">{results.unattempted}</div>
                </div>
              </div>
            </section>

            {/* Questions Review */}
            <section className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Step-by-Step Derivation Solutions</h3>

              <div className="flex flex-col gap-6">
                {activeTest.questions.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correctOptionIndex;
                  const isUnattempted = userAns === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`bg-[#0a0a0a] border rounded-3xl p-6 md:p-8 flex flex-col gap-6 ${
                        isCorrect
                          ? "border-green-500/30"
                          : isUnattempted
                          ? "border-white/10"
                          : "border-rose-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                        <span className="font-bold text-sm text-white">Question {idx + 1}</span>
                        {isCorrect && (
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                            Correct (+4)
                          </span>
                        )}
                        {!isCorrect && !isUnattempted && (
                          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold">
                            Incorrect (-1)
                          </span>
                        )}
                        {isUnattempted && (
                          <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs font-bold">
                            Unattempted (0)
                          </span>
                        )}
                      </div>

                      <div className="text-base text-zinc-100 leading-relaxed">
                        {q.question}
                      </div>

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

                      <div className="bg-[#050505] border border-blue-500/20 rounded-2xl p-5 flex flex-col gap-2">
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Solution Derivation</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-mono">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </main>
        </div>
      )}

    </main>
  );
}
