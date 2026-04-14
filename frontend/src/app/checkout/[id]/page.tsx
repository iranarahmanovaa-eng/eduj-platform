"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [deviceType, setDeviceType] = useState<"apple" | "google">("google");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const brandColor = "#004d57";

  useEffect(() => {
    // Detect OS for Apple/Google Pay
    const isApple = /Mac|iPhone|iPod|iPad/.test(navigator.userAgent);
    setDeviceType(isApple ? "apple" : "google");
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-100 pb-10">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: brandColor }}>Checkout</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Secure Academic Enrollment</p>
          </div>
          <Link href={`/course/${params.id}`} className="text-[10px] font-black uppercase italic text-gray-400 hover:text-black transition-all">
            Cancel and Return
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: PAYMENT & BILLING */}
          <div className="flex-1 space-y-8">
            
            {/* 01. BILLING ADDRESS */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xs font-black uppercase italic text-gray-400 mb-6 flex items-center gap-2">
                 <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-500">1</span>
                 Billing Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase italic text-gray-400 ml-2">Country</label>
                  <select className="w-full p-4 rounded-xl border border-gray-200 font-bold outline-none appearance-none bg-gray-50 focus:border-[#004d57]">
                    <option>Poland</option>
                    <option>Azerbaijan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase italic text-gray-400 ml-2">State / Province</label>
                  <input type="text" placeholder="Required" className="w-full p-4 rounded-xl border border-gray-200 font-bold bg-gray-50 focus:border-[#004d57] outline-none" />
                </div>
              </div>
            </section>

            {/* 02. PAYMENT SELECTION */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xs font-black uppercase italic text-gray-400 mb-6 flex items-center gap-2">
                 <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-500">2</span>
                 Payment Method
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Credit Card */}
                <div 
                  onClick={() => setPaymentMethod("card")} 
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${paymentMethod === 'card' ? "border-[#004d57] bg-teal-50/20" : "border-gray-50 bg-gray-50/30 hover:bg-gray-50"}`}
                >
                  <span className="font-black text-xs italic uppercase tracking-tighter">💳 Credit / Debit Card</span>
                  <div className="flex gap-2">
                    <span className="text-[8px] bg-white px-2 py-1 border rounded font-black">VISA</span>
                    <span className="text-[8px] bg-white px-2 py-1 border rounded font-black">MASTERCARD</span>
                  </div>
                </div>

                {/* Mobile Pay (Dynamic) */}
                <div 
                  onClick={() => setPaymentMethod("mobile")} 
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${paymentMethod === 'mobile' ? "border-[#004d57] bg-teal-50/20" : "border-gray-50 bg-gray-50/30 hover:bg-gray-50"}`}
                >
                  <span className="font-black text-xs italic uppercase tracking-tighter">
                    {deviceType === "apple" ? " Apple Pay" : "🤖 Google Pay"}
                  </span>
                  <span className="text-[10px] opacity-40">Express Checkout</span>
                </div>

                {/* BLIK */}
                <div 
                  onClick={() => setPaymentMethod("blik")} 
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${paymentMethod === 'blik' ? "border-[#004d57] bg-teal-50/20" : "border-gray-50 bg-gray-50/30 hover:bg-gray-50"}`}
                >
                  <span className="font-black text-xs italic uppercase tracking-tighter">🔢 BLIK Code</span>
                  <span className="text-[10px] opacity-40">Instant Mobile Bank</span>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE: SUMMARY & ACTION */}
          <div className="lg:w-[400px]">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 sticky top-10">
              <h3 className="text-xs font-black uppercase italic text-gray-400 mb-8 tracking-widest text-center">Summary</h3>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold italic">Original Price</span>
                  <span className="font-black text-gray-400 line-through">$89.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold italic">Student Discount</span>
                  <span className="font-black text-teal-600">-$50.00</span>
                </div>
                <div className="h-px bg-gray-50 my-6"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase italic text-gray-400 tracking-tighter">Total Due</span>
                  <span className="text-4xl font-black italic tracking-tighter" style={{ color: brandColor }}>$39.99</span>
                </div>
              </div>

              <div className="bg-teal-50/50 p-6 rounded-2xl mb-10 border border-teal-100">
                <p className="text-[10px] leading-relaxed text-teal-900 italic font-bold uppercase tracking-tighter">
                  Start your transformation today. This is a one-time purchase with lifetime updates.
                </p>
              </div>

              <button 
                onClick={() => alert("Redirecting to Secure Gateway...")}
                style={{ backgroundColor: brandColor }}
                className="w-full text-white py-6 rounded-2xl font-black italic uppercase text-lg shadow-xl hover:translate-y-[-4px] active:scale-95 transition-all"
              >
                Complete Enrollment
              </button>

              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
                  🔒 Encrypted Payment System
                </p>
                <div className="flex gap-4 grayscale opacity-30">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-2" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-4" alt="Mastercard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}