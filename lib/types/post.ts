export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_url: string | null;
  tags: string[] | null;
  published_at: string | null;
  read_time_minutes: number | null;
}