import { useCallback, useEffect, useState } from "react";

import { listPosts, createPost, deletePost, updatePost } from "@/api/posts";

import type { Post, CreatePostPayload, UpdatePostPayload } from "@/types/post";

import StoryCard from "@/components/StoryCard";
import SearchBar from "@/components/SearchBar";
import CoffeeHero from "@/components/CoffeeHero";
import EmptyStories from "@/components/EmptyStories";
import StoriesPagination from "@/components/StoriesPagination";

const postsPerPage = 3;
const MIN_SWAP_MS = 400;

export default function Home() {
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
        await new Promise((resolve) => setTimeout(resolve, wait));
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

    await fetchPosts(searchTerm, page);

    setTimeout(() => {
      document.getElementById("stories")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleUpdate = async (
    id: string | number,
    payload: UpdatePostPayload,
  ) => {
    const updated = await updatePost(id, payload);

    setPosts((prev) => prev.map((post) => (post.id === id ? updated : post)));
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deletePost(id);
      await fetchPosts(searchTerm, page);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete post");
    }
  };

  const handleSearch = useCallback((term: string) => {
    setPage(1);
    setSearchTerm(term);
  }, []);

  const pageCount = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#3E3027]">
      <main id="top">
        {/* HERO */}
        <CoffeeHero onCreate={handleCreate} />

        {/* STORIES */}
        <section
          id="stories"
          className="scroll-mt-16 border-t border-[#E8E0D8] bg-[#FCFAF7]"
        >
          <div className="mx-auto max-w-4xl px-6 py-20">
            {/* SECTION HEADER */}
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5E3C]">
                Community
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#3E3027] sm:text-4xl">
                Coffee Stories
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#76685E]">
                Stories shared over a cup of coffee.
              </p>
            </div>

            {/* SEARCH */}
            <div className="mb-8">
              <SearchBar
                loading={loading}
                onSearch={handleSearch}
                delay={500}
                placeholder="Search your coffee stories…"
              />
            </div>

            {/* ERROR */}
            {err && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
                {err}
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && !err && posts.length === 0 && (
              <EmptyStories searchTerm={searchTerm} onCreate={handleCreate} />
            )}

            {/* STORIES */}
            <div className="space-y-5">
              {loading
                ? Array.from({ length: postsPerPage }).map((_, i) => (
                    <StoryCard
                      key={`sk-${i}`}
                      post={{} as Post}
                      isLoading
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  ))
                : !err &&
                  posts.map((post) => (
                    <StoryCard
                      key={post.id}
                      post={post}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  ))}
            </div>

            {/* PAGINATION */}
            {!loading && totalPosts > postsPerPage && (
              <StoriesPagination
                page={page}
                pageCount={pageCount}
                loading={loading}
                onPrevious={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(p + 1, pageCount))}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
