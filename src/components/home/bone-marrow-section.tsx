import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";

export function BoneMarrowSection() {
  return (
    <AnimatedSection
      id="doacao-medula"
      aria-labelledby="bone-marrow-heading"
      className="w-full relative overflow-hidden bg-[#EE232E] text-white section-torn-both pt-24 pb-24 md:pt-32 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-9 sm:top-9 lg:top-0 right-0 translate-x-[10%] sm:translate-x-[5%] md:translate-x-[4%] lg:translate-x-0 z-0 w-[300px] min-[400px]:w-[330px] sm:w-[460px] md:w-[600px] lg:w-[700px] xl:w-[800px] aspect-[1569/1080]"
      >
        <Image
          src="/heart_hand.webp"
          alt=""
          fill
          quality={100}
          referrerPolicy="no-referrer"
          sizes="(min-width: 1024px) 1200px, (min-width: 640px) 828px, 640px"
          className="object-contain object-right-top"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between gap-9 sm:gap-16 md:gap-20 lg:gap-16 min-h-0 sm:min-h-[380px] md:min-h-[440px]">
        <div className="w-full flex justify-start pt-2">
          <p
            aria-hidden="true"
            className="font-caveat font-normal text-[3.85rem] min-[400px]:text-[4.35rem] sm:text-[6.5rem] md:text-[7.75rem] lg:text-[9.5rem] xl:text-[10.75rem] text-white leading-[0.82] tracking-tight drop-shadow-[0_2px_12px_rgba(90,8,14,0.22)] select-none"
          >
            Juntos
            <br />
            somos
            <br />
            mais!
          </p>
        </div>

        <div className="flex flex-col items-center text-center pb-2 sm:pb-3">
          <h2
            id="bone-marrow-heading"
            className="text-2xl sm:text-[2rem] md:text-[2.4rem] lg:text-[2.65rem] font-normal text-white tracking-wider uppercase leading-tight text-balance drop-shadow-[0_2px_10px_rgba(90,8,14,0.22)]"
          >
            <span className="sr-only">Juntos somos mais! </span>
            Seja um doador de
            <span className="block text-[2.15rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.15rem] font-extrabold tracking-tight text-white mt-1">
              medula óssea!
            </span>
          </h2>
        </div>
      </div>
    </AnimatedSection>
  );
}
