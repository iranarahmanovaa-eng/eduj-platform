"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseDetails() {
  const params = useParams();
  const id = params.id as string;
  
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]); 
  const [activeLesson, setActiveLesson] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Kursun məlumatlarını gətiririk
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      // 2. Bu kursa aid dərsləri gətiririk
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("order_index", { ascending: true });

      if (courseData) setCourse(courseData);
      
      if (lessonsData && lessonsData.length > 0) {
        setLessons(lessonsData);
        setActiveLesson(lessonsData[0]); 
      }
      setLoading(false);
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06402B]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h1>
        <Link href="/" className="bg-[#06402B] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#043020]">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="text-[#06402B] font-bold mb-6 inline-block hover:opacity-80">
        ← Back to Home
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol tərəf: Video Player və Kurs Məlumatı */}
        <div className="flex-1">
          <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative">
            {activeLesson ? (
              activeLesson.is_free ? (
                <iframe 
                  src={activeLesson.video_url} 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
                  <span className="text-6xl mb-4">🔒</span>
                  <h2 className="text-2xl font-bold mb-2">This lesson is locked</h2>
                  <p className="text-gray-400 mb-6">Purchase the course to unlock all lessons and premium materials.</p>
                  
                  {/* ÖDƏNİŞ SƏHİFƏSİNƏ KEÇİD DÜYMƏSİ */}
                  <Link 
                    href={`/checkout/${course.id}`}
                    className="bg-[#06402B] hover:bg-[#043020] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95"
                  >
                    Unlock Full Course
                  </Link>
                </div>
              )
            ) : (
              <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-50" />
            )}
          </div>

          <div className="mt-8">
            <h1 className="text-4xl font-black text-[#06402B] mb-4">{course.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* Sağ tərəf: Dərslərin Siyahısı */}
        <div className="w-full lg:w-1/3 bg-white border border-gray-100 rounded-3xl p-6 shadow-xl h-fit sticky top-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Course Content</h3>
          
          {lessons.length > 0 ? (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <button 
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all ${
                    activeLesson?.id === lesson.id 
                      ? "bg-[#06402B] text-white shadow-md" 
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {lesson.is_free ? "▶️" : "🔒"}
                    </span>
                    <span className="font-semibold">{lesson.title}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No lessons added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}