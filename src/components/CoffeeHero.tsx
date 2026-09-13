import StoryModal from "@/components/StoryModal";
import { ArrowDown } from "lucide-react";
import type { CreatePostPayload } from "@/types/post";

type Props = {
  onCreate: (payload: CreatePostPayload) => Promise<void> | void;
};

export default function CoffeeHero({ onCreate }: Props) {
  return (
    <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-2 md:gap-16">
      {/* LEFT */}
      <div>
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#8B5E3C]">
          WELCOME TO COPI
        </p>

        <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#3E3027] sm:text-6xl lg:text-7xl">
          Coffee, stories,
          <br />
          and little ways to cope.
        </h1>

        <p className="mt-7 max-w-lg text-base leading-7 text-[#76685E] sm:text-lg">
          Every cup has a story worth remembering. Share yours, or explore
          stories from others.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <StoryModal onCreate={onCreate} />

          <a
            href="#stories"
            className="
              flex h-10 items-center gap-2 rounded-full
              border border-[#DCCFC3] bg-white px-5
              text-sm font-medium text-[#4B3C2F] shadow-sm
              transition hover:-translate-y-0.5 hover:bg-[#FCFAF7]
            "
          >
            Explore Stories
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-5 text-xs text-[#76685E]/70">
          A small space for stories shared over coffee.
        </p>
      </div>

      {/* 3D COFFEE SPACE */}
      <div className="relative flex min-h-[460px] items-center justify-center overflow-visible px-4">
        <div
          className="
            relative flex
            h-[300px] w-[300px]
            items-center justify-center
            rounded-full
            bg-[#EADBC8]
            shadow-[0_30px_80px_rgba(75,60,47,0.12)]
            sm:h-[380px] sm:w-[380px]
            lg:h-[420px] lg:w-[420px]
            "
        >
          {/* 3D COFFEE */}
          <img
            src="/copi-coffee-3d.png"
            alt="3D coffee cup"
            className="
                absolute z-10
                w-[250px]
                object-contain
                sm:w-[350px]
                lg:w-[400px]
            "
          />

          {/* FLOATING LABELS */}

          {/* top right */}
          <div className="absolute right-[-2px] top-7 z-20 rounded-full border border-[#DCCFC3] bg-white px-3 py-1.5 text-[10px] font-medium text-[#76685E] shadow-sm sm:-right-6 sm:px-4 sm:py-2 sm:text-xs">
            made for coffee lovers
          </div>

          {/* left middle */}
          <div className="absolute -left-8 top-17 z-20 rotate-[-6deg] rounded-full border border-[#DCCFC3] bg-white/95 px-3 py-1.5 text-[10px] font-medium text-[#76685E] shadow-sm sm:-left-10 sm:px-4 sm:py-2 sm:text-xs">
            your story matters
          </div>

          {/* bottom right */}
          <div className="absolute -right-8 bottom-20 z-20 rotate-[5deg] rounded-full border border-[#DCCFC3] bg-white/95 px-3 py-1.5 text-[10px] font-medium text-[#76685E] shadow-sm md:bottom-20 sm:-right-10 sm:px-4 sm:py-2 sm:text-xs">
            freshly brewed
          </div>

          {/* bottom left */}
          <div className="absolute bottom-5 left-[-4px] z-20 rounded-full border border-[#DCCFC3] bg-white px-3 py-1.5 text-[10px] font-medium text-[#76685E] shadow-sm sm:bottom-4 sm:left-6 sm:px-4 sm:py-2 sm:text-xs">
            stories & memories
          </div>

          {/* DECORATIVE DOTS */}
          <span className="absolute left-8 top-10 h-2.5 w-2.5 rounded-full bg-[#C9A98B]/50 sm:h-3 sm:w-3" />

          <span className="absolute right-12 top-2 h-2 w-2 rounded-full bg-[#8B5E3C]/40" />

          <span className="absolute left-2 top-1/2 h-3 w-3 rounded-full bg-[#DCCFC3]/70 sm:-left-7 sm:h-4 sm:w-4" />

          <span className="absolute right-2 top-1/2 h-2.5 w-2.5 rounded-full bg-[#C9A98B]/50 sm:-right-8 sm:h-3 sm:w-3" />

          {/* SPARKLES */}
          <span className="absolute bottom-12 right-8 text-lg text-[#8B5E3C]/40 sm:right-10 sm:text-xl">
            ✦
          </span>

          <span className="absolute bottom-20 left-6 text-xs text-[#8B5E3C]/30 sm:bottom-24 sm:left-8 sm:text-sm">
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}
