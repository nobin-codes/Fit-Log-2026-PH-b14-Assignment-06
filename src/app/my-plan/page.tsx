"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
    markAsDone,
    isCompleted,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

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

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#0b0d0c] px-5 py-12 text-white">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <div className="border-b border-[#242824] pb-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-[-0.04em] sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#8f958e]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#242824] bg-[#111411] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
              Exercises
            </p>

            <p className="mt-3 text-3xl font-extrabold text-white">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#242824] bg-[#111411] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
              Minutes
            </p>

            <p className="mt-3 text-3xl font-extrabold text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-[#242824] bg-[#111411] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
              Calories
            </p>

            <p className="mt-3 text-3xl font-extrabold text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-[#242824]">
          <div className="flex items-center justify-start gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-t-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
                activeTab === "plan"
                  ? "bg-[#B8E600] text-[#0b0d0c]"
                  : "text-[#858b84] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-t-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
                activeTab === "saved"
                  ? "bg-[#B8E600] text-[#0b0d0c]"
                  : "text-[#858b84] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Workout List */}
        <div className="mt-8">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#242824] bg-[#111411]">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#CCFF00]">
                Loading workouts…
              </p>
            </div>
          ) : currentWorkouts.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#242824] bg-[#111411] px-5 text-center">
              <p className="text-xl font-extrabold uppercase text-white">
                Nothing Here Yet
              </p>

              <p className="mt-3 max-w-[400px] text-sm leading-6 text-[#858b84]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 rounded-full bg-[#CCFF00] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#0b0d0c] transition hover:bg-[#d6ff33]"
              >
                Go to Workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {currentWorkouts.map((workout) => {
                const done =
                  activeTab === "plan" ? isCompleted(workout.id) : false;

                return (
                  <article
                    key={workout.id}
                    className={`overflow-hidden rounded-2xl border bg-[#111411] ${
                      done
                        ? "border-[#CCFF00]/40"
                        : "border-[#242824]"
                    }`}
                  >
                    <div className="flex min-h-[180px] flex-col sm:flex-row sm:items-center">
                      {/* Thumbnail */}
                      <div className="shrink-0 sm:h-[180px] sm:w-[220px]">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-52 w-full object-cover sm:h-full"
                        />
                      </div>

                      {/* Workout Info */}
                      <div className="flex flex-1 items-center justify-between gap-6 p-5">
                        {/* Text + Stats */}
                        <div className="min-w-0">
                          <h2
                            className={`text-xl font-extrabold uppercase tracking-[-0.03em] ${
                              done ? "text-[#CCFF00]" : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-2 text-sm text-[#858b84]">
                            {workout.equipment}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#9da39c]">
                            <span>
                              <span className="text-[#CCFF00]">◷</span>{" "}
                              {workout.duration} min
                            </span>

                            <span>
                              <span className="text-[#CCFF00]">🔥</span>{" "}
                              {workout.caloriesBurned} kcal
                            </span>

                            <span>
                              <span className="text-[#CCFF00]">⭐</span>{" "}
                              {workout.rating}
                            </span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex shrink-0 items-center justify-end gap-2">
                          <Link
                            href={`/workouts/${workout.id}`}
                            className="rounded-full border border-[#3a4039] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
                          >
                            View Details
                          </Link>

                          {activeTab === "plan" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkDone(
                                    workout.id,
                                    workout.name
                                  )
                                }
                                disabled={done}
                                className={`rounded-full px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${
                                  done
                                    ? "cursor-default bg-[#CCFF00]/20 text-[#CCFF00]"
                                    : "bg-[#CCFF00] text-[#0b0d0c] hover:bg-[#d6ff33]"
                                }`}
                              >
                                <span className="mr-1 text-[#CCFF00]">
                                  ✓
                                </span>
                                {done ? "Done" : "Mark as Done"}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemove(
                                    workout.id,
                                    workout.name
                                  )
                                }
                                aria-label={`Remove ${workout.name}`}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3a4039] text-lg text-[#CCFF00] transition hover:border-red-400 hover:text-red-400"
                              >
                                ×
                              </button>
                            </>
                          )}

                          {activeTab === "saved" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSaved(
                                  workout.id,
                                  workout.name
                                )
                              }
                              aria-label={`Remove ${workout.name} from saved workouts`}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3a4039] text-lg text-[#CCFF00] transition hover:border-red-400 hover:text-red-400"
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
        </div>
      </div>
    </main>
  );
}