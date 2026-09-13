import StoryModal from "@/components/StoryModal";
import { ArrowDown, Coffee } from "lucide-react";
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
          Coffee stories
        </p>

        <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#3E3027] sm:text-6xl lg:text-7xl">
          Coffee stories,
          <br />
          one cup at a time.
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
      <div className="relative flex min-h-[420px] items-center justify-center">
        {/* 
          3D coffee visual will go here later.
          Keep this container — we'll simply replace
          the placeholder with the actual asset.
        */}

        <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full bg-[#EADBC8] shadow-[0_30px_80px_rgba(75,60,47,0.12)] sm:h-[380px] sm:w-[380px]">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#F7F3EE] shadow-inner">
            <Coffee className="h-16 w-16 text-[#8B5E3C]" strokeWidth={1.5} />
          </div>

          <div className="absolute -right-2 top-16 rounded-full border border-[#DCCFC3] bg-white px-4 py-2 text-xs font-medium text-[#76685E] shadow-sm">
            made for coffee lovers
          </div>

          <div className="absolute -bottom-2 left-4 rounded-full border border-[#DCCFC3] bg-white px-4 py-2 text-xs font-medium text-[#76685E] shadow-sm">
            stories & memories
          </div>
        </div>
      </div>
    </section>
  );
}
