"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);

    const { error } = await supabase
      .from("courses")
      .insert([{ title, description, image }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("🎉 Course successfully created!");
      router.push("/"); 
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[#06402B] font-bold mb-8 inline-block hover:opacity-80 transition-opacity">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12">
          <h1 className="text-4xl font-black text-[#06402B] mb-2 tracking-tight">
            Create a New Course
          </h1>
          <p className="text-gray-500 mb-8">Fill in the details below to add a new course to your platform.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Advanced React Patterns"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:bg-white transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                required
                rows={4}
                placeholder="What will students learn in this course?"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:bg-white transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:bg-white transition-all"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#06402B] text-white py-4 rounded-xl font-bold hover:bg-[#043020] transition-all shadow-lg active:scale-95 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                "Publish Course"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}