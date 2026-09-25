import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0b0d0f] px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:pt-12">
      <div
        className="
          container-fitlog
          relative
          overflow-hidden
          rounded-[16px]
          border
          border-[#292d34]
          bg-[#15171c]
        "
      >
        <div
          className="
            flex
            min-h-[580px]
            flex-col
            justify-between
            px-7
            pt-12
            sm:min-h-[620px]
            sm:px-10
            sm:pt-14
            lg:min-h-[442px]
            lg:flex-row
            lg:items-center
            lg:px-14
            lg:py-0
          "
        >
          <div className="relative z-10 w-full lg:w-[58%]">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#c2f800] sm:text-[11px]">
              Workout Library
            </p>

            <h1
              className="
                max-w-[650px]
                font-[Impact]
                text-[45px]
                uppercase
                leading-[0.91]
                tracking-[-0.015em]
                text-white
                sm:text-[56px]
                lg:text-[68px]
              "
            >
              Train with intent. Log
              <br />
              every set.
            </h1>

            <p className="mt-6 max-w-[540px] text-[13px] leading-[1.65] text-[#969ca7] sm:text-[15px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="mt-7">
              <Link
                href="#library"
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-[6px]
                  bg-[#c2f800]
                  px-6
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.02em]
                  !text-[#0b0d0f]
                  transition
                  hover:bg-[#d0ff26]
                "
              >
                Browse Workouts
              </Link>
            </div>
          </div>

          <div
            className="
              relative
              mt-8
              flex
              h-[300px]
              w-full
              shrink-0
              items-end
              justify-center
              sm:mt-10
              sm:h-[360px]
              lg:absolute
              lg:bottom-3
              lg:right-[55px]
              lg:mt-0
              lg:h-[405px]
              lg:w-[370px]
            "
          >
            <Image
              src="/hero-workout.png"
              alt="Workout training"
              width={500}
              height={500}
              priority
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}