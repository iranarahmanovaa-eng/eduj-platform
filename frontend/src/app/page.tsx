"use client";

import { useState } from "react";
import Link from "next/link";

const ALL_COURSES = [
  {
    id: "1",
    title: "Programming from Scratch",
    description: "Build modern websites with Next.js and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  },
  {
    id: "2",
    title: "Design Fundamentals",
    description: "Master user interface design using Figma.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
  },
  {
    id: "3",
    title: "Data Analytics",
    description: "Analyze and visualize data like a professional.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536ad89?w=500&q=80",
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = ALL_COURSES.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header & Search Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-[#06402B] mb-6 tracking-tight">
          What will you learn today?
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for courses (e.g. Design, Data...)"
            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-8 text-lg shadow-xl focus:outline-none focus:border-[#06402B] transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-4 text-gray-400">
             🔍
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 px-2">
        {searchTerm ? `Results for "${searchTerm}"` : "Popular Courses"}
      </h2>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase text-[#06402B] tracking-widest">
                  Best Seller
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#06402B] mb-3">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">{course.description}</p>
                <Link 
                  href={`/course/${course.id}`}
                  className="inline-block w-full text-center bg-[#06402B] text-white py-4 rounded-2xl font-bold hover:bg-[#043020] transition-all shadow-lg active:scale-95"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-xl font-medium">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}