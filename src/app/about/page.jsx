'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  Award, 
  Factory, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Check,
  Cpu,
  BadgeCheck,
  Layers,
  FileText
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. BREADCRUMB & HERO BANNER */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900">About Nandhas Engineering Works</span>
          </div>

          <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl shadow-navy-900/20 p-7 sm:p-14 lg:p-16 border border-slate-800">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
                <Factory className="w-4 h-4 text-accent-orange" />
                <span>DIRECT OEM FABRICATION &bull; HYDERABAD, TELANGANA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
                Nandhas Engineering Works
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Founded and led by <strong>Prahalad Nandha</strong>, we are heavy-duty fabricators of certified <strong>SS304 / SS316</strong> Dairy &amp; Food Processing Machinery and luxury Architectural Surface panels serving enterprises across India.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl bg-accent-orange hover:bg-accent-hover text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-950/40 transition"
                >
                  <span>Visit Factory / Contact Prahalad</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/machinery"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition"
                >
                  <span>Explore Machinery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS RIBBON (4 Clean Full-Width Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:-translate-y-1 hover:border-orange-500/30 transition">
            <span className="text-3xl sm:text-4xl font-black text-navy-800 font-display">15+</span>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Years Experience</h4>
            <p className="text-[11px] text-slate-500 leading-normal">Pioneering sanitary food processing fabrication in Telangana.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:border-orange-500/30 transition">
            <span className="text-3xl sm:text-4xl font-black text-accent-orange font-display">SS304 / 316</span>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Certified Metallurgy</h4>
            <p className="text-[11px] text-slate-500 leading-normal">Exclusively certified JSL food-grade stainless steel builds.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:border-orange-500/30 transition">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-display">Pan-India</span>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Supply &amp; Commissioning</h4>
            <p className="text-[11px] text-slate-500 leading-normal">Turnkey plant setup, operator training and logistics across India.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:border-orange-500/30 transition">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 font-display">1 Year</span>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Full OEM Warranty</h4>
            <p className="text-[11px] text-slate-500 leading-normal">Backed by lifetime spare parts supply and 24/7 technical support.</p>
          </div>
        </div>

        {/* 3. EXECUTIVE LEADERSHIP & COMPANY STORY */}
        <div className="bg-white rounded-[30px] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Prahalad Nandha Profile Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#061a38] to-[#0b2b5b] text-white rounded-3xl p-7 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-orange block">
                  MANAGING PROPRIETOR &amp; FOUNDER
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Prahalad Nandha
                </h3>
                <p className="text-xs text-slate-300">
                  Chief Technical Fabricator &bull; Nandhas Engineering Works
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                &ldquo;Our vision is simple: To provide Indian dairy farmers, food processors, and contractors with heavy-duty, food-grade machinery manufactured to the highest sanitary standards without inflated middleman commissions.&rdquo;
              </p>

              <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="w-4 h-4 text-accent-orange shrink-0" />
                  <a href="tel:+918309004707" className="hover:text-accent-orange font-mono font-bold text-white">
                    +91 83090 04707 / 96406 52239
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-4 h-4 text-accent-orange shrink-0" />
                  <a href="mailto:nandhaengineeringworks0@gmail.com" className="hover:text-accent-orange text-[11px] break-all">
                    nandhaengineeringworks0@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                  <span className="text-[11px]">Jeedimetla - I &amp; Kukatpally, Hyderabad</span>
                </div>
              </div>
            </div>

            {/* Right: Company Heritage Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-accent-orange block">
                  OUR HERITAGE &amp; MISSION
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-800 font-display tracking-tight mt-1">
                  Engineered for Indian Dairy, Food &amp; Interior Infrastructure
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Nandhas Engineering Works</strong> operates advanced fabrication and machining facilities in Hyderabad (Jeedimetla Industrial Jurisdiction). We build robust, food-grade sanitary processing machinery engineered to withstand continuous commercial plant workloads.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By integrating in-house CNC sheet shearing, motorized plate rolling, precision Argon TIG welding, and sanitary mirror polishing, every tank and machine we build guarantees maximum hygienic integrity and zero weld contamination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-xs text-navy-800 block">Direct Factory-to-Customer</strong>
                    <span className="text-[11px] text-slate-500">Transparent OEM pricing with zero intermediary markups.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-xs text-navy-800 block">Custom Plant Engineering</strong>
                    <span className="text-[11px] text-slate-500">Tailored capacities from 200L batch units to 10,000L plants.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. THREE CORE DIVISIONS (Full Width Aesthetic Cards) */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-accent-orange block">
              DIVISIONS &amp; CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-800 font-display tracking-tight">
              Our Core Engineering Divisions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              End-to-end specialized manufacturing covering dairy equipment, ice cream lines, and architectural surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Division 1: Dairy */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black">
                  🥛
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">DIVISION 01</span>
                  <h3 className="text-xl font-bold text-navy-800 font-display">Dairy &amp; Milk Processing</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered for commercial milk collection, chilling, pasteurization, and paneer/curd production using certified JSL Jindal SS304/SS316.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Milk Dump Tanks &amp; Weigh Bowls</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Paneer Coagulation &amp; Curd Vats</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> HTST Pasteurizers &amp; Homogenizers</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Insulated Milk Storage Silos</div>
                </div>
              </div>
              <Link
                href="/machinery"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-navy-800 hover:text-white text-navy-800 text-xs font-bold text-center block transition"
              >
                View Dairy Catalog &rarr;
              </Link>
            </div>

            {/* Division 2: Ice Cream & Beverages */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-accent-orange flex items-center justify-center text-2xl font-black">
                  🍦
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">DIVISION 02</span>
                  <h3 className="text-xl font-bold text-navy-800 font-display">Ice Cream &amp; Beverages</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-throughput freezing, continuous mixing, ageing vats, and automated liquid rinse-fill-cap bottling lines for commercial plants.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Commercial Softy Soft Serve Units</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Industrial Batch Freezers</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Ageing &amp; Flavor Mixing Vats</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Automatic Monoblock Bottling Lines</div>
                </div>
              </div>
              <Link
                href="/machinery"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-navy-800 hover:text-white text-navy-800 text-xs font-bold text-center block transition"
              >
                View Ice Cream Catalog &rarr;
              </Link>
            </div>

            {/* Division 3: Architectural Interiors */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-black">
                  🏛️
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">DIVISION 03</span>
                  <h3 className="text-xl font-bold text-navy-800 font-display">Architectural Surfaces</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Premium luxury wall cladding, acoustic slatted louvers, and 100% waterproof UV marble sheets for modern interiors.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> 3.0mm UV High-Gloss Marble Sheets</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Fluted Acoustic Charcoal Louvers</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Natural Teak &amp; Walnut Wall Slats</div>
                  <div className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" /> Exterior Weatherproof WPC Planks</div>
                </div>
              </div>
              <Link
                href="/interior"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-navy-800 hover:text-white text-navy-800 text-xs font-bold text-center block transition"
              >
                View Interior Catalog &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 5. QUALITY & MANUFACTURING PILLARS (4 Grid) */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 block">
              QUALITY ASSURANCE &amp; STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
              Rigorous Industrial Standards in Every Build
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Precision Metallurgy</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Certified JSL SS304/SS316 food-grade stainless steel across all milk contact surfaces.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">72-Hour Load Stress Testing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Continuous hydraulic pressure, refrigeration cycle, and motor run-in testing before dispatch.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Argon TIG &amp; Mirror Polish</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Smooth crevice-free internal sanitary welding eliminating bacterial harborage points.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Turnkey Field Support</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Experienced commissioning engineers provide on-site installation and operator training.</p>
            </div>
          </div>
        </div>

        {/* 6. OFFICIAL GOVERNMENT REGISTRATION STRIP */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BadgeCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">LEGAL CERTIFICATION</span>
                <h3 className="text-xl font-black text-navy-800 font-display">Government Verified Enterprise</h3>
              </div>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center self-start sm:self-auto">
              <Check className="w-4 h-4 mr-1 text-emerald-600" /> Form GST REG-06 Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Trade Name</span>
              <strong className="text-sm font-bold text-navy-800 block mt-1">NANDHAS ENGINEERING WORKS</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Legal Entity Name</span>
              <strong className="text-sm font-bold text-navy-800 block mt-1">NANDA PRAHALAD</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">GSTIN Registration</span>
              <strong className="text-sm font-mono font-black text-emerald-700 block mt-1">36CGKPN3992G1ZW</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Tax Jurisdiction</span>
              <strong className="text-sm font-bold text-navy-800 block mt-1">JEEDIMETLA - I, Telangana</strong>
            </div>
          </div>
        </div>

        {/* 7. DUAL HYDERABAD LOCATIONS & CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Manufacturing Works */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4 hover:border-orange-500/30 transition">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-accent-orange flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">PRINCIPAL PLACE OF BUSINESS</span>
                <h4 className="text-lg font-bold text-navy-800 font-display">Manufacturing Works &amp; Plant</h4>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              Plot 329, Kunamahalakshmi Nagar, Jagathgiri Gutta, Jeedimetla - I, Hyderabad, Medchal-Malkajgiri - 500037, Telangana, India
            </p>
            <p className="text-[11px] text-slate-500">
              Heavy stainless steel tank fabrication, sheet shearing, Argon TIG welding &amp; machine assembly line.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-bold text-accent-orange hover:text-navy-800 pt-2 transition"
            >
              <span>View Plant On Google Maps &rarr;</span>
            </Link>
          </div>

          {/* Card 2: Corporate Office */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4 hover:border-orange-500/30 transition">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-navy-800 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">SALES &amp; BILLING DESK</span>
                <h4 className="text-lg font-bold text-navy-800 font-display">Corporate &amp; Sales Office</h4>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              HIG-60, Balaji Nagar, Kukatpally, Hyderabad - 500072, Telangana, India
            </p>
            <p className="text-[11px] text-slate-500">
              Commercial quotations, architectural surface samples, technical consulting &amp; correspondence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-bold text-accent-orange hover:text-navy-800 pt-2 transition"
            >
              <span>View Office On Google Maps &rarr;</span>
            </Link>
          </div>
        </div>

        {/* 8. BOTTOM CTA CALLOUT */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              Planning a Dairy Processing Unit or Interior Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Speak directly with <strong>Prahalad Nandha</strong> and our senior fabrication engineers for customized technical specifications, plant layout designs, and competitive factory-direct pricing.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20would%20like%20to%20discuss%20a%20machinery%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition inline-flex items-center"
            >
              <span>WhatsApp Prahalad (+91 83090 04707)</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-accent-orange hover:bg-accent-hover text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-950/40 transition inline-flex items-center"
            >
              <span>Request Formal Technical Quotation</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
