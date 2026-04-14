"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const brandColor = "#004d57";

  useEffect(() => {
    setCourses([
      { id: "1", title: "Sıfırdan Proqramlaşdırma", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
      { id: "2", title: "Dizayn Əsasları", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
      { id: "3", title: "Data Analitika", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section style={{ backgroundColor: brandColor }} className="py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Master New Skills <br /> <span className="text-teal-300">Every Single Day.</span>
          </h1>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto font-medium">
            Join the premium community of learners and experts worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-[#004d57] px-8 py-4 rounded-2xl font-black uppercase italic shadow-xl">Get Started</button>
            <button className="border-2 border-white/30 px-8 py-4 rounded-2xl font-black uppercase italic hover:bg-white/10">View Pricing</button>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-2xl font-black italic uppercase mb-12 flex items-center gap-4">
          <span className="w-8 h-1" style={{ backgroundColor: brandColor }}></span>
          Popular Courses
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div key={course.id} className="group border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
              <img src={course.image} alt={course.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="p-8">
                <h3 className="text-xl font-black uppercase italic mb-4" style={{ color: brandColor }}>{course.title}</h3>
                <Link 
                  href={`/course/${course.id}`}
                  style={{ backgroundColor: brandColor }}
                  className="w-full block text-center text-white py-4 rounded-2xl font-black uppercase italic shadow-lg active:scale-95 transition-all"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}