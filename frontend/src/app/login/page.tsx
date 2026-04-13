"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg("Error: " + error.message);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="rounded-xl block w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-[#9e2a5e] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="rounded-xl block w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-[#9e2a5e] outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#9e2a5e] text-white font-bold rounded-xl hover:bg-[#86214f] transition-all disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Log In"}
          </button>

          {errorMsg && <p className="text-red-500 text-center text-sm font-medium">{errorMsg}</p>}
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <Link href="/signup" className="font-bold text-[#9e2a5e]">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}