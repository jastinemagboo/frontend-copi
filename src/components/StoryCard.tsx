import type { Post, UpdatePostPayload } from "@/types/post";
import { dateFormat } from "@/utils/date";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coffee, Ellipsis, Trash, Edit, ArrowDown } from "lucide-react";
import StoryModal from "@/components/StoryModal";
import DeleteStoryDialog from "@/components/DeleteStoryDialog";
import { Skeleton } from "./ui/skeleton";

type Props = {
  post: Post;
  onDelete: (id: string | number) => Promise<void> | void;
  onUpdate: (
    id: string | number,
    payload: UpdatePostPayload,
  ) => Promise<void> | void;
  isLoading?: boolean;
};

export default function StoryCard({
  post,
  onDelete,
  onUpdate,
  isLoading = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <article
      className="
        group
        rounded-3xl
        border border-[#E8DED5]
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(75,60,47,0.05)]
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_35px_rgba(75,60,47,0.08)]
        sm:p-6
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {isLoading ? (
          <>
            <Skeleton className="mt-1 h-9 w-9 shrink-0 rounded-full bg-[#F5F1EB] animate-none" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3 bg-[#F5F1EB] animate-none" />
              <Skeleton className="h-3 w-32 bg-[#F5F1EB] animate-none" />
            </div>

            <Skeleton className="h-8 w-8 shrink-0 rounded-full bg-[#F5F1EB] animate-none" />
          </>
        ) : (
          <>
            {/* Coffee Accent */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F3EAE2]
                text-[#8B5E3C]
              "
            >
              <Coffee className="h-4 w-4" aria-hidden="true" />
            </div>

            {/* Title + Date */}
            <div className="min-w-0 flex-1">
              <h2 className="break-words text-lg font-semibold tracking-tight text-[#3E3027] sm:text-xl">
                {post.title}
              </h2>

              <p className="mt-1 text-xs text-[#76685E]">
                {post.updated_at
                  ? `Updated: ${dateFormat(post.updated_at)}`
                  : `Posted: ${dateFormat(post.created_at)}`}
              </p>
            </div>

            {/* Actions */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Post actions"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[#76685E]
                    outline-none
                    transition
                    hover:bg-[#F3EEE9]
                    hover:text-[#4B3C2F]
                    focus-visible:ring-2
                    focus-visible:ring-[#8B5E3C]/20
                    data-[state=open]:bg-[#F3EEE9]
                    data-[state=open]:text-[#4B3C2F]
                  "
                >
                  <Ellipsis className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                  w-36
                  rounded-xl
                  border-[#E8DED5]
                  bg-[#FFFCF9]
                  p-1
                  shadow-lg
                "
              >
                {/* Edit */}
                <DropdownMenuItem
                  className="
                    cursor-pointer
                    rounded-lg
                    text-[#4B3C2F]
                    focus:bg-[#F3EEE9]
                    focus:text-[#4B3C2F]
                  "
                  onSelect={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setEditOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 text-[#8B5E3C]" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-[#E8DED5]" />

                {/* Delete */}
                <DropdownMenuItem
                  className="
                    cursor-pointer
                    rounded-lg
                    text-red-600
                    focus:bg-red-50
                    focus:text-red-600
                  "
                  onSelect={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setConfirmOpen(true);
                  }}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {/* Story */}
      <div className="mt-5">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-[#F5F1EB] animate-none" />
            <Skeleton className="h-4 w-[94%] bg-[#F5F1EB] animate-none" />
            <Skeleton className="h-4 w-[72%] bg-[#F5F1EB] animate-none" />
          </div>
        ) : (
          <>
            <p
              className="
                whitespace-pre-line
                text-[15px]
                leading-7
                text-[#5A4A3E]
              "
            >
              {expanded || post.content.length <= 200
                ? post.content
                : `${post.content.slice(0, 200)}...`}
            </p>

            {post.content.length > 200 && (
              <button
                type="button"
                onClick={toggleExpand}
                className="
                  mt-3
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  text-[#8B5E3C]
                  transition
                  hover:text-[#6F482F]
                "
              >
                {expanded ? "Show less" : "Read more"}

                <ArrowDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </>
        )}
      </div>

      {/* Delete Dialog */}
      {!isLoading && (
        <DeleteStoryDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          storyTitle={post.title}
          onDelete={() => onDelete(post.id)}
        />
      )}

      {/* Edit Modal */}
      {!isLoading && (
        <StoryModal
          mode="edit"
          open={editOpen}
          onOpenChange={setEditOpen}
          initial={{
            title: post.title,
            content: post.content,
          }}
          onSubmit={async (payload) => {
            await onUpdate(post.id, payload);
          }}
        />
      )}
    </article>
  );
}
