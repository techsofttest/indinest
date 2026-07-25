"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#010526] font-serif">
      <Header />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-16">
        {/* Banner with bg image */}
        <div className="relative w-full h-48 md:h-64 bg-[#010526]/10 overflow-hidden rounded-sm shadow-sm">
          <Image
            src="/banner/b4.jpg"
            alt="Contact Us Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#010526]/40 backdrop-blur-[1px] flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold">IndiNest Maison</span>
              <h1 className="text-3xl md:text-5xl uppercase tracking-widest font-light mt-1 drop-shadow-sm">
                Get In Touch
              </h1>
            </div>
          </div>
        </div>

        {/* Section 1: Contact Details */}
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl uppercase tracking-widest font-light text-[#010526]">
              Our Maisons
            </h2>
            <div className="w-12 h-[1px] bg-[#010526]/30 mx-auto mt-3" />
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">
            {/* Image to Left */}
            <div className="w-full md:w-[45%] relative aspect-[4/3] bg-[#010526]/5 overflow-hidden shadow-md rounded-sm">
              <Image
                src="/boutique_showroom.png"
                alt="Flagship Boutique Room"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Contact Details on Right */}
            <div className="w-full md:w-[55%] flex flex-col gap-6 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mumbai */}
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#010526]/75 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#010526] uppercase tracking-wider">
                      Flagship Boutique - Mumbai
                    </h3>
                    <p className="text-xs text-[#010526]/65 mt-1 leading-relaxed">
                      18 Colaba Causeway, Colaba, Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                {/* London */}
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#010526]/75 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#010526] uppercase tracking-wider">
                      Private Salon - London
                    </h3>
                    <p className="text-xs text-[#010526]/65 mt-1 leading-relaxed">
                      42 Bond Street, Mayfair, London W1S 2AA
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#010526]/10 my-1" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="text-[#010526]/75 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-[10px] text-[#010526]/50 uppercase tracking-widest">Phone & WhatsApp</p>
                    <p className="text-xs text-[#010526] font-semibold mt-0.5">
                      +91 22 2202 1947 &nbsp;|&nbsp; +44 20 7946 0958
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-[#010526]/75 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-[10px] text-[#010526]/50 uppercase tracking-widest">Email Enquiries</p>
                    <p className="text-xs text-[#010526] font-semibold mt-0.5">
                      concierge@indinest.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-[#010526]/75 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-[10px] text-[#010526]/50 uppercase tracking-widest">Salon Hours</p>
                  <p className="text-xs text-[#010526]/70 mt-0.5">
                    Monday – Saturday: 11:00 AM – 8:00 PM <br />
                    Sunday: By Private Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Form */}
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl uppercase tracking-widest font-light text-[#010526]">
              Bespoke Enquiries
            </h2>
            <div className="w-12 h-[1px] bg-[#010526]/30 mx-auto mt-3" />
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-stretch">
            {/* Contact Form on Left */}
            <div className="w-full md:w-[60%] flex flex-col justify-center rounded-sm">
              {formSubmitted ? (
                <div className="flex flex-col items-center text-center justify-center py-10 animate-fade-in">
                  <CheckCircle2 size={48} className="text-emerald-600 mb-4" />
                  <h3 className="text-xl uppercase tracking-widest font-light text-[#010526] mb-2">
                    Enquiry Sent
                  </h3>
                  <p className="text-xs font-sans text-[#010526]/60 max-w-xs leading-relaxed mb-6">
                    Our luxury client concierge will get in touch with you within the next 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        type: "General Inquiry",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 border border-[#010526]/30 text-[#010526] text-xs font-bold uppercase tracking-widest hover:bg-[#010526]/5 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>Submit Another</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#010526]/60">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#010526]/20 text-xs outline-none text-[#010526] focus:border-[#010526] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-[#010526]/60">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#010526]/20 text-xs outline-none text-[#010526] focus:border-[#010526] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-[#010526]/60">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#010526]/20 text-xs outline-none text-[#010526] focus:border-[#010526] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#010526]/60">
                      Nature of Enquiry
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#010526]/20 text-xs outline-none text-[#010526] focus:border-[#010526] transition-colors cursor-pointer"
                    >
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="Custom Consultation">Custom Fitting & Tailoring</option>
                      <option value="Order Support">Order Tracking & Delivery</option>
                      <option value="Bespoke Bridal">Bespoke Bridal Consultations</option>
                      <option value="Wholesale Partnerships">Wholesale & Showrooms</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#010526]/60">
                      Message details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify designs or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#010526]/20 text-xs outline-none text-[#010526] focus:border-[#010526] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#010526] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-1"
                  >
                    <span>Send Enquiry</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>

            {/* Image to Right */}
            <div className="w-full md:w-[40%] relative bg-[#010526]/5 overflow-hidden shadow-md rounded-sm min-h-[300px] md:min-h-full aspect-[3/4] md:aspect-auto">
              <Image
                src="/login/login-campaign2.png"
                alt="Campaign Bridal Look"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
