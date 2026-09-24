import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 text-center text-white">
        <div>
          <p className="text-2xl font-extrabold uppercase">
            Workout Not Found
          </p>

          <p className="mt-3 text-sm text-[#858b84]">
            The workout you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0c] px-5 py-12 text-white">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="overflow-hidden rounded-2xl border border-[#242824] bg-[#111411]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>

          {/* Right Side - Details */}
          <div>
            {/* Title */}
            <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-[-0.04em] sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-[#9da39c]">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#1b2117] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B8E600]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Specs */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#242824] bg-[#111411]">
              <div className="divide-y divide-[#242824]">
                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Equipment
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Difficulty
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Sets
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.sets}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Reps
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.reps}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Duration
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Calories
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777d76]">
                    Rating
                  </span>

                  <span className="text-right text-sm font-semibold text-white">
                    {workout.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.08em]">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="flex gap-3 text-sm leading-6 text-[#9da39c]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B8E600] text-[10px] font-extrabold text-[#0b0d0c]">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}