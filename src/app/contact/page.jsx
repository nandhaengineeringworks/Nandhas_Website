'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Building2, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { submitEnquiry } from '../../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    city: '',
    state: '',
    productType: 'MACHINERY',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeMapTab, setActiveMapTab] = useState('office');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        city: formData.city,
        state: formData.state,
        productName: 'Direct Contact Form Inquiry',
        productType: formData.productType,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'We could not send your enquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const mapLocations = {
    office: {
      name: 'Kukatpally Sales & Manufacturing Location',
      address: 'Cool Everest Ice Cream Manufacturers, Kukatpally, Hyderabad, Telangana, India',
      embedUrl: 'https://maps.google.com/maps?q=17.4822576,78.406914&t=&z=16&ie=UTF8&iwloc=&output=embed',
      mapsLink: 'https://www.google.com/maps/place/Cool+Everest+Ice+Cream+Manufacturers+-+kukatpally+,+Hyderabad/@17.4825201,78.4070631,3a,90y,174.22h,117.83t/data=!3m7!1e1!3m5!1sFfv_IRrgbeWd5sxUhIGe6g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-27.83%26panoid%3DFfv_IRrgbeWd5sxUhIGe6g%26yaw%3D174.22!7i16384!8i8192!4m7!3m6!1s0x3bcb917b28edc771:0xa79e820318addb5c!8m2!3d17.4822576!4d78.406914!10e5!16s%2Fg%2F11gtymr1gb?entry=ttu',
      desc: 'Use the exact Google Maps place location for sales consultations, ice cream machinery enquiries and directions.'
    }
  };

  const currentMap = mapLocations[activeMapTab];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-6 sm:py-12 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Breadcrumb Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500 overflow-hidden">
            <Link href="/" className="hover:text-navy-800 font-medium shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">Contact &amp; Kukatpally Location</span>
          </div>

          <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] p-5 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 overflow-hidden relative">
            <div>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-300 block">
                DIRECT OEM ENGINEERING SUPPORT
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight mt-1 sm:mt-2 relative leading-tight">
                Contact &amp; Plant Locations
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative w-full md:w-auto">
              <a
                href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20want%20to%20inquire%20about%20dairy%20machinery."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold shadow transition"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 fill-current" />
                <span>WhatsApp Prahalad</span>
              </a>
              <a
                href="tel:+918309004707"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold shadow transition"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span>Call +91 83090 04707</span>
              </a>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed px-1">
            Connect directly with <strong>Prahalad Nandha</strong> and our senior fabrication engineers at <strong>Nandhas Engineering Works</strong> for customized milk dairy tanks, ice cream freezers, beverage bottling machinery, and architectural interior panel orders.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-3.5 sm:p-4 shadow-xs">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Clock className="h-5 w-5" /></div>
              <div><strong className="block text-xs sm:text-sm text-slate-900">Fast response</strong><span className="text-[10px] sm:text-[11px] text-slate-600">Usually within 2 business hours</span></div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3.5 sm:p-4 shadow-xs">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-navy-800"><ShieldCheck className="h-5 w-5" /></div>
              <div><strong className="block text-xs sm:text-sm text-slate-900">Technical guidance</strong><span className="text-[10px] sm:text-[11px] text-slate-600">Capacity and layout support</span></div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-3.5 sm:p-4 shadow-xs">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent-orange"><Send className="h-5 w-5" /></div>
              <div><strong className="block text-xs sm:text-sm text-slate-900">Formal quotation</strong><span className="text-[10px] sm:text-[11px] text-slate-600">Clear GST and delivery details</span></div>
            </div>
          </div>
        </div>

        {/* 3 Executive Contact & Legal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Direct Contact & Proprietor */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-500/10 text-accent-orange flex items-center justify-center">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">MANAGING PROPRIETOR</span>
              <h3 className="text-base sm:text-lg font-black text-navy-800 font-display">Prahalad Nandha</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-600">Primary Mobile:</span>
                <a href="tel:+918309004707" className="font-bold text-navy-800 hover:text-accent-orange font-mono">
                  +91 83090 04707
                </a>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-600">Secondary Mobile:</span>
                <a href="tel:+919640652239" className="font-bold text-navy-800 hover:text-accent-orange font-mono">
                  +91 96406 52239
                </a>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-600 block mb-0.5">Email Address:</span>
                <a href="mailto:nandhaengineeringworks0@gmail.com" className="font-bold text-navy-800 hover:text-accent-orange text-[11px] break-all">
                  nandhaengineeringworks0@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Legal Entity & GST Verification */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">GOVT. REGISTRATION</span>
              <h3 className="text-base sm:text-lg font-black text-navy-800 font-display">Form GST REG-06</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold uppercase text-emerald-800 block">GSTIN Registration:</span>
                <span className="font-mono text-xs font-black text-emerald-950 block mt-0.5">
                  36CGKPN3992G1ZW
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-[11px]">
                <span className="text-slate-500">Legal Name:</span>
                <span className="font-bold text-slate-800">NANDA PRAHALAD</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-[11px]">
                <span className="text-slate-500">Trade Name:</span>
                <span className="font-bold text-slate-800">NANDHAS ENGINEERING</span>
              </div>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">OPERATIONS</span>
              <h3 className="text-base sm:text-lg font-black text-navy-800 font-display">Plant Working Hours</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800">Monday – Saturday</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-md">Open</span>
                </div>
                <span className="text-slate-600 text-[11px]">9:00 AM to 8:00 PM IST</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800">Sunday</span>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold text-[10px] rounded-md">By Appointment</span>
                </div>
                <span className="text-slate-600 text-[11px]">Factory Demo On Request</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Inquiry Form Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Map */}
          <div className="lg:col-span-7 space-y-5 w-full min-w-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-navy-800 font-display">
                  Location Map
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visit our sales location in Kukatpally, Hyderabad
                </p>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner bg-slate-100">
                <iframe
                  title={`Google Map - ${currentMap.name}`}
                  src={currentMap.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Technical Consultation Form */}
          <div className="lg:col-span-5 w-full min-w-0">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 sm:space-y-5 lg:sticky lg:top-24">
              <div>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-accent-orange block">
                  FAST RFQ / INQUIRY
                </span>
                <h3 className="text-lg sm:text-xl font-black text-navy-800 font-display">
                  Send Technical Requirement
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submit your plant specifications for an immediate formal estimate.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-navy-800 font-display">Inquiry Sent Successfully</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you! Prahalad Nandha and our engineering team will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', companyName: '', city: '', state: '', productType: 'MACHINERY', message: '' });
                    }}
                    className="px-4 py-2 bg-navy-800 text-white text-xs font-bold rounded-xl hover:bg-navy-900 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  {error && (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-medium text-red-700">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:ring-2 focus:ring-navy-800/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:ring-2 focus:ring-navy-800/20"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:ring-2 focus:ring-navy-800/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none bg-slate-50 font-medium"
                      >
                        <option value="MACHINERY">Dairy &amp; Food Machinery</option>
                        <option value="INTERIOR">Architectural Interior Panels</option>
                        <option value="BOTH">Complete Turnkey Facility</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Hyderabad"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:ring-2 focus:ring-navy-800/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Requirements / Machine Capacity *</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Need 500 LPH Milk Dump Tank or 300L Ice Cream Ageing Vat..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 outline-none focus:ring-2 focus:ring-navy-800/20 custom-scrollbar resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-accent-orange hover:bg-accent-hover text-white rounded-xl font-bold shadow-md transition flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>{loading ? 'Transmitting Request...' : 'Send Inquiry To Prahalad Nandha'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
