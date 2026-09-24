import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0d0c] px-5 text-center text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8E600]">
        FitLog
      </p>

      <h1 className="mt-3 text-5xl font-extrabold uppercase">404</h1>

      <p className="mt-3 text-sm text-[#858b84]">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-full bg-[#B8E600] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] !text-[#0b0d0c]"
      >
        Back to Workouts
      </Link>
    </main>
  );
}
