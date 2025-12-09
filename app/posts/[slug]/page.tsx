export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { mockPosts } from '@/lib/mock/posts';
import type { Post } from '@/lib/types/post';

interface PostPageProps {
  params: {
    slug: string;
  };
}

const formatDate = (value: string | null): string => {
  if (!value) {
    return 'Unpublished';
  }
  try {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
  } catch {
    return value;
  }
};

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const hasSupabaseEnv: boolean =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!hasSupabaseEnv) {
    return mockPosts.find((post) => post.slug === slug) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from<Post>('posts')
    .select('id, title, slug, excerpt, cover_url, tags, published_at, read_time_minutes')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    return mockPosts.find((post) => post.slug === slug) ?? null;
  }

  if (data) {
    return data;
  }

  return mockPosts.find((post) => post.slug === slug) ?? null;
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await fetchPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    const {
      title,
      excerpt,
      cover_url: coverUrl,
      tags,
      published_at: publishedAt,
      read_time_minutes: readTimeMinutes,
    } = post;

    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to posts
            </Link>
          </div>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {coverUrl ? (
              <div className="relative h-64 w-full bg-slate-100 sm:h-80">
                <img
                  src={coverUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-slate-100 sm:h-64">
                <span className="text-4xl font-semibold text-slate-400">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <span className="rounded-full bg-blue-50 px-3 py-1">Personal Blog</span>
                {tags &&
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      <Tag className="h-3.5 w-3.5" aria-hidden />
                      {tag}
                    </span>
                  ))}
              </div>

              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden />
                  <span>{formatDate(publishedAt)}</span>
                </div>
                {typeof readTimeMinutes === 'number' && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" aria-hidden />
                    <span>{readTimeMinutes} min read</span>
                  </div>
                )}
              </div>

              <p className="text-base leading-relaxed text-slate-700">{excerpt}</p>

              <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                <p>
                  This is a placeholder for the full post content. Connect Supabase and add a
                  <code className="mx-1 rounded bg-white px-1 py-0.5 text-[11px] font-mono text-slate-800">
                    content
                  </code>
                  column to the <strong>posts</strong> table to render full articles here.
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    );
  } catch (error: unknown) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 shadow-sm">
          <p className="font-semibold">Failed to load the post.</p>
          <p className="mt-2">
            {error instanceof Error ? error.message : 'Please try again or go back to the homepage.'}
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Go home
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="inline-flex items-center justify-center rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }
}