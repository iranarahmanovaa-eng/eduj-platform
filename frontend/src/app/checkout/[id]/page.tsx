"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [plan, setPlan] = useState("lifetime");
  const [processing, setProcessing] = useState(false);
  const [deviceType, setDeviceType] = useState<"apple" | "google">("google");

  useEffect(() => {
    // Cihazı yoxlayırıq (Apple yoxsa digərləri)
    const isApple = /Mac|iPhone|iPod|iPad/.test(navigator.userAgent);
    setDeviceType(isApple ? "apple" : "google");

    const fetchCourse = async () => {
      const { data } = await supabase.from("courses").select("*").eq("id", id).single();
      if (data) setCourse(data);
      setLoading(false);
    };
    if (id) fetchCourse();
  }, [id]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      alert("✅ Order confirmed! Access granted.");
      router.push(`/course/${id}`);
    }, 2500);
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06402B]"></div></div>;

  const price = plan === "lifetime" ? "49.99" : "14.99";

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight italic uppercase">Complete Your Order</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDE: Payment Methods */}
          <div className="flex-1 space-y-6">
            
            {/* Plan Selection */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-gray-800">
                <span className="w-6 h-6 bg-[#06402B] text-white rounded-full flex items-center justify-center text-[10px]">01</span>
                SELECT PLAN
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPlan("lifetime")}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${plan === "lifetime" ? "border-[#06402B] bg-green-50" : "border-gray-100 bg-gray-50 hover:bg-white"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Lifetime</span>
                    <span className="font-black text-[#06402B]">$49.99</span>
                  </div>
                  <p className="text-xs text-gray-500">Pay once, study forever</p>
                </div>
                <div 
                  onClick={() => setPlan("monthly")}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${plan === "monthly" ? "border-[#06402B] bg-green-50" : "border-gray-100 bg-gray-50 hover:bg-white"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Monthly</span>
                    <span className="font-black text-[#06402B]">$14.99</span>
                  </div>
                  <p className="text-xs text-gray-500">Full access for 30 days</p>
                </div>
              </div>
            </section>

            {/* Payment Options */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-gray-800">
                <span className="w-6 h-6 bg-[#06402B] text-white rounded-full flex items-center justify-center text-[10px]">02</span>
                PAYMENT METHOD
              </h2>

              {/* Card Option */}
              <div className={`p-5 rounded-2xl border-2 cursor-pointer ${paymentMethod === 'card' ? "border-[#06402B]" : "border-gray-100 bg-gray-50"}`} onClick={() => setPaymentMethod('card')}>
                <div className="flex justify-between items-center">
                  <span className="font-bold flex items-center gap-2">💳 Credit Card</span>
                  {paymentMethod === 'card' && <span className="text-[#06402B] text-xl">●</span>}
                </div>
                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-1">
                    <input type="text" placeholder="Card Number" className="w-full p-3 rounded-xl border bg-white outline-none focus:ring-1 focus:ring-[#06402B]" />
                    <div className="flex gap-3">
                      <input type="text" placeholder="MM/YY" className="w-1/2 p-3 rounded-xl border bg-white outline-none" />
                      <input type="text" placeholder="CVC" className="w-1/2 p-3 rounded-xl border bg-white outline-none" />
                    </div>
                  </div>
                )}
              </div>

              {/* Blik Option */}
              <div className={`p-5 rounded-2xl border-2 cursor-pointer ${paymentMethod === 'blik' ? "border-[#06402B]" : "border-gray-100 bg-gray-50"}`} onClick={() => setPaymentMethod('blik')}>
                <div className="flex justify-between items-center">
                  <span className="font-bold flex items-center gap-2">🔢 BLIK</span>
                </div>
                {paymentMethod === 'blik' && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-1">
                    <input type="text" maxLength={6} placeholder="6-digit BLIK code" className="w-full p-3 rounded-xl border bg-white text-center font-bold tracking-widest outline-none" />
                  </div>
                )}
              </div>

              {/* Apple or Google Pay Dynamic Option */}
              <div className={`p-5 rounded-2xl border-2 cursor-pointer ${paymentMethod === 'express' ? "border-[#06402B]" : "border-gray-100 bg-gray-50"}`} onClick={() => setPaymentMethod('express')}>
                <div className="flex justify-between items-center">
                  <span className="font-bold flex items-center gap-2">
                    {deviceType === 'apple' ? " Apple Pay" : "🤖 Google Pay"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE: Enhanced Summary */}
          <div className="lg:w-[420px]">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Summary</h2>
              
              {/* Course Info Block */}
              <div className="mb-6">
                <img src={course.image} className="w-full h-40 object-cover rounded-2xl mb-4 shadow-sm" />
                <h3 className="font-black text-xl text-[#06402B] mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {course.description}
                </p>
                <div className="bg-blue-50 p-4 rounded-xl text-[11px] text-blue-700 space-y-1">
                  <p>✅ Full Lifetime Access</p>
                  <p>✅ Certificate of Completion</p>
                  <p>✅ 24/7 Premium Support</p>
                </div>
              </div>

              <div className="space-y-3 py-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>List Price</span>
                  <span className="line-through">$99.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-3xl font-black text-[#06402B]">${price}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-[#06402B] text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#043020] transition-all active:scale-95 disabled:opacity-70 mt-4"
              >
                {processing ? "VERIFYING..." : "COMPLETE PURCHASE"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 italic">
                <span>🛡️ SSL Secure Payment</span>
                <span>•</span>
                <span>⭐ 4.9/5 Rating</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}