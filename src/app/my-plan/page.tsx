"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeSaved, markAsDone, isCompleted } =
    usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    const sorted = [...currentWorkouts];

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
  }, [currentWorkouts, sortBy]);

  const displayedWorkouts = activeTab === "plan" ? plan : saved;

  const totalExercises = displayedWorkouts.length;

  const totalMinutes = displayedWorkouts.reduce((total, workout) => {
    return total + Number(workout.duration);
  }, 0);

  const totalCalories = displayedWorkouts.reduce((total, workout) => {
    return total + Number(workout.caloriesBurned);
  }, 0);

  const handleRemove = (id: number, name: string) => {
    removeFromPlan(id);
    toast.info(`${name} removed from today's plan.`);
  };

  const handleRemoveSaved = (id: number, name: string) => {
    removeSaved(id);
    toast.info(`${name} removed from saved workouts.`);
  };

  const handleMarkDone = (id: number, name: string) => {
    markAsDone(id);
    toast.success(`${name} marked as done.`);
  };

  return (
    <main className="min-h-screen bg-[#0b0d0c] px-4 py-10 text-white sm:px-5 sm:py-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <section className="border-b border-[#242824] pb-7 sm:pb-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ccff00]">
            FITLOG / YOUR WORKOUTS
          </p>

          <h1 className="text-4xl font-extrabold uppercase tracking-[-0.04em] sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#8f958e]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="mt-7 overflow-hidden border border-[#242824] bg-[#111411] sm:mt-8">
          <div className="grid grid-cols-3">
            <div className="border-r border-[#242824] px-3 py-4 sm:px-5 sm:py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#777d76]">
                Exercises
              </p>

              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {totalExercises}
              </p>
            </div>

            <div className="border-r border-[#242824] px-3 py-4 sm:px-5 sm:py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#777d76]">
                Minutes
              </p>

              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {totalMinutes}
              </p>
            </div>

            <div className="px-3 py-4 sm:px-5 sm:py-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#777d76]">
                Calories
              </p>

              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {totalCalories}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="inline-flex w-fit items-center rounded-lg border border-[#242824] bg-[#111411] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-4 py-2 text-[10px] font-bold uppercase tracking-[0.04em] transition ${
                activeTab === "plan"
                  ? "bg-[#1b2118] text-white"
                  : "text-[#777d76] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 text-[10px] font-bold uppercase tracking-[0.04em] transition ${
                activeTab === "saved"
                  ? "bg-[#1b2118] text-white"
                  : "text-[#777d76] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="relative w-full sm:w-[190px]">
            <label
              htmlFor="sort-my-plan"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]"
            >
              Sort By
            </label>

            <select
              id="sort-my-plan"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full appearance-none rounded-full border border-[#3a4039] bg-[#111411] px-4 py-3 pr-10 text-xs font-bold uppercase tracking-[0.06em] text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="pointer-events-none absolute bottom-3 right-4 h-4 w-4 text-[#B8E600]"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        <section className="mt-7 sm:mt-8">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center border border-[#242824] bg-[#111411]">
              <div className="text-center">
                <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-[#30352f] border-t-[#ccff00]" />

                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
                  Loading workouts…
                </p>
              </div>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center border border-[#242824] bg-[#111411] px-5 text-center">
              <p className="text-xl font-extrabold uppercase text-white">
                Nothing Here Yet
              </p>

              <p className="mt-3 max-w-[400px] text-sm leading-6 text-[#858b84]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] !text-black transition hover:bg-[#d6ff33]"
              >
                Go to Workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedWorkouts.map((workout) => {
                const done =
                  activeTab === "plan" ? isCompleted(workout.id) : false;

                return (
                  <article
                    key={workout.id}
                    className={`overflow-hidden border bg-[#111411] transition ${
                      done
                        ? "border-[#ccff00]/40"
                        : "border-[#242824] hover:border-[#3a4039]"
                    }`}
                  >
                    <div className="flex min-h-[150px] flex-col sm:flex-row sm:items-center">
                      <div className="shrink-0 sm:h-[150px] sm:w-[190px]">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-52 w-full object-cover sm:h-full"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
                        <div className="min-w-0">
                          <h2
                            className={`text-xl font-extrabold uppercase tracking-[-0.03em] ${
                              done ? "text-[#ccff00]" : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-2 text-sm text-[#858b84]">
                            {workout.equipment}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#9da39c]">
                            <span>
                              <span className="text-[#ccff00]">◷</span>{" "}
                              {workout.duration} min
                            </span>

                            <span>
                              <span className="text-[#ccff00]">🔥</span>{" "}
                              {workout.caloriesBurned} kcal
                            </span>

                            <span>
                              <span className="text-[#ccff00]">⭐</span>{" "}
                              {workout.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2">
                          <Link
                            href={`/workouts/${workout.id}`}
                            className="rounded-full border border-[#3a4039] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                          >
                            View Details
                          </Link>

                          {activeTab === "plan" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkDone(workout.id, workout.name)
                                }
                                disabled={done}
                                className={`rounded-full px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
                                  done
                                    ? "cursor-default bg-[#ccff00]/20 text-[#ccff00]"
                                    : "bg-[#ccff00] text-[#0b0d0c] hover:bg-[#d6ff33]"
                                }`}
                              >
                                <span className="mr-1">✓</span>
                                {done ? "Done" : "Mark as Done"}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemove(workout.id, workout.name)
                                }
                                aria-label={`Remove ${workout.name}`}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3a4039] text-lg text-[#ccff00] transition hover:border-red-400 hover:text-red-400"
                              >
                                ×
                              </button>
                            </>
                          )}

                          {activeTab === "saved" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSaved(workout.id, workout.name)
                              }
                              aria-label={`Remove ${workout.name} from saved workouts`}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3a4039] text-lg text-[#ccff00] transition hover:border-red-400 hover:text-red-400"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
