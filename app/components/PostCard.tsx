import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import type { FC } from 'react';
import type { Post } from '@/lib/types/post';

interface PostCardProps {
  post: Post;
}

const formatDate = (value: string | null): string => {
  if (!value) {
    return 'Unpublished';
  }
  try {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const firstLetter = (value: string): string => (value ? value.charAt(0).toUpperCase() : '?');

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { title, excerpt, slug, cover_url: coverUrl, tags, published_at: publishedAt, read_time_minutes: readTimeMinutes } =
    post;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus:outline-none">
      <div className="relative h-40 w-full bg-gradient-to-br from-slate-100 via-slate-50 to-white">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <span className="text-3xl font-semibold text-slate-500">{firstLetter(title)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          {typeof readTimeMinutes === 'number' && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{readTimeMinutes} min read</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            <Link
              href={`/posts/${slug}`}
              className="inline-flex items-start gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={`Read post: ${title}`}
            >
              <span>{title}</span>
              <ArrowUpRight className="h-4 w-4 text-blue-600 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </h3>
          <p className="text-sm text-slate-600">{excerpt}</p>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;