"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JellyRadio from "@/components/JellyRadio";
import BellToggle from "@/components/BellToggle";
import SpotlightCard from "@/components/SpotlightCard";
import FolderFloat from "@/components/FolderFloat";
import PeekRating from "@/components/PeekRating";
import WarmTooltip from "@/components/WarmTooltip";
import SpringCheck from "@/components/SpringCheck";
import SwipeRow from "@/components/SwipeRow";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon,
  AnalyticsUpIcon,
  UserCircleIcon,
  PlayIcon,
  File02Icon,
  ArrowRight02Icon,
  Tick02Icon,
  Delete02Icon,
  FireIcon,
  Add01Icon,
  PencilEdit02Icon,
  AiSparklesIcon
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [track, setTrack] = useState<"JEE" | "NEET">("JEE");
  const [bellPressed, setBellPressed] = useState(false);

  // Subject priorities (customizable via PeekRating)
  const [priorities, setPriorities] = useState<Record<string, number>>({
    Physics: 4,
    Chemistry: 3,
    Mathematics: 5,
    Biology: 5
  });

  // Daily Tasks state with SpringCheck
  const [tasks, setTasks] = useState([
    { id: 1, text: "Solve 20 Electrostatics Numericals", completed: false },
    { id: 2, text: "Revise Organic Reaction Mechanisms", completed: true },
    { id: 3, text: "Attempt 1 Sectional Mock Test", completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  // RoughWork Notepad state
  const [roughText, setRoughText] = useState("Calculations & Key Formulas:\n- F = q(E + v x B)\n- ΔG = ΔH - TΔS");
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, title: "Optics sign conventions", time: "10:45 AM" },
    { id: 2, title: "Thermodynamics heat capacity notes", time: "Yesterday" }
  ]);

  // Simulated Payment Modal state
  const [checkoutBundle, setCheckoutBundle] = useState<any>(null);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");

  useEffect(() => {
    const selected = localStorage.getItem("selectedExam") as "JEE" | "NEET";
    if (selected === "JEE" || selected === "NEET") {
      setTrack(selected);
    }
  }, []);

  const navItems = [
    { value: "practice", label: "Practice", icon: <HugeiconsIcon icon={BookOpen01Icon} size={18} /> },
    { value: "tests", label: "Mock Tests", icon: <HugeiconsIcon icon={File02Icon} size={18} /> },
    { value: "analytics", label: "Analytics", icon: <HugeiconsIcon icon={AnalyticsUpIcon} size={18} /> },
    { value: "profile", label: "Profile", icon: <HugeiconsIcon icon={UserCircleIcon} size={18} /> }
  ];

  // Subject configurations
  const jeeSubjects = [
    {
      subject: "Physics",
      chapters: "30 Chapters",
      solved: "312 / 850",
      progress: 37,
      href: "/dashboard/pyqs/physics",
      color: "from-blue-600/20 to-blue-900/10",
      accent: "text-blue-400",
      border: "border-blue-500/20"
    },
    {
      subject: "Chemistry",
      chapters: "28 Chapters",
      solved: "420 / 800",
      progress: 52,
      href: "/dashboard/pyqs/chemistry",
      color: "from-rose-600/20 to-rose-900/10",
      accent: "text-rose-400",
      border: "border-rose-500/20"
    },
    {
      subject: "Mathematics",
      chapters: "32 Chapters",
      solved: "250 / 900",
      progress: 28,
      href: "/dashboard/pyqs/mathematics",
      color: "from-purple-600/20 to-purple-900/10",
      accent: "text-purple-400",
      border: "border-purple-500/20"
    }
  ];

  const neetSubjects = [
    {
      subject: "Physics",
      chapters: "28 Chapters",
      solved: "280 / 750",
      progress: 37,
      href: "/dashboard/pyqs/physics",
      color: "from-blue-600/20 to-blue-900/10",
      accent: "text-blue-400",
      border: "border-blue-500/20"
    },
    {
      subject: "Chemistry",
      chapters: "28 Chapters",
      solved: "390 / 800",
      progress: 49,
      href: "/dashboard/pyqs/chemistry",
      color: "from-rose-600/20 to-rose-900/10",
      accent: "text-rose-400",
      border: "border-rose-500/20"
    },
    {
      subject: "Biology",
      chapters: "38 Chapters",
      solved: "620 / 1100",
      progress: 56,
      href: "/dashboard/pyqs/biology",
      color: "from-emerald-600/20 to-emerald-900/10",
      accent: "text-emerald-400",
      border: "border-emerald-500/20"
    }
  ];

  const subjects = track === "NEET" ? neetSubjects : jeeSubjects;

  const mockTests = [
    { id: 1, title: `AITS - ${track} Full Syllabus Mock 1`, questions: "75 Questions", duration: "180 Mins", difficulty: "High Yield" },
    { id: 2, title: track === "NEET" ? "Genetics & Biotechnology Sectional" : "Mechanics & Electrodynamics Sectional", questions: "45 Questions", duration: "90 Mins", difficulty: "Moderate" },
    { id: 3, title: "High-Speed Accuracy Sprint Mock", questions: "30 Questions", duration: "45 Mins", difficulty: "Rank Booster" }
  ];

  // Flagship Paid Bundles featuring FolderFloat
  const paidBundles = [
    {
      id: "bundle-1",
      title: `${track} 2026 Rank Booster Vault`,
      desc: "Top 500 AIR curated problem bank with interactive step-by-step video solutions.",
      price: "₹2,499",
      materials: ["Mechanics Elite Bank.pdf", "Organic Mechanisms Map", "Toppers Formula Book", "PYQ 2015-2025 Solved"],
      folderColor: "#1e1b4b",
      frontColor: "#312e81"
    },
    {
      id: "bundle-2",
      title: "All India Test Series (AITS Pro)",
      desc: "25 Full length computer-based tests matching actual NTA simulation engine.",
      price: "₹1,999",
      materials: ["25 Full Mock Tests", "Predictive AIR Analytics", "Weak Topic Diagnostic", "OMR & Answer Keys"],
      folderColor: "#14532d",
      frontColor: "#166534"
    }
  ];

  const handleStartPayment = (bundle: any) => {
    setCheckoutBundle(bundle);
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState("success");
    }, 2000);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText("");
  };

  const handleSaveNote = () => {
    if (!roughText.trim()) return;
    const firstLine = roughText.trim().split("\n")[0].slice(0, 30);
    setSavedNotes(prev => [{ id: Date.now(), title: firstLine || "Quick Scratch Note", time: "Just now" }, ...prev]);
  };

  const handleDeleteNote = (id: number) => {
    setSavedNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">

      {/* Simulated Checkout Modal */}
      <AnimatePresence>
        {checkoutBundle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000 ${paymentState === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />

              {paymentState === "processing" ? (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">Simulating Secure Payment...</h3>
                  <p className="text-sm text-zinc-400">Locking in access to <strong className="text-white">{checkoutBundle.title}</strong>.</p>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <HugeiconsIcon icon={Tick02Icon} className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Access Granted!</h3>
                  <p className="text-sm text-zinc-400 mb-6">You have unlocked <strong className="text-white">{checkoutBundle.title}</strong>. Study materials and mock tests are now permanently accessible.</p>
                  <button
                    onClick={() => { setCheckoutBundle(null); setPaymentState("idle"); }}
                    className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    Start Studying
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Dashboard Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              ToSyn
            </h1>
            <button
              onClick={() => router.push("/select-exam")}
              className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-blue-500/20 hover:text-blue-400 border border-white/10 transition-colors"
              title="Click to switch between JEE and NEET"
            >
              {track} ⇄
            </button>
          </div>
          <div className="hidden lg:block">
            <JellyRadio items={navItems as any} defaultValue="practice" size="md" />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <HugeiconsIcon icon={FireIcon} size={16} />
            <span>14 Day Streak</span>
          </div>

          <BellToggle
            count={bellPressed ? 0 : 3}
            icon={undefined}
            label=""
            pressed={bellPressed}
            onChange={(pressed: boolean) => setBellPressed(pressed)}
          />

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
            <HugeiconsIcon icon={UserCircleIcon} size={18} className="text-zinc-300" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1550px] mx-auto p-6 md:p-10 flex flex-col gap-10">

        {/* Quick Insights Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Target Exam</span>
            <div className="text-2xl font-bold text-white">{track} 2026</div>
            <span className="text-xs text-blue-400 font-medium">142 Days Remaining</span>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Questions Solved</span>
            <div className="text-2xl font-bold text-white">982 <span className="text-sm font-normal text-zinc-500">/ 2,650</span></div>
            <span className="text-xs text-emerald-400 font-medium">+42 this week</span>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Overall Accuracy</span>
            <div className="text-2xl font-bold text-white">88.4%</div>
            <span className="text-xs text-zinc-400 font-medium">Based on 12 Mocks</span>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">National Percentile</span>
            <div className="text-2xl font-bold text-white">99.1%ile</div>
            <span className="text-xs text-purple-400 font-medium">Predicted AIR &lt; 850</span>
          </div>
        </section>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* Left Main Area: Subject Practice, Mock Tests & Bundles (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-10">

            {/* Subject Practice & Priority List */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Subject Mastery &amp; Priority</h2>
                  <p className="text-sm text-zinc-400">Set your revision priority and drill chapterwise questions for {track}.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {subjects.map(item => (
                  <SpotlightCard
                    key={item.subject}
                    className={`bg-gradient-to-br ${item.color} border border-white/[0.08] ${item.border} rounded-2xl p-6 flex flex-col gap-4 shadow-xl transition-all relative overflow-hidden`}
                    spotlightColor="rgba(255, 255, 255, 0.12)"
                  >
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-2xl font-bold text-white tracking-tight">{item.subject}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-zinc-300">
                        {item.chapters}
                      </span>
                    </div>

                    {/* Priority Selector using PeekRating */}
                    <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                        <span>Study Priority</span>
                        <span className="text-amber-400 font-bold">Level {priorities[item.subject] || 3}/5</span>
                      </div>
                      <div className="flex items-center justify-center py-1">
                        <PeekRating
                          count={5}
                          shape="bolt"
                          size={22}
                          defaultValue={priorities[item.subject] || 3}
                          activeColor="#f59e0b"
                          idleColor="#3f3f46"
                          labels={["Low Focus", "Moderate", "Standard", "High Priority", "Critical Exam Focus"]}
                          onChange={(val: number) => setPriorities(prev => ({ ...prev, [item.subject]: val }))}
                        />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5 mt-auto pt-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Solved: {item.solved}</span>
                        <span className="font-semibold text-zinc-200">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    <a
                      href={item.href}
                      className="mt-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white text-zinc-300 hover:text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                      Practice Questions
                      <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                    </a>
                  </SpotlightCard>
                ))}
              </div>
            </section>

            {/* Mock Tests Section (Linked to Stepper) */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Interactive Mock Tests</h2>
                  <p className="text-sm text-zinc-400">Real NTA exam simulation with live Stepper progression.</p>
                </div>
                <button
                  onClick={() => router.push("/dashboard/mock-test")}
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {mockTests.map(test => (
                  <div
                    key={test.id}
                    onClick={() => router.push("/dashboard/mock-test")}
                    className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 hover:border-blue-500/30 transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-black/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {test.difficulty}
                        </span>
                        <span className="text-xs text-zinc-500">{test.duration}</span>
                      </div>
                      <h3 className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors mb-1">
                        {test.title}
                      </h3>
                      <p className="text-xs text-zinc-500">{test.questions} • Instant Grading</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white">
                      <span>Start Test</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <HugeiconsIcon icon={PlayIcon} size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Flagship Crash Courses with FolderFloat */}
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-1">High-Yield Course Bundles</h2>
                <p className="text-sm text-zinc-400">Hover or click each folder to reveal problem sets, formula mindmaps, and mock papers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paidBundles.map(bundle => (
                  <div
                    key={bundle.id}
                    className="bg-[#0a0a0a] border border-white/[0.07] rounded-3xl p-7 flex flex-col relative group hover:border-white/20 transition-all shadow-2xl"
                  >
                    {/* FolderFloat Container without overflow clipping */}
                    <div className="w-full h-56 mb-4 rounded-2xl bg-[#050505] border border-white/[0.04] flex items-end pb-4 justify-center relative shadow-inner overflow-visible">
                      <div className="scale-[0.85] origin-bottom relative z-10">
                        <FolderFloat
                          label="Hover to reveal files"
                          items={bundle.materials}
                          folderColor={bundle.folderColor}
                          frontColor={bundle.frontColor}
                          onSelect={() => {}}
                          onOpenChange={() => {}}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 z-10 flex-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">{bundle.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{bundle.desc}</p>
                    </div>

                    <div className="z-10 mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">Price</span>
                        <span className="text-2xl font-black text-white">{bundle.price}</span>
                      </div>
                      <button
                        onClick={() => handleStartPayment(bundle)}
                        className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar: Daily Revision Checklist & RoughWork Notepad (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-8">

            {/* Daily Checklist using SpringCheck */}
            <section className="bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-6 shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Daily Revision Tasks</h3>
                  <p className="text-xs text-zinc-400">Keep daily momentum with spring-checked revision goals.</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {tasks.filter(t => t.completed).length} / {tasks.length} Done
                </span>
              </div>

              {/* Checklist items with SpringCheck */}
              <div className="flex flex-col gap-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-colors flex items-center"
                  >
                    <SpringCheck
                      label={task.text}
                      checked={task.completed}
                      onChange={(checked: boolean) => {
                        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: checked } : t));
                      }}
                      boxSize={22}
                      fontSize={14}
                      color="#ffffff"
                      fillColor="#3b82f6"
                      checkColor="#ffffff"
                    />
                  </div>
                ))}
              </div>

              {/* Add Task input */}
              <form onSubmit={handleAddTask} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add target revision task..."
                  value={newTaskText}
                  onChange={e => setNewTaskText(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center"
                  title="Add Task"
                >
                  <HugeiconsIcon icon={Add01Icon} size={16} />
                </button>
              </form>
            </section>

            {/* RoughWork Notepad Panel */}
            <section className="bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-6 shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">RoughWork</h3>
                    <p className="text-xs text-zinc-500">Fast scratchpad for calculations &amp; formulas</p>
                  </div>
                </div>

                {/* Toolbar buttons with WarmTooltip */}
                <div className="flex items-center gap-1.5">
                  <WarmTooltip content="Insert Physics formula" side="top">
                    <button
                      type="button"
                      onClick={() => setRoughText(prev => prev + "\nE = mc² | v = u + at")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-xs font-bold"
                    >
                      PHY
                    </button>
                  </WarmTooltip>

                  <WarmTooltip content="Insert Chemistry formula" side="top">
                    <button
                      type="button"
                      onClick={() => setRoughText(prev => prev + "\npH = -log[H+] | PV = nRT")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-xs font-bold"
                    >
                      CHM
                    </button>
                  </WarmTooltip>

                  <WarmTooltip content="Clear scratchpad" side="top">
                    <button
                      type="button"
                      onClick={() => setRoughText("")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={15} />
                    </button>
                  </WarmTooltip>

                  <WarmTooltip content="Save to quick notes" side="top">
                    <button
                      type="button"
                      onClick={handleSaveNote}
                      className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <HugeiconsIcon icon={Tick02Icon} size={15} />
                    </button>
                  </WarmTooltip>
                </div>
              </div>

              {/* Active Scratchpad */}
              <textarea
                value={roughText}
                onChange={e => setRoughText(e.target.value)}
                placeholder="Type temporary working, derivation steps, or key values..."
                rows={5}
                className="w-full bg-[#050505] border border-white/5 rounded-2xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/20 resize-none leading-relaxed shadow-inner"
              />

              {/* Saved Notes with SwipeRow */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Saved Scratch Notes (Swipe to delete)
                </span>

                {savedNotes.length === 0 ? (
                  <p className="text-xs text-zinc-600 italic py-2">No saved scratch notes yet. Click the check icon above to save your scratchpad.</p>
                ) : (
                  savedNotes.map(note => (
                    <SwipeRow
                      key={note.id}
                      height={48}
                      radius={12}
                      rowColor="#111113"
                      actionColor="#ef4444"
                      actions={[{ id: "delete", label: "Delete" }]}
                      onAction={() => handleDeleteNote(note.id)}
                    >
                      <div className="px-4 w-full flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-200 truncate max-w-[200px]">{note.title}</span>
                        <span className="text-[10px] text-zinc-500 shrink-0">{note.time}</span>
                      </div>
                    </SwipeRow>
                  ))
                )}
              </div>
            </section>

          </div>

        </div>

      </main>
    </div>
  );
}
