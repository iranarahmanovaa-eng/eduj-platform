"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const COURSE_DATA = {
  "1": { 
    title: "Programming from Scratch", 
    videoId: "dQw4w9WgXcQ", 
    teacher: "Irana Rahmanova",
    details: "Focus on Next.js fundamentals, folder structure, and interactive components."
  },
  "2": { 
    title: "Design Fundamentals", 
    videoId: "66vWv8-KndI", 
    teacher: "Rashad Aliyev",
    details: "Deep dive into Figma tools, layer management, and modern color theory."
  },
  "3": { 
    title: "Data Analytics", 
    videoId: "ua-CiDNNj30", 
    teacher: "Nigar Mammadova",
    details: "Core concepts of Big Data, data cleaning, and visual storytelling."
  }
};

export default function CourseVideoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setTimeout(() => { router.push("/login"); }, 2000);
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const course = COURSE_DATA[id as keyof typeof COURSE_DATA];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06402B]"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">Access Restricted 🛑</h2>
      <p className="mt-2 text-gray-500">Redirecting to Login page...</p>
    </div>
  );

  if (!course) return <div className="p-20 text-center text-[#06402B]">Course not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-[#06402B] hover:underline mb-8 font-bold">
        ← Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="relative pt-[56.25%] bg-black rounded-[2rem] overflow-hidden shadow-2xl">
            <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${course.videoId}`} frameBorder="0" allowFullScreen></iframe>
          </div>
          
          <div className="mt-8 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h1 className="text-3xl font-extrabold text-[#06402B]">{course.title}</h1>
            <div className="flex items-center mt-6 space-x-4">
              <div className="h-14 w-14 bg-[#06402B] rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                {course.teacher[0]}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Lead Instructor</p>
                <p className="text-xl font-bold text-gray-800">{course.teacher}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#06402B] mb-4 border-b pb-4">Course Info</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">"{course.details}"</p>
          </div>

          <div className="bg-gradient-to-br from-[#06402B] to-[#032015] p-8 rounded-[2rem] text-white shadow-xl">
            <h3 className="text-lg font-bold mb-1">Student: {user.email?.split('@')[0]}</h3>
            <p className="text-xs opacity-70 mb-6 italic">Enrolled Student</p>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-white w-1/3 h-full shadow-[0_0_10px_white]"></div>
            </div>
            <p className="text-[10px] mt-4 font-bold uppercase tracking-widest">33% Completed</p>
            <button className="w-full mt-8 bg-white text-[#06402B] py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all transform hover:-translate-y-1">
              Download Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}