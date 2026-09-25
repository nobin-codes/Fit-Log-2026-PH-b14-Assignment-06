"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const workoutActive = pathname === "/";
  const myPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-[#242824] bg-[#0b0d0c]">
      <div className="container-fitlog relative grid h-[70px] grid-cols-[auto_1fr_auto] items-center gap-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-0">

        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />

            <span className="text-[21px] font-extrabold tracking-[-0.04em] text-white">
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
              workoutActive
                ? "bg-[#1A2312] !text-[#C2F800]"
                : "!text-[#a0a59f]"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
              myPlanActive
                ? "bg-[#1A2312] !text-[#C2F800]"
                : "!text-[#a0a59f]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Plan & Saved */}
        <div className="flex items-center justify-center gap-3 justify-self-center sm:gap-5 sm:justify-self-end">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#a5a9b0] transition hover:text-white sm:gap-2 sm:text-[12px]"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-[#0b0d0f]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#a5a9b0] transition hover:text-white sm:gap-2 sm:text-[12px]"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343840] px-1.5 text-[10px] text-[#a5a9b0]">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#343840] text-[#a5a9b0] justify-self-end sm:hidden"
        >
          <span className="text-xl leading-none">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="border-t border-[#242824] px-5 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] ${
                workoutActive
                  ? "bg-[#1A2312] !text-[#C2F800]"
                  : "!text-[#a0a59f]"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] ${
                myPlanActive
                  ? "bg-[#1A2312] !text-[#C2F800]"
                  : "!text-[#a0a59f]"
              }`}
            >
              My Plan
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}