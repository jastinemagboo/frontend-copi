import StoryModal from "@/components/StoryModal";
import { ArrowRight, Coffee, Heart, PauseCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/api/posts";
import type { CreatePostPayload } from "@/types/post";

const reasons = [
  {
    icon: PauseCircle,
    title: "Pause",
    description:
      "A small moment to step away from the noise and simply breathe.",
  },
  {
    icon: Sparkles,
    title: "Reset",
    description:
      "Sometimes a cup of coffee is enough to clear your head and start again.",
  },
  {
    icon: Heart,
    title: "Keep Going",
    description:
      "Even on difficult days, little rituals can give us the motivation to move forward.",
  },
];

export default function About() {
  const navigate = useNavigate();

  const handleCreateStory = async (payload: CreatePostPayload) => {
    await createPost(payload);

    navigate("/");

    setTimeout(() => {
      document.getElementById("stories")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#3E3027]">
      {/* Hero */}
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          {/* Story */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-[#8B5E3C]">
              <Coffee size={17} />
              <span>The story behind COPI</span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Why I made
              <br />
              <span className="text-[#8B5E3C]">COPI.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#76685E]">
              COPI started with something simple: coffee has always been a
              little more than just a drink for me. It became one of the little
              ways I learned to cope.
            </p>
          </div>

          {/* Coffee Visual */}
          <div className="relative flex min-h-[380px] items-center justify-center">
            <img
              src="/copi-coffee-3d.png"
              alt="Coffee cup"
              className="w-[340px] object-contain sm:w-[400px]"
            />

            <span className="absolute bottom-10 right-4 text-sm italic text-[#A08D7D]">
              a little cup of comfort
            </span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-[#E8E0D8] bg-[#FCFAF7] px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8B5E3C]">
              A little personal
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Sometimes,
              <br />I just overthink.
            </h2>
          </div>

          <div className="space-y-6 text-[17px] leading-8 text-[#76685E]">
            <p>
              There are days when my mind feels too full. I tend to overthink
              things, replay conversations, worry about what could happen, or
              simply get stuck in my own thoughts.
            </p>

            <p>
              Sometimes, I just need a quiet moment to step away from
              everything.
            </p>

            <p className="text-xl font-medium leading-8 text-[#3E3027]">
              And somehow, coffee became part of that moment.
            </p>

            <p>
              There is something about sitting down with a cup of coffee that
              helps me slow down. It gives me a little space to breathe, clear
              my mind, and get myself moving again.
            </p>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8B5E3C]">
              What coffee became
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              More than just a cup.
            </h2>

            <p className="mt-4 leading-7 text-[#76685E]">
              For me, coffee became a small ritual that helped me through
              different kinds of moments.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-[#E8E0D8] bg-[#FCFAF7] p-7"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#EFE4D8] text-[#8B5E3C]">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-xl font-semibold">{reason.title}</h3>

                  <p className="mt-3 leading-7 text-[#76685E]">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why COPI */}
      <section className="bg-[#3E3027] px-6 py-20 text-[#F7F3EE]">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#D6B99D]">
              <Coffee size={17} />
              <span>That's where COPI came from.</span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Maybe coffee means something to you, too.
            </h2>

            <div className="mt-7 space-y-5 text-[17px] leading-8 text-[#D8CDC4]">
              <p>
                I wanted to create a small space where people could share the
                stories, memories, thoughts, and moments they associate with
                coffee — especially the little moments that help them get
                through the day.
              </p>

              <p>
                Maybe it's a coffee you used to share with someone. Maybe it's
                the drink that helped you get through a difficult day. Maybe
                it's your favorite cup before starting work, studying, creating,
                or simply taking a break.
              </p>

              <p>
                Everyone has a different relationship with coffee. And I thought
                — maybe those little moments are worth remembering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Coffee className="mx-auto mb-6 text-[#8B5E3C]" size={28} />

          <h2 className="text-3xl font-semibold sm:text-4xl">
            What's your coffee story?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#76685E]">
            Share a memory, a moment, or simply the story behind your favorite
            cup.
          </p>

          <StoryModal
            onCreate={handleCreateStory}
            trigger={
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#754C31]">
                Share your story
                <ArrowRight size={17} />
              </button>
            }
          />
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-2xl font-medium leading-9 text-[#3E3027] sm:text-3xl">
            “Because sometimes, it's not really about the coffee.”
          </p>

          <p className="mt-3 text-lg text-[#8B5E3C]">
            It's about the moment that came with it.
          </p>
        </div>
      </section>
    </main>
  );
}
