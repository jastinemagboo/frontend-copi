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
import { Coffee, Loader, SquarePen } from "lucide-react";

type Props = {
  onCreate?: (payload: CreatePostPayload) => Promise<void> | void;
  trigger?: React.ReactNode;
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
  trigger,
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [submitting, setSubmitting] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "edit" && open) {
      setTitle(initial?.title ?? "");
      setContent(initial?.content ?? "");
      setTitleError("");
      setContentError("");
    }
  }, [mode, open, initial?.title, initial?.content]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTitleError("");
    setContentError("");
    setSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // Clear previous errors
    setTitleError("");
    setContentError("");

    let hasError = false;

    if (!trimmedTitle) {
      setTitleError("Please enter your favorite coffee.");
      hasError = true;
    }

    if (!trimmedContent) {
      setContentError("Please share your coffee story.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload: CreatePostPayload = {
      title: trimmedTitle,
      content: trimmedContent,
    };

    try {
      setSubmitting(true);

      if (mode === "edit") {
        await onSubmit?.(payload);
      } else {
        await onCreate?.(payload);
      }

      setTitle("");
      setContent("");
      setTitleError("");
      setContentError("");
      setOpen(false);
    } catch (e) {
      setTitleError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (!next) {
          resetForm();
        }
      }}
    >
      {/* Trigger */}
      {mode === "create" && !openProp && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button
              aria-label="Share Story"
              className="
          h-10
          rounded-full
          bg-[#4B3C2F]
          px-5
          text-white
          shadow-sm
          transition
          hover:-translate-y-0.5
          hover:bg-[#3F3228]
          hover:shadow-md
          gap-2
        "
            >
              <SquarePen className="h-4 w-4" aria-hidden="true" />
              <span>Share Story</span>
            </Button>
          )}
        </DialogTrigger>
      )}

      {/* Modal */}
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
        className="
          w-[92vw]
          max-w-lg
          rounded-3xl
          border-[#E8DED5]
          bg-[#F9F5F1]
          p-6
          shadow-2xl
          sm:p-8
        "
      >
        <DialogHeader className="items-center text-center">
          {/* Coffee Icon */}
          <div
            className="
              mb-4
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#E9DDD2]
              text-[#8B5E3C]
            "
          >
            <Coffee className="h-5 w-5" aria-hidden="true" />
          </div>

          <DialogTitle className="text-2xl font-bold tracking-tight text-[#4B3C2F]">
            {mode === "edit" ? "Edit Coffee Story" : "Share Your Coffee Story"}
          </DialogTitle>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#76685E]">
            {mode === "edit"
              ? "Make a few changes to your coffee story."
              : "A cup, a moment, a story worth remembering."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-7">
          <div className="grid gap-5">
            {/* Coffee */}
            <div className="grid gap-2">
              <Label
                htmlFor="story-title"
                className="text-sm font-medium text-[#4B3C2F]"
              >
                What are you drinking?
              </Label>

              <Input
                ref={titleRef}
                id="story-title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);

                  if (titleError) {
                    setTitleError("");
                  }
                }}
                placeholder="e.g. Spanish Latte"
                aria-invalid={!!titleError}
                className={`
                  h-11
                  rounded-xl
                  bg-white/70
                  text-[#4B3C2F]
                  placeholder:text-[#9A8B80]
                  shadow-none
                  transition
                  focus-visible:ring-[#8B5E3C]/20
                  ${
                    titleError
                      ? "border-red-300 focus-visible:border-red-400"
                      : "border-[#DCCFC3] focus-visible:border-[#8B5E3C]"
                  }
                `}
              />

              {titleError && (
                <p className="text-xs text-red-500">{titleError}</p>
              )}
            </div>

            {/* Story */}
            <div className="grid gap-2">
              <Label
                htmlFor="story-content"
                className="text-sm font-medium text-[#4B3C2F]"
              >
                Your Story
              </Label>

              <Textarea
                id="story-content"
                name="content"
                rows={7}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);

                  if (contentError) {
                    setContentError("");
                  }
                }}
                placeholder="How does coffee help you cope?"
                aria-invalid={!!contentError}
                className={`
                  min-h-[160px]
                  resize-none
                  rounded-xl
                  bg-white/70
                  text-[#4B3C2F]
                  placeholder:text-[#9A8B80]
                  shadow-none
                  transition
                  focus-visible:ring-[#8B5E3C]/20
                  ${
                    contentError
                      ? "border-red-300 focus-visible:border-red-400"
                      : "border-[#DCCFC3] focus-visible:border-[#8B5E3C]"
                  }
                `}
              />

              {contentError && (
                <p className="text-xs text-red-500">{contentError}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-7 flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="
                  h-10
                  w-full
                  rounded-full
                  border-[#DCCFC3]
                  bg-transparent
                  px-5
                  text-[#4B3C2F]
                  hover:bg-[#F1EBE5]
                  hover:text-[#4B3C2F]
                  sm:w-auto
                "
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={submitting}
              className="
                h-10
                w-full
                rounded-full
                bg-[#4B3C2F]
                px-5
                text-white
                shadow-sm
                transition
                hover:bg-[#3F3228]
                sm:w-auto
              "
            >
              {submitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}

              {submitting
                ? mode === "edit"
                  ? "Saving…"
                  : "Sharing…"
                : mode === "edit"
                  ? "Save Changes"
                  : "Share Story"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
