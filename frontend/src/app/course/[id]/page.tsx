"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const COURSE_DATA = {
  "1": {
    title: "Sıfırdan Proqramlaşdırma",
    teacher: "Irana Rahmanova",
    lessons: [
      { id: "l1", title: "01. Introduction (Free Preview)", videoId: "m_X6Rxh6y8E", isFree: true },
      { id: "l2", title: "02. Setting Up Environment", videoId: "66vWv8-KndI", isFree: false },
      { id: "l3", title: "03. Advanced Next.js Logic", videoId: "ua-CiDNNj30", isFree: false },
    ]
  },
  "2": {
    title: "Dizayn Əsasları",
    teacher: "Rashad Aliyev",
    lessons: [
      { id: "l1", title: "01. Design Thinking (Free Preview)", videoId: "66vWv8-KndI", isFree: true },
      { id: "l2", title: "02. Figma Basics", videoId: "m_X6Rxh6y8E", isFree: false },
    ]
  }
};

export default function CourseVideoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const course = COURSE_DATA[id as keyof typeof COURSE_DATA] || COURSE_DATA["1"];
  
  const [activeLesson, setActiveLesson] = useState(course.lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const brandColor = "#004d57";

  // Dərsi bitmiş kimi işarələmək funksiyası
  const toggleComplete = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const isCourseFinished = completedLessons.length === course.lessons.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <Link href="/" className="text-[10px] font-black uppercase italic mb-6 inline-block text-gray-400 hover:text-[#004d57]">
        ← Back to Browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Video Player Section */}
          {activeLesson.isFree ? (
            <div className="relative pt-[56.25%] bg-black rounded-[2rem] overflow-hidden shadow-2xl">
              <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${activeLesson.videoId}`} allowFullScreen></iframe>
            </div>
          ) : (
            <div className="relative pt-[56.25%] bg-gray-900 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-center p-10 border-4 border-dashed border-gray-800">
              <span className="text-6xl mb-6">🔒</span>
              <h2 className="text-white text-2xl font-black italic uppercase mb-4">Premium Lesson Locked</h2>
              <button onClick={() => router.push(`/checkout/${id}`)} style={{ backgroundColor: brandColor }} className="text-white px-10 py-4 rounded-2xl font-black italic uppercase shadow-xl hover:scale-105 transition-all">Buy Full Course</button>
            </div>
          )}

          <div className="mt-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter" style={{ color: brandColor }}>{activeLesson.title}</h1>
              <p className="text-gray-400 font-bold mt-2">Instructor: {course.teacher}</p>
            </div>
            
            {/* Dərsi Bitirdim Düyməsi */}
            <button 
              onClick={() => toggleComplete(activeLesson.id)}
              className={`px-6 py-3 rounded-xl font-black italic uppercase text-xs transition-all ${completedLessons.includes(activeLesson.id) ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
            >
              {completedLessons.includes(activeLesson.id) ? "✓ Completed" : "Mark as Finished"}
            </button>
          </div>
          
          {/* Bütün kurs bitəndə görünən böyük düymə */}
          {isCourseFinished && (
            <div className="mt-12 p-10 bg-green-50 rounded-[3rem] border-2 border-dashed border-green-200 text-center animate-bounce-slow">
              <span className="text-5xl mb-4 block">🏆</span>
              <h2 className="text-2xl font-black italic uppercase text-green-800 mb-2">Congratulations!</h2>
              <p className="text-green-600 font-bold text-sm mb-6 uppercase tracking-widest">You have mastered this course!</p>
              <button className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black italic uppercase shadow-xl hover:bg-green-700 transition-all">
                Claim My Certificate
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Lesson List with Checkmarks */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase italic tracking-widest text-gray-400 mb-4 px-2">Progress: {Math.round((completedLessons.length / course.lessons.length) * 100)}%</h3>
          <div className="space-y-3">
            {course.lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className={`w-full flex items-center gap-3 p-5 rounded-2xl border transition-all ${activeLesson.id === lesson.id ? "bg-teal-50 border-[#004d57]" : "bg-white border-gray-100"}`}
              >
                <input 
                  type="checkbox" 
                  checked={completedLessons.includes(lesson.id)}
                  onChange={() => toggleComplete(lesson.id)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
                <button
                  onClick={() => setActiveLesson(lesson)}
                  className="flex-1 text-left group"
                >
                  <span className={`text-[10px] font-black uppercase ${lesson.isFree ? "text-teal-600" : "opacity-40"}`}>{lesson.isFree ? "Free" : "Premium"}</span>
                  <p className={`font-bold text-sm transition-colors ${completedLessons.includes(lesson.id) ? "text-gray-400 line-through" : "text-gray-800"}`}>{lesson.title}</p>
                </button>
                <span className="text-lg opacity-30">{lesson.isFree ? "▶" : "🔒"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}