"use client";

import Link from "next/link";

export default function Footer() {
  const brandColor = "#004d57";

  return (
    <footer className="bg-[#1c1d1f] text-white pt-20 pb-10 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* UPPER FOOTER: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-sm font-medium">
          
          {/* COLUMN 1: ABOUT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-black italic uppercase tracking-widest mb-2" style={{ color: "#00a4b4" }}>About</h4>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">About Us</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Careers</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Contact Us</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Blog</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Investors</Link>
          </div>

          {/* COLUMN 2: EXPLORE */}
          <div className="flex flex-col gap-3">
            <h4 className="font-black italic uppercase tracking-widest mb-2" style={{ color: "#00a4b4" }}>Explore</h4>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Get the App</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Teach on Eduj</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Plans & Pricing</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Affiliates</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Help & Support</Link>
          </div>

          {/* COLUMN 3: BUSINESS */}
          <div className="flex flex-col gap-3">
            <h4 className="font-black italic uppercase tracking-widest mb-2" style={{ color: "#00a4b4" }}>For Business</h4>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Eduj for Business</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Corporate Training</Link>
          </div>

          {/* COLUMN 4: LEGAL */}
          <div className="flex flex-col gap-3">
            <h4 className="font-black italic uppercase tracking-widest mb-2" style={{ color: "#00a4b4" }}>Legal & Privacy</h4>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Accessibility Statement</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Privacy Policy</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Sitemap</Link>
            <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-all">Terms of Service</Link>
          </div>
        </div>

        {/* LOWER FOOTER: LOGO & COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-10 gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-3xl font-black italic tracking-tighter uppercase" style={{ color: "#00a4b4" }}>
              EDUJ<span className="text-white">.</span>
            </Link>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">© 2026 Eduj, Inc.</span>
          </div>

          <div className="flex items-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
            <button className="hover:text-white transition-all">Cookie Settings</button>
            <button className="flex items-center gap-2 border border-gray-600 px-4 py-2 rounded-sm hover:bg-white/5 transition-all text-white">
              <span>🌐</span> English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}