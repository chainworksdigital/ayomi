// app/page.jsx (or any client component)
"use client";
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function updateVisitorCount() {
      // Increment the counter on visit
      await fetch('/api/visitors', { method: 'POST' });
      // Fetch the updated count
      const res = await fetch('/api/visitors');
      const data = await res.json();
      setVisitorCount(data.count);
    }
    updateVisitorCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="mt-4 text-2xl">Visitor Count: {visitorCount}</p>
    </div>
  );
}
