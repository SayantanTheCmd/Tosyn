"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/Stepper";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Tick02Icon } from "@hugeicons/core-free-icons";

export default function MockTestPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

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

  const handleSelect = (qId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
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
    <main className="min-h-screen bg-[#050505] text-white flex flex-col p-8 font-sans">
      <button 
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit mb-12"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
        Back to Dashboard
      </button>

      <div className="max-w-4xl w-full mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">AITS - Full Syllabus Mock 1</h1>
          <p className="text-zinc-500">Physics Section • 3 Questions</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/50">
          <Stepper
            initialStep={1}
            onFinalStepCompleted={() => setCompleted(true)}
            backButtonText="Previous Question"
            nextButtonText="Next Question"
            stepCircleContainerClassName="mb-12"
          >
            {questions.map((q, i) => (
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
    </main>
  );
}
