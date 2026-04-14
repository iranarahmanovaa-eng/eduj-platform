"use client";

import Link from "next/link";

export default function SignupPage() {
  const brandColor = "#004d57";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
      <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl w-full max-w-xl border border-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3" style={{color: brandColor}}>Join Eduj.</h1>
          <p className="text-gray-400 font-medium">Start your journey with world-class experts.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-1" style={{"--tw-ring-color": brandColor} as any} />
            <input type="text" placeholder="Last Name" className="w-full p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-1" style={{"--tw-ring-color": brandColor} as any} />
          </div>
          <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-1" style={{"--tw-ring-color": brandColor} as any} />
          <input type="password" placeholder="Create Password" className="w-full p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-1" style={{"--tw-ring-color": brandColor} as any} />
          
          <button 
            type="submit"
            style={{backgroundColor: brandColor}}
            className="w-full text-white py-5 rounded-2xl font-black italic uppercase shadow-xl hover:opacity-95 transition-all active:scale-[0.98] mt-4"
          >
            Create Free Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-bold">
          ALREADY HAVE AN ACCOUNT? <Link href="/login" style={{color: brandColor}} className="underline ml-1">LOG IN</Link>
        </p>
      </div>
    </div>
  );
}