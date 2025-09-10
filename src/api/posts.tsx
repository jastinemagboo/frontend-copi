import { api } from "./client";
import type {
  Post,
  PostsWithTotal,
  CreatePostPayload,
  UpdatePostPayload,
} from "@/types/post";

export async function listPosts(
  params: { limit?: number; offset?: number; search?: string } = {}
): Promise<PostsWithTotal> {
  const res = await api.get<PostsWithTotal>("/api/posts", { params });

  return {
    posts: Array.isArray(res.data.posts) ? res.data.posts : [],
    total: res.data.total,
  };
}

// POST /api/posts
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const { data } = await api.post<Post>("/api/posts", payload);
  return data;
}

// PATCH /api/posts/:id
export async function updatePost(
  id: number | string,
  payload: UpdatePostPayload
): Promise<Post> {
  const { data } = await api.patch<Post | Post[]>(`/api/posts/${id}`, payload);
  return Array.isArray(data) ? data[0] : data;
}

// DELETE /api/posts/:id
export async function deletePost(id: number | string): Promise<Post> {
  const { data } = await api.delete<Post>(`/api/posts/${id}`);
  return data;
}
