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
      {" "}
      <div className="container-fitlog relative h-[70px]">
        {" "}
        {/* Logo */}{" "}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:static sm:flex sm:h-full sm:translate-x-0 sm:translate-y-0 sm:items-center">
          {" "}
          <Link href="/" className="flex items-center gap-2">
            {" "}
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />{" "}
            <span className="text-[21px] font-extrabold tracking-[-0.04em] text-white">
              {" "}
              FIT<span className="text-[#C2F800]">LOG</span>{" "}
            </span>{" "}
          </Link>{" "}
        </div>{" "}
        {/* Desktop Navigation */}{" "}
        <nav className="hidden items-center gap-2 sm:absolute sm:left-1/2 sm:top-1/2 sm:flex sm:-translate-x-1/2 sm:-translate-y-1/2">
          {" "}
          <Link
            href="/"
            className={
              workoutActive
                ? "rounded-full bg-[#1A2312] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#C2F800]"
                : "rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#a0a59f]"
            }
          >
            {" "}
            Workout{" "}
          </Link>{" "}
          <Link
            href="/my-plan"
            className={
              myPlanActive
                ? "rounded-full bg-[#1A2312] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#C2F800]"
                : "rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#a0a59f]"
            }
          >
            {" "}
            My Plan{" "}
          </Link>{" "}
        </nav>{" "}
        {/* Desktop Plan + Saved */}{" "}
        <div className="hidden sm:absolute sm:right-0 sm:top-1/2 sm:flex sm:-translate-y-1/2 sm:items-center sm:gap-5">
          {" "}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#a5a9b0] transition hover:text-white"
          >
            {" "}
            <span>Plan</span>{" "}
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-[#0b0d0f]">
              {" "}
              {plan.length}{" "}
            </span>{" "}
          </Link>{" "}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#a5a9b0] transition hover:text-white"
          >
            {" "}
            <span>Saved</span>{" "}
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343840] px-1.5 text-[10px] text-[#a5a9b0]">
              {" "}
              {saved.length}{" "}
            </span>{" "}
          </Link>{" "}
        </div>{" "}
        {/* Mobile Hamburger */}{" "}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="absolute left-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#343840] text-[#a5a9b0] sm:hidden"
        >
          {" "}
          <span className="text-xl leading-none">
            {" "}
            {menuOpen ? "×" : "☰"}{" "}
          </span>{" "}
        </button>{" "}
        {/* Mobile Plan + Saved */}{" "}
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3 sm:hidden">
          {" "}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#a5a9b0] transition hover:text-white"
          >
            {" "}
            <span>Plan</span>{" "}
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-[#0b0d0f]">
              {" "}
              {plan.length}{" "}
            </span>{" "}
          </Link>{" "}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#a5a9b0] transition hover:text-white"
          >
            {" "}
            <span>Saved</span>{" "}
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343840] px-1.5 text-[10px] text-[#a5a9b0]">
              {" "}
              {saved.length}{" "}
            </span>{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      {/* Mobile Menu */}{" "}
      {menuOpen && (
        <nav className="border-t border-[#242824] px-5 py-3 sm:hidden">
          {" "}
          <div className="flex flex-col gap-1">
            {" "}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={
                workoutActive
                  ? "rounded-lg bg-[#1A2312] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#C2F800]"
                  : "rounded-lg px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#a0a59f]"
              }
            >
              {" "}
              Workout{" "}
            </Link>{" "}
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={
                myPlanActive
                  ? "rounded-lg bg-[#1A2312] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#C2F800]"
                  : "rounded-lg px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] !text-[#a0a59f]"
              }
            >
              {" "}
              My Plan{" "}
            </Link>{" "}
          </div>{" "}
        </nav>
      )}{" "}
    </header>
  );
}
