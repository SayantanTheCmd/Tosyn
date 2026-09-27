"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JellyRadio from "@/components/JellyRadio";
import BellToggle from "@/components/BellToggle";
import SpotlightCard from "@/components/SpotlightCard";
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
  AiSparklesIcon,
  ShieldKeyIcon,
  Mail01Icon,
  SmartPhone01Icon
} from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  const router = useRouter();
  const [track, setTrack] = useState<"JEE" | "NEET">("JEE");
  const [activeTab, setActiveTab] = useState("practice");
  const [bellPressed, setBellPressed] = useState(false);
  const [userName, setUserName] = useState("Sayantan");
  const [greeting, setGreeting] = useState("Welcome back");

  // User Profile Form State
  const [profileName, setProfileName] = useState("Sayantan");
  const [profileEmail, setProfileEmail] = useState("sayantan@ranktorque.in");
  const [profilePhone, setProfilePhone] = useState("9876543210");
  const [profileExam, setProfileExam] = useState<"JEE" | "NEET">("JEE");
  const [profileYear, setProfileYear] = useState("2026");
  const [profilePassword, setProfilePassword] = useState("••••••••");
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

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
  const [roughText, setRoughText] = useState("Calculations & Key Formulas:\n- F = q(E + v x B)\n- ΔG = ΔH - TΔS\n- ∫ (sin x / (sin x + cos x)) dx = π/4");
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, title: "Optics sign conventions & lens formula", time: "10:45 AM" },
    { id: 2, title: "Thermodynamics heat capacity notes", time: "Yesterday" }
  ]);

  useEffect(() => {
    const selected = localStorage.getItem("selectedExam") as "JEE" | "NEET";
    if (selected === "JEE" || selected === "NEET") {
      setTrack(selected);
      setProfileExam(selected);
    }
    const storedName = localStorage.getItem("user_name");
    if (storedName) {
      setUserName(storedName);
      setProfileName(storedName);
    }
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) setProfileEmail(storedEmail);

    const storedPhone = localStorage.getItem("user_phone");
    if (storedPhone) setProfilePhone(storedPhone);

    const storedYear = localStorage.getItem("user_target_year");
    if (storedYear) setProfileYear(storedYear);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const navItems = [
    { value: "practice", label: "Practice", icon: <HugeiconsIcon icon={BookOpen01Icon} size={18} /> },
    { value: "tests", label: "Mock Tests", icon: <HugeiconsIcon icon={File02Icon} size={18} /> },
    { value: "roughwork", label: "RoughWork", icon: <HugeiconsIcon icon={PencilEdit02Icon} size={18} /> },
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

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText("");
  };

  const handleSaveNote = () => {
    if (!roughText.trim()) return;
    const firstLine = roughText.trim().split("\n")[0].slice(0, 35);
    setSavedNotes(prev => [{ id: Date.now(), title: firstLine || "Quick Scratch Note", time: "Just now" }, ...prev]);
  };

  const handleDeleteNote = (id: number) => {
    setSavedNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user_name", profileName);
    localStorage.setItem("user_email", profileEmail);
    localStorage.setItem("user_phone", profilePhone);
    localStorage.setItem("selectedExam", profileExam);
    localStorage.setItem("user_target_year", profileYear);
    localStorage.setItem("user_password", profilePassword);
    
    setUserName(profileName);
    setTrack(profileExam);
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">

      {/* Modern Dashboard Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              RankTorque
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
            <JellyRadio
              items={navItems as any}
              defaultValue="practice"
              size="md"
              onChange={(val: string) => setActiveTab(val)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => router.push("/about")}
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            About &amp; Contact
          </button>

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

          <div 
            onClick={() => setActiveTab("profile")}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 flex items-center justify-center cursor-pointer hover:border-white/40 transition-colors text-white font-bold text-sm shadow-md"
            title="User Account Profile"
          >
            {userName[0]}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1550px] mx-auto p-6 md:p-10 flex flex-col gap-10">

        {/* Personalized Welcome Banner */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-white">{userName}</span> 👋
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Ready to conquer <strong className="text-white">{track} 2026</strong>? Focus on high-priority topics and daily consistency.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/mock-test")}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-lg flex items-center gap-2"
            >
              <HugeiconsIcon icon={PlayIcon} size={14} />
              <span>Launch Mock Test</span>
            </button>
          </div>
        </section>

        {/* Dedicated Tab Views */}
        {activeTab === "profile" ? (
          /* Full-Fledged User Account Profile View */
          <section className="bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-8 shadow-2xl flex flex-col gap-8 max-w-5xl mx-auto w-full">
            
            {/* Account Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/[0.06] pb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/20">
                  {profileName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{profileName}</h2>
                  <p className="text-sm text-zinc-400">{profileEmail} • Target {profileExam} {profileYear}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
                {profileExam} Aspirant Account
              </span>
            </div>

            {profileSavedMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={Tick02Icon} size={18} />
                <span>Account Profile changes saved successfully!</span>
              </div>
            )}

            {/* Profile Edit Form */}
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 text-sm font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Target Exam Track</label>
                  <select
                    value={profileExam}
                    onChange={e => setProfileExam(e.target.value as "JEE" | "NEET")}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="JEE">JEE (PCM - Engineering)</option>
                    <option value="NEET">NEET (PCB - Medical)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Target Exam Year</label>
                  <select
                    value={profileYear}
                    onChange={e => setProfileYear(e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Account Password</label>
                  <input
                    type="password"
                    value={profilePassword}
                    onChange={e => setProfilePassword(e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="px-5 py-3 rounded-2xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-semibold text-xs border border-rose-500/20 transition-colors"
                >
                  Sign Out of Account
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-600/30"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

          </section>
        ) : activeTab === "roughwork" ? (
          /* Full Page RoughWork Tab View */
          <section className="bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-8 shadow-2xl flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-lg">
                  <HugeiconsIcon icon={PencilEdit02Icon} size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">RoughWork Notepad Studio</h2>
                  <p className="text-sm text-zinc-400">Full workspace for rough calculations, formula derivations, and persistent scratch notes.</p>
                </div>
              </div>

              {/* Toolbar controls with WarmTooltip */}
              <div className="flex items-center gap-2">
                <WarmTooltip content="Insert Physics formulas" side="top">
                  <button
                    type="button"
                    onClick={() => setRoughText(prev => prev + "\n[PHY] F = q(E + v x B) | λ = h/p | E = mc²")}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-xs font-bold border border-white/5"
                  >
                    + Physics Formulas
                  </button>
                </WarmTooltip>

                <WarmTooltip content="Insert Chemistry formulas" side="top">
                  <button
                    type="button"
                    onClick={() => setRoughText(prev => prev + "\n[CHM] ΔG° = -nFE° | pH = pKa + log([A-]/[HA])")}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-xs font-bold border border-white/5"
                  >
                    + Chemistry Formulas
                  </button>
                </WarmTooltip>

                <WarmTooltip content="Clear active scratchpad" side="top">
                  <button
                    type="button"
                    onClick={() => setRoughText("")}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors border border-white/5"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={18} />
                  </button>
                </WarmTooltip>

                <WarmTooltip content="Save current scratchpad to list" side="top">
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <HugeiconsIcon icon={Tick02Icon} size={16} />
                    <span>Save Scratch Note</span>
                  </button>
                </WarmTooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Main Large Textarea */}
              <div className="xl:col-span-8 flex flex-col gap-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Scratch Canvas</span>
                <textarea
                  value={roughText}
                  onChange={e => setRoughText(e.target.value)}
                  placeholder="Type temporary calculations, formula working, reaction pathways..."
                  rows={16}
                  className="w-full bg-[#050505] border border-white/5 rounded-2xl p-6 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Saved Notes List with SwipeRow */}
              <div className="xl:col-span-4 flex flex-col gap-4 bg-[#050505] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Saved Notes ({savedNotes.length})</span>
                  <span className="text-[10px] text-zinc-500">Swipe row left to delete</span>
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[380px] pr-1">
                  {savedNotes.length === 0 ? (
                    <p className="text-xs text-zinc-600 italic py-4 text-center">No saved scratch notes. Click &quot;Save Scratch Note&quot; above to save notes here.</p>
                  ) : (
                    savedNotes.map(note => (
                      <SwipeRow
                        key={note.id}
                        height={52}
                        radius={14}
                        rowColor="#111114"
                        actionColor="#ef4444"
                        actions={[{ id: "delete", label: "Delete" }]}
                        onAction={() => handleDeleteNote(note.id)}
                      >
                        <div className="px-4 w-full flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-200 truncate max-w-[220px]">{note.title}</span>
                          <span className="text-[10px] text-zinc-500 shrink-0">{note.time}</span>
                        </div>
                      </SwipeRow>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Standard Practice & Dashboard Overview View */
          <>
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

              {/* Left Main Area: Subject Practice & Mock Tests (8 cols) */}
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

                {/* Mock Tests Section */}
                <section className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Interactive Mock Tests</h2>
                      <p className="text-sm text-zinc-400">Real NTA exam simulation with live Stepper progression and instant grading.</p>
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

              </div>

              {/* Right Sidebar: Daily Revision Checklist & RoughWork Mini Panel (4 cols) */}
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

                {/* RoughWork Notepad Mini Panel */}
                <section className="bg-[#0a0a0a] border border-white/[0.06] rounded-3xl p-6 shadow-xl flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                        <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">RoughWork</h3>
                        <p className="text-xs text-zinc-500">Scratchpad &amp; saved notes</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("roughwork")}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Expand Studio &rarr;
                    </button>
                  </div>

                  {/* Active Scratchpad */}
                  <textarea
                    value={roughText}
                    onChange={e => setRoughText(e.target.value)}
                    placeholder="Type temporary working, derivation steps..."
                    rows={4}
                    className="w-full bg-[#050505] border border-white/5 rounded-2xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/20 resize-none leading-relaxed shadow-inner"
                  />

                  {/* Saved Notes with SwipeRow */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Saved Notes (Swipe to delete)
                    </span>

                    {savedNotes.length === 0 ? (
                      <p className="text-xs text-zinc-600 italic py-2">No saved scratch notes.</p>
                    ) : (
                      savedNotes.slice(0, 2).map(note => (
                        <SwipeRow
                          key={note.id}
                          height={46}
                          radius={12}
                          rowColor="#111113"
                          actionColor="#ef4444"
                          actions={[{ id: "delete", label: "Delete" }]}
                          onAction={() => handleDeleteNote(note.id)}
                        >
                          <div className="px-4 w-full flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-200 truncate max-w-[180px]">{note.title}</span>
                            <span className="text-[10px] text-zinc-500 shrink-0">{note.time}</span>
                          </div>
                        </SwipeRow>
                      ))
                    )}
                  </div>
                </section>

              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}
