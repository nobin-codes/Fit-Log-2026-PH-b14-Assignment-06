"use client";

import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#242824] bg-[#111411] transition hover:border-[#3a4039]"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-[#30352f] px-2.5 py-1 text-[10px] font-medium uppercase text-[#aeb4ac]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="mt-4 text-xl font-extrabold uppercase tracking-[-0.03em] text-white transition group-hover:text-[#B8E600]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-[#969c95]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-[#242824] pt-4 text-xs text-[#9da39c]">
          <span>◷ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}