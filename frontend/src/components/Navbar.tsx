"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const brandColor = "#004d57";

  // Səhifə hər dəfə yüklənəndə və ya yol dəyişəndə girişi yoxla
  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userStatus === "true");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-5 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-3xl font-black italic tracking-tighter uppercase" style={{ color: brandColor }}>
          EDUJ<span className="text-teal-400">.</span>
        </Link>

        {/* SAĞ TƏRƏF */}
        <div className="flex items-center gap-6">
          <Link href="/my-learning" className="hidden md:block text-[11px] font-black uppercase italic text-gray-400 hover:text-black tracking-widest">
            My Learning
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
              <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#004d57] hover:scale-105 transition-transform">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User Avatar"
                  className="w-full h-full object-cover" 
                />
              </Link>
              <button 
                onClick={handleLogout}
                className="text-[10px] font-black uppercase italic text-red-500 hover:text-red-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              style={{ backgroundColor: brandColor }}
              className="text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase italic shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}