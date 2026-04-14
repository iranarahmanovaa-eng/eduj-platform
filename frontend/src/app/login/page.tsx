"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const brandColor = "#004d57";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giriş simulyasiyası
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      // Girişdən sonra birbaşa profilə atırıq
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: brandColor }}>
            Welcome Back
          </h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">Access your premium courses</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@example.com" 
              className="w-full p-5 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all font-bold" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase italic text-gray-400 ml-4">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••" 
              className="w-full p-5 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all font-bold" 
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{ backgroundColor: brandColor }}
            className="w-full text-white py-6 mt-6 rounded-2xl font-black uppercase italic text-sm shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In to Eduj"}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] text-gray-400 font-black uppercase tracking-widest">
          New here? 
          <Link href="/signup" style={{color: brandColor}} className="ml-2 underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}