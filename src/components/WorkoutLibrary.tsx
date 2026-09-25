"use client";

import { useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      sorted.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      sorted.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    }

    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="bg-[#0b0d0c] py-16 sm:py-20">
      <div className="container-fitlog">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8E600]">
              Workout Library
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              The Library
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#8f958e]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative w-full md:w-[190px]">
            <label
              htmlFor="sort-workouts"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]"
            >
              Sort By
            </label>

            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="w-full appearance-none rounded-full border border-[#3a4039] bg-[#111411] px-4 py-3 pr-10 text-xs font-bold uppercase tracking-[0.06em] text-white outline-none transition focus:border-[#B8E600]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-4 text-sm text-[#B8E600]"
            >
              ↓
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#242824] bg-[#111411]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2a2f28] border-t-[#B8E600]" />

            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#B8E600]">
              Loading workouts...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#242824] bg-[#111411]">
            <p className="text-sm font-bold text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#242824] bg-[#111411]">
            <p className="text-sm text-[#9da39c]">
              No workouts available right now.
            </p>
          </div>
        )}

        {!loading && !error && sortedWorkouts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}