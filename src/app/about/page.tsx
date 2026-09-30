'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// 🔹 Optimized IntersectionObserver Hook
const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px 100px 0px' }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, isInView };
};

export default function AboutPage() {
    const aboutRef = useInView();
    const visionRef = useInView();
    const missionRef = useInView();
    const legacyRef = useInView();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const visionPoints = [
        {
            title: 'Excellence in Service',
            desc: 'Delivering excellence in every interaction',
            icon: '⭐',
        },
        {
            title: 'Long-term Relationships',
            desc: 'Building lasting bonds with our clients',
            icon: '🤝',
        },
        {
            title: 'Global Connections',
            desc: 'Connecting people with the world',
            icon: '🌍',
        },
    ];

    const missionPoints = [
        'To provide reliable and professional travel solutions with honesty and transparency.',
        'To deliver exceptional customer service with complete dedication and care.',
        'To simplify travel processes for our clients and provide accurate guidance.',
        'To continue our tradition of serving the people of Gujranwala and beyond with trust and commitment.',
        'To uphold our values and legacy while embracing innovation and growth in the travel industry.',
    ];

    return (
        <div className="w-full">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[80vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=870&auto=format&fit=crop"
                        alt="Masjid al-Haram, Makkah"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        quality={80}
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85" />
                </div>
                {/* Animated Glow Effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div
                    className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 lg:py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    {/* 🔹 FIXED: Badge mobile par stack ho */}
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-bold text-white text-center">
                            ✈️ About JPZ Travels
                        </span>
                    </div>

                    {/* 🔹 HERO HEADING - Mobile optimized */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                        About
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            {' '}
                            JPZ Travels
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-2">
                        A trusted name in travel services, carrying forward a legacy of trust,
                        integrity, and commitment to serving the people of Gujranwala for over 15 years.
                    </p>
                </div>
            </section>

            {/* ===== ABOUT US SECTION ===== */}
            <section ref={aboutRef.ref} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-32 bg-[#0f88c0]/5 rounded-full blur-3xl" />
                <div
                    className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${aboutRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <div className="text-center mb-10 sm:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                            <span className="text-lg sm:text-xl">🏢</span>
                            <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                Who We Are
                            </span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A192F] mb-4 sm:mb-6 leading-tight">
                            Welcome to{' '}
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                JPZ Travels
                            </span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-4 sm:space-y-6">
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                Welcome to JPZ Travels Gujranwala — a trusted name dedicated to providing reliable travel
                                and consultancy services with professionalism and commitment. JPZ Travels proudly carries
                                a legacy connected to serving the people of Gujranwala in different sectors for more than{' '}
                                <span className="font-bold text-[#0f88c0]">15 years</span>, built on values of trust,
                                integrity, and customer satisfaction.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                Our company was established with the vision of making travel opportunities easier and more
                                accessible for individuals, families, students, workers, and businesses. We provide a wide
                                range of services including visit visas, work visas, Umrah services, airline ticketing,
                                travel consultancy, and related travel solutions.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                At JPZ Travels, we believe that every journey represents dreams, opportunities, and new
                                beginnings. Our experienced team works with dedication to ensure a smooth and transparent
                                process for every client. We take pride in serving our community and helping people achieve
                                their travel goals with confidence and peace of mind.
                            </p>
                        </div>
                        <div className="relative mt-6 md:mt-0">
                            <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 group">
                                <Image
                                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=870&auto=format&fit=crop"
                                    alt="JPZ Travels Office"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                                    <p className="text-white font-bold text-lg sm:text-xl">Serving Since 2009</p>
                                    <p className="text-white/80 text-sm sm:text-base">Gujranwala, Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VISION & MISSION SECTION ===== */}
            <section ref={visionRef.ref} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-linear-to-b from-[#0A192F] to-[#112240]" />
                <div className="absolute top-40 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Vision */}
                    <div
                        className={`mb-16 sm:mb-24 transition-all duration-700 ${visionRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                    >
                        <div className="text-center mb-8 sm:mb-12">
                            <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-white/5 rounded-full border border-white/10">
                                <span className="text-lg sm:text-xl">✨</span>
                                <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Our Vision
                                </span>
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight px-2">
                                Becoming Pakistan's{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Most Trusted
                                </span>{' '}
                                Travel Partner
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                                To become one of the most trusted and leading travel service providers in Pakistan by delivering excellence, building long-term relationships, and creating opportunities that connect people with the world.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {visionPoints.map((point, index) => (
                                <div
                                    key={point.title}
                                    className="group bg-[#112240] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block group-hover:scale-110 transition-transform duration-300">
                                        {point.icon}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                        {point.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-400">{point.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mission */}
                    <div
                        ref={missionRef.ref}
                        className={`transition-all duration-700 ${missionRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                    >
                        <div className="text-center mb-8 sm:mb-12">
                            <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-white/5 rounded-full border border-white/10">
                                <span className="text-lg sm:text-xl">🎯</span>
                                <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Our Mission
                                </span>
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight px-2">
                                What Drives{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Us Forward
                                </span>
                            </h2>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-3 sm:space-y-4">
                                {missionPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 sm:gap-4 bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:-translate-y-1"
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-r from-[#0f88c0] to-emerald-400 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed pt-0.5 sm:pt-1">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== LEGACY SECTION ===== */}
            <section ref={legacyRef.ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-linear-to-b from-white via-blue-50/30 to-white">
                <div className="absolute top-20 left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#0f88c0]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-400/5 rounded-full blur-3xl" />
                <div
                    className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${legacyRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 mb-6 sm:mb-8 bg-linear-to-r from-[#0f88c0]/10 to-emerald-400/10 rounded-full border border-[#0f88c0]/20 backdrop-blur-sm">
                            <span className="text-xl sm:text-2xl">🏛️</span>
                            <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                Our Heritage
                            </span>
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0A192F] mb-4 sm:mb-6 leading-tight px-2">
                            Our{' '}
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Legacy
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path
                                        d="M2 10C50 4 100 2 150 2C200 2 250 4 298 10"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#0f88c0" />
                                            <stop offset="100%" stopColor="#34d399" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                            JPZ Travels represents more than a business — it's a legacy of values, trust, and family tradition spanning generations.
                        </p>
                    </div>

                    {/* Legacy Text Content */}
                    <div className="max-w-5xl mx-auto mb-16 sm:mb-20 lg:mb-24">
                        <div className="prose prose-lg max-w-none text-center">
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2">
                                JPZ Travels is more than a business name — it represents a legacy of values, trust,
                                and family tradition. The name{' '}
                                <span className="font-bold text-[#0f88c0]">&quot;JPZ&quot;</span> was chosen in loving
                                memory and honor of our late uncles, whose principles, dedication, and commitment to
                                serving people continue to inspire us every day.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 px-2">
                                For over <span className="font-bold text-[#0f88c0]">75 years</span>, our family has
                                proudly served the people of Gujranwala across different sectors, building strong
                                relationships based on honesty, respect, and reliability. Their vision of helping others
                                and creating a positive impact remains the foundation of JPZ Travels today.
                            </p>
                        </div>
                    </div>

                    {/* 🔹 Team Cards Grid - Mobile: 1 col, sm: 2 col, lg: 4 col */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                        {/* Late Muhammad Rafi Butt */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-slate-600 to-slate-800 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                {/* 🔹 FIXED: min-h-72 ko min-h-[18rem] se replace kiya */}
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people4.jpeg"
                                        alt="Late Muhammad Rafi Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            👑
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                                        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-800/90 backdrop-blur-md rounded-full border border-white/20">
                                            <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                                In Memory
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        (Late) Muhammad Rafi Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        Our Great Grandfather
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* J - Javed Rafi Butt */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-[#0f88c0] to-blue-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people3.jpeg"
                                        alt="Javed Rafi Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-[#0f88c0] to-blue-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            J
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        (Late) Javed Rafi Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        Founder — J
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* P - Pervaiz Rafi Butt */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people2.jpeg"
                                        alt="Pervaiz Rafi Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            P
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        (Late) Pervaiz Rafi Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        Founder — P
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Z - Zubair Rafi Butt */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people1.jpeg"
                                        alt="Zubair Rafi Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-[#0f88c0] to-emerald-400 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            Z
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        (Late) Zubair Rafi Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        Founder — Z
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Person 5 - Umer Javed Butt */}
                        <div className="group relative sm:col-span-1">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people5.jpeg"
                                        alt="Umer Javed Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        Umer Javed Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        CEO
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Person 6 - Abdul Majid Pervaiz Butt */}
                        <div className="group relative sm:col-span-1">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full">
                                <div className="relative flex-1 min-h-72 sm:min-h-80 overflow-hidden">
                                    <Image
                                        src="/people6.jpeg"
                                        alt="Abdul Majid Pervaiz Butt"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                </div>
                                <div className="bg-[#0A192F] p-4 sm:p-5 border-t border-white/10">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                                        Abdul Majid Pervaiz Butt
                                    </h4>
                                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                        Director
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f88c0/10_0%,#0A192F_60%)]" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-white/5 rounded-full border border-white/10">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Ready to Start?
                        </span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                        Begin Your{' '}
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Sacred Journey
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
                        Let us guide you to the Holy Cities with premium packages, expert scholars, and complete peace of mind. Book your Umrah or Hajj today.
                    </p>

                    {/* 🔹 CTA Buttons - Mobile: full width stacked */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                        <a
                            href="/packages"
                            className="px-6 sm:px-10 py-3.5 sm:py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="/#contact"
                            className="px-6 sm:px-10 py-3.5 sm:py-4 bg-white/5 text-white font-bold text-base sm:text-lg rounded-full border border-white/20 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300"
                        >
                            Contact Our Team
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}