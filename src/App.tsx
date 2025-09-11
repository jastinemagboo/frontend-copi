import { useEffect, useState } from "react";
import { listPosts, createPost, deletePost, updatePost } from "@/api/posts";
import type { Post, CreatePostPayload, UpdatePostPayload } from "@/types/post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StoryCard from "@/components/StoryCard";
import StoryModal from "@/components/StoryModal";
import SearchBar from "@/components/SearchBar";
import { Loader2 } from "lucide-react";

const postsPerPage = 3;
const MIN_SWAP_MS = 400;

export default function Copi() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async (term = "", pageNum = 1) => {
    const startedAt = performance.now();
    try {
      setLoading(true);
      setErr(null);

      const offset = (pageNum - 1) * postsPerPage;
      const { posts, total } = await listPosts({
        limit: postsPerPage,
        offset,
        search: term || undefined,
      });

      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_SWAP_MS - elapsed);
      if (wait > 0) {
        await new Promise((r) => setTimeout(r, wait));
      }

      setPosts(Array.isArray(posts) ? posts : []);
      setTotalPosts(typeof total === "number" ? total : 0);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(searchTerm, page);
  }, [searchTerm, page]);

  const handleCreate = async (payload: CreatePostPayload) => {
    await createPost(payload);
    setPage(1);
    await fetchPosts(searchTerm, 1);
  };

  const handleUpdate = async (
    id: string | number,
    payload: UpdatePostPayload
  ) => {
    const updated = await updatePost(id, payload);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deletePost(id);
      fetchPosts();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete post");
    }
  };

  const pageCount = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const prevDisabled = loading || page <= 1;
  const nextDisabled = loading || page >= pageCount;

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden border-solid bg-[#EADBC8] p-6 text-[#4B3C2F]">
      <header className="fixed inset-x-0 top-0 z-40 bg-[#EADBC8]/80 backdrop-blur supports-[backdrop-filter]:bg-[#EADBC8]/60 border-b border-[#EADBC8]/60 pr-[var(--removed-body-scroll-bar-size)]">
        <div className="mx-auto max-w-3xl px-6 md:px-0 py-4 flex items-center justify-between gap-4">
          <h1 className="text-5xl font-extrabold drop-shadow">COPI</h1>
          <StoryModal onCreate={handleCreate} />
        </div>
      </header>

      <main className=" w-full max-w-3xl pt-15">
        <SearchBar
          loading={loading}
          onSearch={(term) => setSearchTerm(term)}
          delay={500}
          placeholder="Search your coffee stories…"
        />
        <div className="w-full max-w-3xl space-y-4">
          {loading && (
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <div className="relative flex items-center gap-2 ">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-[#4B3C2F]">Loading…</span>
              </div>
            </div>
          )}

          {err && (
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <div className="relative flex items-center gap-2 ">
                <span className="text-red-600">{err}</span>
              </div>
            </div>
          )}

          {!loading && !err && posts.length === 0 && (
            <div
              className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
              role="status"
              aria-live="polite"
            >
              <div className="relative pointer-events-auto flex flex-col items-center gap-2 text-center">
                {searchTerm.trim().length > 0 ? (
                  <>
                    <p className=" text-[#4B3C2F]">
                      No results found for{" "}
                      <span className="font-bold"> "{searchTerm.trim()}"</span>.
                    </p>
                    <p className="text-sm">Be the first to share!</p>
                  </>
                ) : (
                  <>
                    <span className="text-[#4B3C2F]">No posts yet.</span>
                    <p className="text-sm text-[#4B3C2F]/80">
                      Share your first coffee story!
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {!loading &&
            !err &&
            posts.map((post) => (
              <StoryCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
        </div>

        {!loading && totalPosts > 3 && (
          <Pagination className="flex flex-col items-end overflow-hidden py-6 w-full max-w-3xl">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={prevDisabled}
                  tabIndex={prevDisabled ? -1 : 0}
                  className={
                    prevDisabled
                      ? "rounded-full bg-white pointer-events-none opacity-50"
                      : "rounded-full bg-white"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (!prevDisabled) setPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>

              <div className="rounded-full bg-[#4B3C2F] m-2 py-2 px-4 text-sm text-white">
                {page}
              </div>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={nextDisabled}
                  tabIndex={nextDisabled ? -1 : 0}
                  className={
                    nextDisabled
                      ? "rounded-full bg-white pointer-events-none opacity-50"
                      : "rounded-full bg-white"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (!nextDisabled) setPage((p) => p + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
}
