'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Milk, 
  Sparkles, 
  Boxes, 
  Cog, 
  Building2, 
  Hammer, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Phone,
  Send,
  ChevronRight
} from 'lucide-react';

export default function IndustriesPage() {
  const industriesList = [
    {
      id: 'dairy',
      title: 'Dairy & Milk Processing Plants',
      subtitle: 'Complete processing solutions for pasteurization, standardization, and dairy derivatives.',
      icon: Milk,
      badge: 'Food Grade SS304/SS316',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
      description: 'We engineer sanitary dairy equipment that meets rigorous FSSAI standards. From 500 LPH mini-dairies to 50,000 LPH automated plants, our systems ensure maximum milk yield, bacterial safety, and energy efficiency.',
      keyMachines: [
        'HTST Continuous Plate Pasteurizers (500 - 10,000 LPH)',
        'Two-Stage High Pressure Homogenizers (250 Bar)',
        'Insulated Stainless Steel Milk Storage Silos & Dump Tanks',
        'Automatic Cream Separators & Sanitary Ghee Boilers',
        'Paneer Presses & Curd / Yogurt Incubation Vats'
      ],
      link: '/machinery?cat=milk-processing-machines'
    },
    {
      id: 'ice-cream',
      title: 'Commercial Ice Cream Manufacturers',
      subtitle: 'Industrial batch freezers, continuous softy dispensers, and hardening tunnels.',
      icon: Sparkles,
      badge: 'Air-Pump Overrun Technology',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
      description: 'Turn-key machinery for artisan gelaterias, retail soft-serve chains, and commercial ice cream production lines with precise overrun control and eco-friendly R404a refrigeration.',
      keyMachines: [
        'Commercial Soft Serve Softy Machines (Twin Compressor, 3-Flavours)',
        'Heavy-Duty Batch Freezers (60 - 200 Litres/Hour)',
        'Ice Cream Mix Ageing Vats with Sanitary Agitators',
        'Deep Freeze Hardening Rooms & Walk-in Blast Freezers',
        'Semi-Automatic Cone & Cup Rotary Filling Stations'
      ],
      link: '/machinery?cat=ice-cream-machines'
    },
    {
      id: 'beverage',
      title: 'Beverage & Soft Drink Bottling',
      subtitle: 'Rinse-fill-cap monoblocks, carbonators, and end-of-line packaging automation.',
      icon: Boxes,
      badge: 'Siemens / Delta PLC Automation',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      description: 'High-speed automated bottling and canning lines engineered for mineral water, carbonated soft drinks (CSD), natural fruit juices, and dairy beverages.',
      keyMachines: [
        'Automatic Rotary Rinse-Fill-Cap Monoblock Units (24 - 120 BPM)',
        'Fruit Juice Pulp Extraction & Tubular Pasteurization Plants',
        'Carbonation & Syrupmix Dosing Systems',
        'High-Speed Can Seamers & Glass Bottle Crowning Units',
        'Shrink Wrapping & Automatic Carton Packaging Conveyors'
      ],
      link: '/machinery?cat=beverage-machines'
    },
    {
      id: 'food',
      title: 'Food Processing & Commercial Kitchens',
      subtitle: 'Sanitary liquid handling, vacuum packaging, and thermal food processing equipment.',
      icon: Cog,
      badge: 'ISO 9001:2015 Verified',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      description: 'Industrial cooking kettles, emulsifiers, vacuum packagers, and sanitary food transport solutions for cloud kitchens, sauce manufacturers, and RTE food processors.',
      keyMachines: [
        'Steam Jacketed Tilting Cooking Kettles (100 - 1000 LTR)',
        'Industrial Vacuum Chamber Packaging Machines',
        'High-Shear Liquid Food Emulsifiers & Mixers',
        'Sanitary Positive Displacement & Centrifugal Pumps',
        'CIP (Clean-in-Place) Automated Washing Stations'
      ],
      link: '/machinery'
    },
    {
      id: 'interior',
      title: 'Architectural Interiors & Commercial Decor',
      subtitle: 'Luxury surface materials, acoustic wall louvers, and 3mm UV marble sheets.',
      icon: Building2,
      badge: 'Class B1 Flame Retardant',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'High-gloss UV marble sheets and acoustic charcoal slats for premium hotels, corporate offices, healthcare facilities, and luxury residential projects.',
      keyMachines: [
        '3.0 mm High-Gloss Polyurethane UV Marble Sheets (8x4 ft)',
        'Acoustic Charcoal Louvered Fluted Wall Panels',
        'Natural Solid Teak & Hardwood Interlocking Claddings',
        'Waterproof PVC False Ceiling & Wall Planks',
        'Architectural Metal Trim Profiles & Corner Accessories'
      ],
      link: '/interior'
    },
    {
      id: 'construction',
      title: 'Commercial Construction & Infrastructure',
      subtitle: '100% waterproof exterior WPC louvers, weather-resistant facades, and partitions.',
      icon: Hammer,
      badge: '100% Termite & Waterproof',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Durable composite panels, exterior louvers, and structural PVC profiles engineered for harsh weather resistance, fast modular installation, and zero maintenance.',
      keyMachines: [
        'Exterior UV-Treated WPC Wall Claddings & Louvers',
        'Modular PVC Partition Sheets & Fire-Rated Doors',
        'Heavy-Duty Moisture-Proof Underlay Substrates',
        'Commercial Vinyl Flooring & Wall Protectors'
      ],
      link: '/interior'
    }
  ];

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-content-muted">
            <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-content-main">Industries We Serve</span>
          </div>

          <div className="bg-navy-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-trust-green" /> Nationwide Plant Engineering
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Industries Powered by NANDHAS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                From high-capacity dairy processing plants to luxury architectural surfaces, we provide certified machinery and surface materials engineered for regulatory compliance and high commercial ROI.
              </p>
            </div>
          </div>
        </div>

        {/* Industries Detailed Cards */}
        <div className="space-y-10">
          {industriesList.map((ind, idx) => {
            const Icon = ind.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={ind.id}
                className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Image */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-navy-800/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                      {ind.badge}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">
                        {ind.badge}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-800 font-display">
                      {ind.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  {/* Key Equipment List */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-surface-border">
                    <strong className="text-xs font-bold text-content-main uppercase tracking-wider block">
                      Core Machinery &amp; Processing Units Included:
                    </strong>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {ind.keyMachines.map((m, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-trust-green shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href={ind.link}
                      className="px-6 py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center"
                    >
                      <span>Explore Equipment Catalogue</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>

                    <Link
                      href="/quote"
                      className="px-6 py-3 bg-white hover:bg-slate-50 text-navy-800 border-2 border-navy-800 font-bold text-xs rounded-xl transition"
                    >
                      Request Plant RFQ
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Box */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold font-display text-white">Need a Customized Plant Layout?</h3>
            <p className="text-xs text-slate-300">
              Our mechanical engineers assist with factory CAD layouts, pipe routing, FSSAI regulatory compliance, and trial commissioning.
            </p>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs rounded-xl shadow transition"
            >
              Contact Engineering Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
