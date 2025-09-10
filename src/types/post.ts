export interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string | null;
}

export type PostsWithTotal = {
  posts: Post[];
  total: number;
};

export interface CreatePostPayload {
  title: string;
  content: string;
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
}
