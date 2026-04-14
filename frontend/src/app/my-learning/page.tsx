"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function MyLearningPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Şəkildəki rəngə ən yaxın kod: #003d4d və ya #004d57
  const brandColor = "#004d57"; 

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from("enrollments")
          .select("course_id");

        if (enrollmentError) throw enrollmentError;

        if (enrollmentData && enrollmentData.length > 0) {
          const courseIds = enrollmentData.map(e => e.course_id);
          const { data: coursesData, error: coursesError } = await supabase
            .from("courses")
            .select("*")
            .in("id", courseIds);

          if (coursesError) throw coursesError;
          setEnrolledCourses(coursesData || []);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderBottomColor: brandColor }}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans">
      {/* BRAND TEAL HEADER SECTION */}
      <header style={{ backgroundColor: brandColor }} className="text-white pt-14 pb-2 px-6 md:px-12 shadow-inner relative overflow-hidden">
        {/* Subtle Texture Overlay (Optional) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-black mb-10 tracking-tight italic uppercase">My Learning</h1>
          
          {/* NAVIGATION TABS */}
          <div className="flex gap-10 text-sm font-bold overflow-x-auto no-scrollbar whitespace-nowrap">
            <button 
              onClick={() => setActiveTab("all")}
              className={`pb-4 transition-all border-b-4 ${activeTab === 'all' ? 'border-white' : 'border-transparent text-teal-100/60 hover:text-white'}`}
            >
              All Courses
            </button>
            <button 
              onClick={() => setActiveTab("lists")}
              className={`pb-4 transition-all border-b-4 ${activeTab === 'lists' ? 'border-white' : 'border-transparent text-teal-100/60 hover:text-white'}`}
            >
              My Lists
            </button>
            <button 
              onClick={() => setActiveTab("wishlist")}
              className={`pb-4 transition-all border-b-4 ${activeTab === 'wishlist' ? 'border-white' : 'border-transparent text-teal-100/60 hover:text-white'}`}
            >
              Wishlist
            </button>
            <button 
              onClick={() => setActiveTab("certs")}
              className={`pb-4 transition-all border-b-4 ${activeTab === 'certs' ? 'border-white' : 'border-transparent text-teal-100/60 hover:text-white'}`}
            >
              Certifications
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        
        {activeTab === "certs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-gray-50/50" style={{ borderColor: `${brandColor}20` }}>
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: brandColor }}>No certificates yet</h3>
              <p className="text-gray-500 text-sm max-w-xs">Complete courses to unlock professional-grade certifications.</p>
            </div>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {enrolledCourses.map((course) => (
              <Link 
                key={course.id} 
                href={`/course/${course.id}`} 
                className="group flex flex-col cursor-pointer no-underline"
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video mb-4 overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-2xl">
                      <span style={{ color: brandColor }} className="text-xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

                {/* Course Metadata */}
                <h3 className="font-bold text-[16px] text-gray-900 leading-tight mb-1 line-clamp-2 h-10 group-hover:text-teal-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-[11px] text-gray-400 mb-3 font-black tracking-widest uppercase">Verified by EDUJ</p>

                {/* Progress Bar & Status */}
                <div className="mt-auto space-y-3">
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div style={{ backgroundColor: brandColor }} className="h-full w-[35%] transition-all duration-1000"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                    <span className="text-gray-400">35% Completed</span>
                    <span style={{ color: brandColor }}>Excellent Progress</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                    <span style={{ color: brandColor }} className="text-[11px] font-black italic">RESUME STUDY</span>
                    <span style={{ color: brandColor }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="text-8xl mb-8 opacity-10">📖</div>
            <h2 className="text-2xl font-black text-gray-300 mb-6 uppercase italic">Your Library is Waiting</h2>
            <Link href="/" style={{ backgroundColor: brandColor }} className="text-white px-10 py-4 rounded-2xl font-black hover:shadow-2xl transition-all inline-block uppercase italic">
              Explore All Courses
            </Link>
          </div>
        )}
      </main>

      {/* STRATEGIC REMINDER BANNER */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div style={{ backgroundColor: `${brandColor}08` }} className="border-2 border-dashed border-gray-100 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">🎯</div>
            <div className="text-center md:text-left">
              <h4 className="font-black text-xl mb-1 uppercase italic" style={{ color: brandColor }}>Master Your Habit</h4>
              <p className="text-gray-500 text-sm">Consistency builds mastery. Set your goal and stick to it.</p>
            </div>
          </div>
          <button style={{ backgroundColor: brandColor }} className="text-white px-8 py-4 rounded-2xl font-black text-xs hover:shadow-xl transition-all uppercase italic shrink-0">
            Set Daily Goal
          </button>
        </div>
      </footer>
    </div>
  );
}