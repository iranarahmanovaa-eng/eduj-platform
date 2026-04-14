"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Sidebar navigation items based on the image provided
const NAV_ITEMS = [
  { name: "Public profile", href: "#", active: true },
  { name: "Profile", href: "#" },
  { name: "Photo", href: "#" },
  { name: "Account Security", href: "#" },
  { name: "Subscriptions", href: "#" },
  { name: "Payment methods", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Notification settings", href: "#" },
  { name: "API clients", href: "#" },
  { name: "Close account", href: "#", danger: true },
];

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const brandColor = "#004d57";

  // Retain your login check from previous steps
  useEffect(() => {
    const user = localStorage.getItem("isLoggedIn");
    if (user !== "true") {
      router.push("/login");
    } else {
      setMounted(true);
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* LEFT SIDE: AVATAR & SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col items-center">
          {/* RETAINING YOUR AVATAR */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          <p className="font-black text-xl italic uppercase tracking-tighter mb-10" style={{ color: brandColor }}>
            Felix
          </p>

          <nav className="w-full space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`w-full block px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                  item.active 
                    ? "bg-gray-100 font-bold" 
                    : item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
                style={item.active ? { color: brandColor } : {}}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* RIGHT SIDE: EDIT PROFILE FORM */}
        <main className="flex-1">
          {/* Header */}
          <div className="border-b border-gray-100 pb-10 mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: brandColor }}>
              Public Profile
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Add information about yourself</p>
          </div>

          <form className="space-y-10 max-w-4xl">
            {/* Section 1: Basic Info */}
            <section className="space-y-6">
              <h2 className="text-xs font-black uppercase italic text-gray-400 tracking-widest">Basics</h2>
              
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">First Name</label>
                <input type="text" placeholder="Your first name" className="w-full p-4 rounded-xl border border-gray-200 font-medium bg-gray-50 focus:border-[#004d57] outline-none" />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Last Name</label>
                <input type="text" placeholder="Your last name" className="w-full p-4 rounded-xl border border-gray-200 font-medium bg-gray-50 focus:border-[#004d57] outline-none" />
              </div>
              
              <div className="space-y-1 relative">
                <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Headline</label>
                <input type="text" maxLength={60} placeholder="e.g., 'Professional Software Engineer'" className="w-full p-4 pr-16 rounded-xl border border-gray-200 font-medium bg-gray-50 focus:border-[#004d57] outline-none" />
                <span className="absolute right-4 bottom-4 text-xs font-bold text-gray-400">60</span>
              </div>

              {/* Biography with custom color emphasis */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Biography</label>
                <textarea rows={6} placeholder="Describe your background, skills, and interests..." className="w-full p-4 rounded-xl border border-gray-200 font-medium bg-gray-50 focus:border-[#004d57] outline-none resize-none"></textarea>
                <p className="text-[10px] leading-relaxed text-gray-500 italic font-medium mt-2 px-2">
                  <span style={{color: brandColor}} className="font-bold">Important:</span> Biography should be limited to <span style={{color: brandColor}} className="font-bold">links</span>. It should be at least <span style={{color: brandColor}} className="font-bold">50</span> words.
                </p>
              </div>

              <div className="space-y-1 relative">
                <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Language</label>
                <select className="w-full p-4 rounded-xl border border-gray-200 font-bold outline-none appearance-none bg-gray-50 focus:border-[#004d57]">
                  <option>English (US)</option>
                  <option>Azerbaijani</option>
                  <option>Polish</option>
                </select>
                <span className="absolute right-4 bottom-4 text-gray-400 text-sm">▼</span>
              </div>
            </section>

            {/* Section 2: Links */}
            <section className="space-y-6">
              <h2 className="text-xs font-black uppercase italic text-gray-400 tracking-widest">Links</h2>
              
              <div className="space-y-1 relative">
                <input type="text" placeholder="Website (http://...)" className="w-full p-4 rounded-xl border border-gray-200 font-medium bg-gray-50 focus:border-[#004d57] outline-none" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-1 border border-gray-100 rounded-xl p-1 bg-gray-50 shadow-inner">
                    <span className="p-3 text-xs font-black uppercase italic text-gray-400 border-r border-gray-100 tracking-tight">facebook.com/</span>
                    <input type="text" placeholder="username" className="flex-1 p-3 rounded-xl border-gray-200 font-medium bg-white focus:border-[#004d57] outline-none" />
                </div>
                <div className="flex items-center gap-1 border border-gray-100 rounded-xl p-1 bg-gray-50 shadow-inner">
                    <span className="p-3 text-xs font-black uppercase italic text-gray-400 border-r border-gray-100 tracking-tight">instagram.com/</span>
                    <input type="text" placeholder="username" className="flex-1 p-3 rounded-xl border-gray-200 font-medium bg-white focus:border-[#004d57] outline-none" />
                </div>
              </div>

              <div className="space-y-1 relative">
                <div className="flex items-center gap-1 border border-gray-100 rounded-xl p-1 bg-gray-50 shadow-inner">
                    <span className="p-3 text-xs font-black uppercase italic text-gray-400 border-r border-gray-100 tracking-tight">linkedin.com/in/</span>
                    <input type="text" placeholder="your-public-profile-url" className="flex-1 p-3 rounded-xl border-gray-200 font-medium bg-white focus:border-[#004d57] outline-none" />
                </div>
              </div>
            </section>

            {/* Save Button with Brand Styling */}
            <div className="pt-10 border-t border-gray-100 flex justify-center md:justify-start">
              <button 
                style={{ backgroundColor: brandColor }}
                className="text-white px-12 py-5 rounded-2xl font-black italic uppercase text-lg shadow-xl hover:translate-y-[-4px] active:scale-95 transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}