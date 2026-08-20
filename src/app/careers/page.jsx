'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, ChevronRight, ArrowRight, CheckCircle2, Users, Factory, Sparkles, Mail } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    {
      id: 1,
      title: 'Senior Dairy & Food Processing Machinery Engineer',
      department: 'Mechanical Design & Fabrication',
      location: 'Hyderabad (On-site)',
      experience: '4–8 Years',
      type: 'Full-time',
      desc: 'Responsible for 3D CAD/SolidWorks design of HTST pasteurizers, homogenizers, storage silos, and sanitary piping flow diagrams.',
    },
    {
      id: 2,
      title: 'Field Service & Installation Commissioning Engineer',
      department: 'Customer Technical Support',
      location: 'Pan-India Travel (Base: Hyderabad)',
      experience: '2–5 Years',
      type: 'Full-time',
      desc: 'Lead on-site erection, commissioning, water trial runs, and operator training for dairy and beverage bottling plants across India.',
    },
    {
      id: 3,
      title: 'Sanitary SS304/SS316 TIG Welder & Fabricator',
      department: 'Plant Manufacturing',
      location: 'Hyderabad Facility',
      experience: '3–6 Years',
      type: 'Full-time',
      desc: 'Expert in purge TIG welding of stainless steel pipes, jacketed pressure vessels, and food-grade mirror polishing (Ra < 0.4 µm).',
    },
    {
      id: 4,
      title: 'B2B Industrial Machinery Sales & Project Manager',
      department: 'Sales & Business Development',
      location: 'Hyderabad / Regional Hubs',
      experience: '3–7 Years',
      type: 'Full-time',
      desc: 'Engage with dairy co-operatives, commercial ice cream producers, and FMCG clients for technical quotation estimation and project closing.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Careers at Nandhas</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-extrabold uppercase tracking-widest">
              <Users className="w-4 h-4 text-blue-400" />
              <span>JOIN OUR ENGINEERING TEAM</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Build the Future of Food &amp; Interior Manufacturing
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are looking for talented mechanical engineers, precision welders, automation programmers, and technical sales experts passionate about industrial fabrication excellence.
            </p>
          </div>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-navy-800 font-display">Current Career Openings</h2>
              <p className="text-xs text-slate-500 mt-1">Explore live full-time engineering and operations opportunities.</p>
            </div>
            <a
              href="mailto:careers@machinery-interior.com?subject=Job%20Application%20at%20Nandhas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 text-white text-xs font-bold hover:bg-navy-900 transition"
            >
              <Mail className="w-3.5 h-3.5" /> Direct Resume Drop
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openings.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {job.department}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">{job.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-navy-800">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent-orange" />{job.location}</span>
                    <span>&bull;</span>
                    <span>{job.experience}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{job.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`mailto:careers@machinery-interior.com?subject=Application:%20${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center text-xs font-bold text-accent-orange hover:text-navy-800 transition"
                  >
                    Apply for Position <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
