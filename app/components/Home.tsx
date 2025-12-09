// app/page.tsx
'use client';

import PostCard from './components/PostCard';

export default function Home() {
  return <PostCard />; // ❌ no "post" prop passed
}