"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Success! Please check your email for the confirmation link.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-gray-500">Join our community and start learning</p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="rounded-xl block w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-[#9e2a5e] outline-none"
            onChange={(e) => setFullName(e.target.value)}
          />
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p className={`text-center text-sm font-medium ${message.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-bold text-[#9e2a5e]">Log In</Link>
        </p>
      </div>
    </div>
  );
}