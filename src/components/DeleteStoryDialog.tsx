import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader, Trash } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyTitle: string;
  onDelete: () => Promise<void> | void;
};

export default function DeleteStoryDialog({
  open,
  onOpenChange,
  storyTitle,
  onDelete,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setDeleting(true);
      await onDelete();
      onOpenChange(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          w-[92vw]
          max-w-md
          rounded-3xl
          border-[#E8DED5]
          bg-[#F9F5F1]
          p-6
          shadow-2xl
          sm:p-8
        "
      >
        <AlertDialogHeader>
          <div
            className="
              mx-auto
              mb-3
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <Trash className="h-5 w-5" />
          </div>

          <AlertDialogTitle className="text-center text-xl font-bold text-[#4B3C2F]">
            Delete this story?
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 text-center leading-6 text-[#76685E]">
            You're about to permanently remove{" "}
            <span className="font-medium text-[#4B3C2F]">“{storyTitle}”</span>
            .
            <br />
            <br />
            If this isn't your story, consider letting it stay. Every story
            shared here comes from someone's own little moment with coffee — and
            it might mean something to someone else, too.
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row">
          <AlertDialogCancel
            disabled={deleting}
            className="
              h-10
              w-full
              rounded-full
              border-[#DCCFC3]
              text-[#4B3C2F]
              hover:bg-[#F1EBE5]
              hover:text-[#4B3C2F]
              sm:w-auto
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleting}
            onClick={handleDelete}
            className="
              h-10
              w-full
              rounded-full
              bg-red-600
              text-white
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            {deleting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete Story"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
