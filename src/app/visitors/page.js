"use client";
import { useEffect, useState } from 'react';

export default function VisitorsPage() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function updateVisitorCount() {
      try {
        // POST request to increment
        const postRes = await fetch('/api/visitors', { method: 'POST' });
        if (!postRes.ok) {
          throw new Error(`POST /api/visitors failed: ${postRes.statusText}`);
        }

        // GET request to read updated count
        const getRes = await fetch('/api/visitors');
        if (!getRes.ok) {
          throw new Error(`GET /api/visitors failed: ${getRes.statusText}`);
        }

        const data = await getRes.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    }

    updateVisitorCount();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Ayomi Visitors Count
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for visiting our site!!!
        </p>
        <div className="bg-gray-100 rounded-full py-4 px-8 inline-block">
          <span className="text-4xl font-bold text-indigo-600">
            {visitorCount}
          </span>
          <span className="text-2xl font-medium text-gray-700 ml-2">
            Visitors
          </span>
        </div>
      </div>
    </div>
  );
}
