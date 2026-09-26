"use client";

import { useState } from "react";
import JellyRadio from "@/components/JellyRadio";
import BellToggle from "@/components/BellToggle";
import SlideCommit from "@/components/SlideCommit";
import FolderFloat from "@/components/FolderFloat";
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen01Icon, AnalyticsUpIcon, UserCircleIcon, PlayIcon, File02Icon, ArrowRight02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [checkoutCourse, setCheckoutCourse] = useState<any>(null);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");

  const navItems = [
    { value: "courses", label: "Courses", icon: <HugeiconsIcon icon={BookOpen01Icon} size={18} /> },
    { value: "tests", label: "Mock Tests", icon: <HugeiconsIcon icon={File02Icon} size={18} /> },
    { value: "analytics", label: "Analytics", icon: <HugeiconsIcon icon={AnalyticsUpIcon} size={18} /> },
    { value: "profile", label: "Profile", icon: <HugeiconsIcon icon={UserCircleIcon} size={18} /> },
  ];

  const courses = [
    { id: 1, title: "JEE Advanced 2026 Batch", desc: "Target top 500 AIR with elite mentorship.", price: "₹4,999", color: "blue", materials: ["Advanced Mechanics.pdf", "Optics Problem Set", "Mock Test UI Sandbox"] },
    { id: 2, title: "NEET Dropper Pro", desc: "Complete Biology & Chemistry overhaul.", price: "₹3,499", color: "green", materials: ["Botany Deep Dive", "Zoology Diagrams.pdf", "Organic Chemistry Maps"] },
    { id: 3, title: "Class 11 Foundation", desc: "Build unshakeable basics for 2027.", price: "₹2,999", color: "purple", materials: ["Kinematics Basics", "Mole Concept", "Algebra Foundations"] },
  ];

  const tests = [
    { id: 1, title: "AITS - Full Syllabus Mock 1", type: "JEE Mains" },
    { id: 2, title: "Botany + Zoology Half Syllabus", type: "NEET" },
    { id: 3, title: "Mechanics Chapter Test", type: "Topic Wise" },
  ];

  const getColorClass = (color: string) => {
    const map: any = {
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      green: "bg-green-500/20 text-green-400 border-green-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return map[color] || map.blue;
  };

  const handlePayment = async (course: any) => {
    return new Promise<void>((resolve) => {
      setCheckoutCourse(course);
      setPaymentState("processing");
      setTimeout(() => {
        setPaymentState("success");
        resolve();
      }, 2500);
    });
  };

  const closePayment = () => {
    if (paymentState === "success") {
      setCheckoutCourse(null);
      setPaymentState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Payment Overlay Modal */}
      <AnimatePresence>
        {checkoutCourse && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-sm bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000 ${paymentState === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
              
              {paymentState === "processing" ? (
                <>
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
                  <p className="text-sm text-zinc-400">Securely connecting to payment gateway.</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <HugeiconsIcon icon={Tick02Icon} className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-sm text-zinc-400 mb-6">You are now enrolled in <strong className="text-white">{checkoutCourse.title}</strong>. Receipt sent to email.</p>
                  <button onClick={closePayment} className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
                    Start Learning
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            ToSyn
          </h1>
          <JellyRadio items={navItems as any} defaultValue="courses" size="md" />
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Support</button>
          <BellToggle count={3} icon={undefined} label="" pressed={false} onChange={() => {}} />
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center">
            <HugeiconsIcon icon={UserCircleIcon} size={20} className="text-zinc-300" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-8 md:p-12 flex flex-col gap-16">
        
        {/* Free Resources Section */}
        <section className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Free Practice Tests</h2>
              <p className="text-sm text-zinc-400">Benchmark your preparation against top candidates.</p>
            </div>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">View all tests &rarr;</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tests.map(test => (
              <div key={test.id} className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 hover:bg-[#111] transition-all cursor-pointer group flex items-center justify-between shadow-lg shadow-black/50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">{test.type}</span>
                  <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors">{test.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <HugeiconsIcon icon={PlayIcon} size={18} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Complete PYQs Section */}
        <section className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Complete PYQs (Target 2026)</h2>
              <p className="text-sm text-zinc-400">Class 12 Previous Year Questions for Physics, Chemistry, and Mathematics.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { subject: "Physics", href: "/dashboard/pyqs/physics", color: "from-blue-600/20 to-blue-900/10", border: "hover:border-blue-500/50" },
              { subject: "Chemistry", href: "/dashboard/pyqs/chemistry", color: "from-rose-600/20 to-rose-900/10", border: "hover:border-rose-500/50" },
              { subject: "Mathematics", href: "/dashboard/pyqs/mathematics", color: "from-purple-600/20 to-purple-900/10", border: "hover:border-purple-500/50" }
            ].map(item => (
              <a href={item.href} key={item.subject} className={`bg-gradient-to-br ${item.color} border border-white/[0.06] ${item.border} rounded-2xl p-6 transition-all cursor-pointer group flex flex-col gap-4 relative overflow-hidden shadow-lg shadow-black/50`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-white/10 transition-colors" />
                <div className="flex items-center justify-between z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight">{item.subject}</h3>
                  <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md">
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="text-white" />
                  </div>
                </div>
                <div className="z-10">
                  <p className="text-sm text-zinc-300 font-medium mb-1">Class 12 • Past 10 Years</p>
                  <p className="text-xs text-zinc-400">Fully solved, actual NTA interface.</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Premium Courses Catalog */}
        <section className="flex flex-col gap-8 pb-20">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Elite Flagship Courses</h2>
              <p className="text-zinc-400">Everything you need to crack the exam, packed into interactive modules.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-[#0a0a0a] border border-white/[0.06] rounded-[32px] p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/50">
                <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20 ${getColorClass(course.color).split(' ')[0]}`} />
                
                {/* Embedded FolderFloat Animation */}
                <div className="w-full h-48 mb-8 rounded-2xl bg-[#050505] border border-white/[0.04] flex items-center justify-center overflow-hidden relative shadow-inner">
                  <div className="scale-[0.85] origin-center">
                    <FolderFloat 
                      label="Hover to reveal contents" 
                      items={course.materials} 
                      folderColor="#111" 
                      frontColor="#1a1a1a"
                      onSelect={() => {}}
                      onOpenChange={() => {}}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 z-10 flex-1">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getColorClass(course.color)} shadow-inner`}>
                      <HugeiconsIcon icon={BookOpen01Icon} size={28} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tight text-white mb-2">{course.title}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">{course.desc}</p>
                  </div>
                </div>
                
                <div className="z-10 mt-auto pt-6 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Total Price</span>
                    <span className="text-2xl font-black text-white">{course.price}</span>
                  </div>
                  <SlideCommit 
                    label="Slide to Pay" 
                    doneLabel="Verified"
                    width={"100%" as any} 
                    height={56}
                    radius={20 as any}
                    onConfirm={() => handlePayment(course)} 
                    successColor="#22c55e"
                    handleColor="#ffffff"
                    trackColor="#1a1a1a"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}
