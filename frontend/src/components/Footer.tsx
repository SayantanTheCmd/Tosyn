"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  HelpCircleIcon,
  GlobalIcon,
  BookOpen01Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.06] pt-12 pb-8 px-6 md:px-12 mt-16 text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <h3 className="text-xl font-black tracking-tight text-white">
              RankTorque <span className="text-xs font-semibold text-blue-400">Pvt. Ltd.</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              RankTorque Technologies Pvt. Ltd. is India&apos;s premier focused exam preparation command center for JEE &amp; NEET aspirants.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NTA Exam Engine Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard Overview
                </Link>
              </li>
              <li>
                <Link href="/dashboard/pyqs" className="hover:text-white transition-colors">
                  10-Year Chapterwise PYQs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/mock-test" className="hover:text-white transition-colors">
                  Chapter &amp; Full Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/select-exam" className="hover:text-white transition-colors">
                  Choose Path (JEE / NEET)
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">About &amp; Support</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HugeiconsIcon icon={BookOpen01Icon} size={14} />
                  <span>About Us &amp; Creators</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HugeiconsIcon icon={HelpCircleIcon} size={14} />
                  <span>Support &amp; Contact</span>
                </Link>
              </li>
              <li>
                <a href="mailto:support@ranktorque.com" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400">
                  <HugeiconsIcon icon={Mail01Icon} size={14} />
                  <span>support@ranktorque.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Creators & Legal Notice */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Creators &amp; Leadership</h4>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
              <p><strong className="text-white">Sayantan</strong> — Founder &amp; Lead Architect</p>
              <p><strong className="text-white">Tosin M</strong> — Co-Creator &amp; Strategic Director</p>
            </div>
            <div className="mt-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-500 leading-relaxed">
              Official exam syllabus aligned with NTA guidelines for JEE Mains, JEE Advanced &amp; NEET UG.
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 RankTorque Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Help Center</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
