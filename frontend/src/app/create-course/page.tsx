"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const brandColor = "#004d57";

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from("courses").insert([{ title, description, image }]);
    
    if (error) alert(error.message);
    else {
      alert("🚀 Course Created Successfully!");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4" style={{color: brandColor}}>Create New Course</h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Instructor Dashboard</p>
        </header>

        <form onSubmit={handleCreate} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl space-y-8 border border-gray-100">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase italic text-gray-400 ml-2">Course Title</label>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced UI Design" 
              className="w-full p-5 rounded-2xl border bg-gray-50 outline-none focus:ring-1 text-lg font-bold" 
              style={{"--tw-ring-color": brandColor} as any} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase italic text-gray-400 ml-2">Description</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What will students learn?" 
              className="w-full p-5 rounded-2xl border bg-gray-50 outline-none focus:ring-1 font-medium" 
              style={{"--tw-ring-color": brandColor} as any} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase italic text-gray-400 ml-2">Thumbnail URL</label>
            <input 
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..." 
              className="w-full p-5 rounded-2xl border bg-gray-50 outline-none focus:ring-1" 
              style={{"--tw-ring-color": brandColor} as any} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{backgroundColor: brandColor}}
            className="w-full text-white py-6 rounded-2xl font-black italic uppercase shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {loading ? "PUBLISHING..." : "PUBLISH COURSE"}
          </button>
        </form>
      </div>
    </div>
  );
}