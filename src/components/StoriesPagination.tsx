import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  pageCount: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export default function StoriesPagination({
  page,
  pageCount,
  loading,
  onPrevious,
  onNext,
}: Props) {
  const prevDisabled = loading || page <= 1;
  const nextDisabled = loading || page >= pageCount;

  if (pageCount <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-10">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={prevDisabled}
            tabIndex={prevDisabled ? -1 : 0}
            onClick={(e) => {
              e.preventDefault();

              if (!prevDisabled) {
                onPrevious();
              }
            }}
            className={`
              rounded-full
              border border-[#E8DED5]
              bg-white
              text-[#76685E]
              transition
              hover:bg-[#F3EEE9]
              hover:text-[#4B3C2F]
              ${prevDisabled ? "pointer-events-none opacity-40" : ""}
            `}
          />
        </PaginationItem>

        <PaginationItem>
          <div
            aria-current="page"
            className="
              flex h-9 min-w-9 items-center justify-center
              rounded-full bg-[#4B3C2F] px-3
              text-sm font-medium text-white
            "
          >
            {page}
          </div>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : 0}
            onClick={(e) => {
              e.preventDefault();

              if (!nextDisabled) {
                onNext();
              }
            }}
            className={`
              rounded-full
              border border-[#E8DED5]
              bg-white
              text-[#76685E]
              transition
              hover:bg-[#F3EEE9]
              hover:text-[#4B3C2F]
              ${nextDisabled ? "pointer-events-none opacity-40" : ""}
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
