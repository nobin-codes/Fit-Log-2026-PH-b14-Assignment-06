"use client";

import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plan, addToPlan, addToSaved, isInPlan, isSaved } = usePlan();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planIsFull = plan.length >= 5;

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      toast.warning("This workout is already in today's plan.");
      return;
    }

    if (planIsFull) {
      toast.warning("Today's plan can contain up to 5 lifts.");
      return;
    }

    const added = addToPlan(workout);

    if (added) {
      toast.success("Added to today's plan.");
    }
  };

  const handleSave = () => {
    if (alreadySaved) {
      toast.warning("This workout is already saved.");
      return;
    }

    const added = addToSaved(workout);

    if (added) {
      toast.success("Saved for later.");
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={alreadyInPlan || planIsFull}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
          alreadyInPlan || planIsFull
            ? "cursor-not-allowed bg-[#252a23] text-[#666c64]"
            : "bg-[#B8E600] text-[#0b0d0c] hover:bg-[#c7f500]"
        }`}
      >
        <span aria-hidden="true">＋</span>
        {alreadyInPlan ? "In Today's Plan" : "Add to Today's Plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
          alreadySaved
            ? "border-[#B8E600]/50 bg-[#1b2117] text-[#B8E600]"
            : "border-[#3a4039] text-white hover:border-[#B8E600] hover:text-[#B8E600]"
        }`}
      >
        <span aria-hidden="true">☆</span>
        {alreadySaved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
