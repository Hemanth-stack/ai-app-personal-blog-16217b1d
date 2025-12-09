import type { Post } from '@/lib/types/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js & Supabase',
    slug: 'getting-started-with-nextjs-supabase',
    excerpt:
      'Learn how to scaffold a full-stack Next.js app with Supabase for auth, database, and storage in under 15 minutes.',
    cover_url:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Supabase', 'Fullstack'],
    published_at: '2024-04-18T10:00:00.000Z',
    read_time_minutes: 6,
  },
  {
    id: '2',
    title: 'Ship Faster with a Design System',
    slug: 'ship-faster-with-a-design-system',
    excerpt:
      'Practical tips to create, document, and scale a lightweight design system with Tailwind CSS and React.',
    cover_url:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Design Systems', 'Tailwind', 'UI'],
    published_at: '2024-03-02T09:30:00.000Z',
    read_time_minutes: 8,
  },
  {
    id: '3',
    title: 'From Idea to MVP: A Lean Delivery Playbook',
    slug: 'from-idea-to-mvp-lean-delivery',
    excerpt:
      'A concise guide on validating ideas, prioritizing features, and shipping an MVP without burning out.',
    cover_url:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['Product', 'MVP', 'Process'],
    published_at: '2024-01-10T14:15:00.000Z',
    read_time_minutes: 7,
  },
];