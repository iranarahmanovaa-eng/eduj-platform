"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-black text-[#06402B] tracking-tighter">
          EDUJ.
        </Link>

        {/* AUTH BUTTONS */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-sm font-bold text-[#06402B] hidden sm:block">
                Hello, {user.email.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-[#06402B]">
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-[#06402B] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#043020] transition-all shadow-lg shadow-green-100"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}