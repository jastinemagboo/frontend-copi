import { useEffect, useRef, useState, type FormEvent } from "react";
import type { CreatePostPayload } from "@/types/post";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader, SquarePen } from "lucide-react";

type Props = {
  onCreate?: (payload: CreatePostPayload) => Promise<void> | void;
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  initial?: { title?: string; content?: string };
  mode?: "create" | "edit";
  onSubmit?: (payload: CreatePostPayload) => Promise<void> | void;
};

export default function StoryModal({
  onCreate,
  onSubmit,
  open: openProp,
  onOpenChange,
  initial,
  mode = "create",
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "edit" && open) {
      setTitle(initial?.title ?? "");
      setContent(initial?.content ?? "");
    }
  }, [mode, open, initial?.title, initial?.content]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setErr(null);
    setSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { title: title.trim(), content: content.trim() };
    const missingTitle = !payload.title;
    const missingContent = !payload.content;

    if (missingTitle || missingContent) {
      setErr(
        missingTitle && missingContent
          ? "Please add your favorite coffee and your story."
          : missingTitle
          ? "Please enter your favorite coffee."
          : "Please share your coffee story."
      );
      return;
    }
    try {
      setSubmitting(true);
      setErr(null);

      if (mode === "edit") {
        await onSubmit?.(payload);
      } else {
        await onCreate?.(payload);
        resetForm();
      }

      setTitle("");
      setContent("");
      setOpen(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      {mode === "create" && !openProp && (
        <DialogTrigger asChild>
          <DialogTrigger asChild>
            <Button
              aria-label="Share Story"
              className="
                rounded-full
                h-10 w-10                 
                sm:h-[36px] sm:w-auto     
                sm:px-4
                flex items-center justify-center
                text-white bg-[#4B3C2F] hover:bg-[#4B3C2F]
                gap-0 sm:gap-2
              "
            >
              <SquarePen className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Share Story</span>
            </Button>
          </DialogTrigger>
        </DialogTrigger>
      )}

      <DialogContent
        onOpenAutoFocus={(e) => {
          if (titleRef.current) {
            e.preventDefault();
            const el = titleRef.current;
            el.focus({ preventScroll: true });
            const len = el.value.length;
            el.setSelectionRange?.(len, len);
          }
        }}
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[88vw] max-w-full scale-100 rounded-3xl bg-[#f9f5f1] p-6 sm:p-8 shadow-2xl transition-all duration-300"
      >
        <DialogHeader className="flex justify-center items-center mb-4 text-center text-2xl text-[#4B3C2F]">
          <DialogTitle className="font-bold">
            {mode === "edit" ? "Edit Coffee Story" : "Share Your Coffee Story"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label
                htmlFor="name-1"
                className=" text-sm font-medium text-[#4B3C2F]"
              >
                Favorite Coffee
              </Label>
              <Input
                id="story-title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#4B3C2F] placeholder:text-[#4B3C2F]/60 "
                placeholder="e.g., Spanish Latte"
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="username-1"
                className=" text-sm font-medium text-[#4B3C2F]"
              >
                Your Story
              </Label>

              <Textarea
                id="story-content"
                name="content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-[#4B3C2F] placeholder:text-[#4B3C2F]/60"
                placeholder="How does coffee help you cope?"
              />
            </div>
          </div>
          {err && <p className="text-sm mt-2 text-red-600">{err}</p>}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h-10 w-full sm:w-auto rounded-full text-[#4B3C2F] hover:bg-[#f3eee9] hover:text-[#4B3C2F]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={submitting}
              className="h-10 w-full sm:w-auto rounded-full bg-[#4B3C2F] hover:bg-[#4B3C2F] text-white"
            >
              {submitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {submitting
                ? mode === "edit"
                  ? "Saving…"
                  : "Posting…"
                : mode === "edit"
                ? "Save"
                : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
