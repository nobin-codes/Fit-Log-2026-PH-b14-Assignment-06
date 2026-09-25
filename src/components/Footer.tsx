import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#242824] bg-[#0b0d0c] py-8">
      <div className="container-fitlog flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-[21px] font-extrabold tracking-[-0.04em] text-white">
            FIT<span className="text-[#C2F800]">LOG</span>
          </span>
        </Link>

        <p className="text-right text-[11px] text-[#858b84]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}