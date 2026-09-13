import StoryModal from "@/components/StoryModal";
import type { CreatePostPayload } from "@/types/post";
import { Coffee } from "lucide-react";

type Props = {
  searchTerm: string;
  onCreate: (payload: CreatePostPayload) => Promise<void> | void;
};

export default function EmptyStories({ searchTerm, onCreate }: Props) {
  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="rounded-3xl border border-[#E8E0D8] bg-white px-6 py-16 text-center shadow-sm">
      <Coffee className="mx-auto mb-4 h-8 w-8 text-[#8B5E3C]" />

      {hasSearch ? (
        <>
          <h3 className="font-semibold text-[#3E3027]">No stories found</h3>

          <p className="mt-2 text-sm text-[#76685E]">
            Nothing matched “{searchTerm.trim()}”.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-[#3E3027]">No stories yet.</h3>

          <p className="mt-2 text-sm text-[#76685E]">
            Every cup has a story. Why not share yours?
          </p>

          <div className="mt-5">
            <StoryModal onCreate={onCreate} />
          </div>
        </>
      )}
    </div>
  );
}
