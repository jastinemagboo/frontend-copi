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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ellipsis, Trash, Edit } from "lucide-react";
import StoryModal from "@/components/StoryModal";

type Props = {
  post: Post;
  onDelete: (id: string | number) => Promise<void> | void;
  onUpdate: (
    id: string | number,
    payload: UpdatePostPayload
  ) => Promise<void> | void;
};

export default function StoryCard({ post, onDelete, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div
      key={post.id}
      className="rounded-2xl border border-[#e8e4df] bg-white p-6 shadow-lg"
    >
      <div className="flex flex-row">
        <h2 className="mb-1 text-xl font-bold flex-1">{post.title}</h2>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Post actions"
              className="
                rounded-full p-2 text-[#4B3C2F] hover:bg-[#f3eee9]
                outline-none focus:outline-none focus-visible:outline-none
                ring-0 focus:ring-0 focus-visible:ring-0
                border-0 appearance-none
                data-[state=open]:ring-0 data-[state=open]:outline-none data-[state=open]:bg-[#f3eee9]
              "
            >
              <Ellipsis className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuItem
              className="text-[#4B3C2F] focus:text-[#4B3C2F]"
              onSelect={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setEditOpen(true);
              }}
            >
              <Edit className="h-4 w-4 text-[#4B3C2F] group-data-[highlighted]:text-[#4B3C2F] " />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <AlertDialog
              open={confirmOpen}
              onOpenChange={(open) => {
                setConfirmOpen(open);
                if (!open) setMenuOpen(false);
              }}
            >
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600  focus:text-red-600"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash className="h-4 w-4 text-red-600 group-data-[highlighted]:text-red-700" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-[88vw] max-w-full">
                <AlertDialogHeader className="text-[#4B3C2F]">
                  <AlertDialogTitle className="text-center">
                    Delete {post.title}?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-1 text-left text-[#4B3C2F]/80">
                    Deleting <span className="font-semibold">{post.title}</span>{" "}
                    will remove it permanently from Copi. This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setConfirmOpen(false)}
                    className="hover:bg-[#f3eee9] text-[#4B3C2F]"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(post.id);
                      setConfirmOpen(false);
                    }}
                    className="bg-[#4B3C2F] hover:bg-[#4B3C2F]"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mb-3 text-xs italic text-[#4B3C2F] opacity-60">
        {post.updated_at
          ? "Updated: " + dateFormat(post.updated_at)
          : "Posted: " + dateFormat(post.created_at)}
      </p>

      <p className="text-[#4B3C2F] font-medium ">
        {expanded || post.content.length <= 200
          ? post.content
          : post.content.slice(0, 200) + "..."}
      </p>

      {post.content.length > 200 && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-sm font-medium text-[#4B3C2F]  transition hover:text-[#6a4c35] hover:underline"
        >
          {expanded ? "Less" : "More"}
        </button>
      )}

      <StoryModal
        mode="edit"
        open={editOpen}
        onOpenChange={setEditOpen}
        initial={{ title: post.title, content: post.content }}
        onSubmit={async (payload) => {
          await onUpdate(post.id, payload);
        }}
      />
    </div>
  );
}
