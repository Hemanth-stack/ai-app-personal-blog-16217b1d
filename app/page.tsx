import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, PenSquare, Rss } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PostCard from './components/PostCard';
import { mockPosts } from '@/lib/mock/posts';
import type { Post } from '@/lib/types/post';

async function fetchPosts(): Promise<Post[]> {
  const hasSupabaseEnv: boolean =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!hasSupabaseEnv) {
    return mockPosts;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from<Post>('posts')
    .select('id, title, slug, excerpt, cover_url, tags, published_at, read_time_minutes')
    .order('published_at', { ascending: false });

  if (error) {
    return mockPosts;
  }

  return data && data.length > 0 ? data : mockPosts;
}

function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-32 w-full rounded-t-2xl bg-slate-100" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 rounded bg-slate-100" />
            <div className="h-5 w-3/4 rounded bg-slate-100" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-slate-100" />
              <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function PostsSection() {
  try {
    const posts = await fetchPosts();

    if (!posts.length) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <PenSquare className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No posts published yet</h3>
          <p className="mt-2 max-w-lg text-sm text-slate-600">
            Create your first post in Supabase by adding rows to the <strong>posts</strong> table.
            Each post should include a title, slug, excerpt, and optional cover image, tags, and
            publication date.
          </p>
          <Link
            href="https://app.supabase.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Open Supabase
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  } catch (error: unknown) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800"
      >
        {error instanceof Error ? error.message : 'Failed to load posts. Please try again later.'}
      </div>
    );
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm ring-1 ring-blue-100">
              <BookOpen className="h-4 w-4" aria-hidden />
              Personal Blog
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Thoughts on building, learning, and shipping
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Deep dives on engineering, product, and the tools I use every day. Expect practical
              how-tos, lessons learned, and a few bold opinions.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="#posts"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Read the latest
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="mailto:hello@example.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Say hello
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="posts" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Latest</p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Recent posts</h2>
            <p className="text-sm text-slate-600">Freshly written insights and tutorials.</p>
          </div>
          <Link
            href="/rss.xml"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <Rss className="h-4 w-4 text-amber-500" aria-hidden />
            RSS Feed
          </Link>
        </div>

        <Suspense fallback={<PostsSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <PostsSection />
        </Suspense>
      </section>
    </main>
  );
}