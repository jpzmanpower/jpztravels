'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function PackagesPage() {
    const [packages, setPackages] = useState<{
        id: string;
        title: string;
        description: string;
        image_url: string;
        category: string;
        duration: string;
    }[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        title: string;
        description: string;
        category: string;
        duration: string;
    } | null>(null);
    const [activeFilter, setActiveFilter] = useState<'Umrah' | 'Tour'>('Umrah');
    const [umrahDuration, setUmrahDuration] = useState<'All' | '15 Days' | '21 Days'>('All');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        if (selectedImage) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        fetch('/api/packages')
            .then(res => res.json())
            .then(json => {
                if (json.success) setPackages(json.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredPackages = packages.filter(pkg => {
        if (pkg.category !== activeFilter) return false;
        if (activeFilter === 'Umrah' && umrahDuration !== 'All') {
            return (pkg.duration || '15 Days') === umrahDuration;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50 text-gray-800">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=1200&q=80&auto=format&fit=crop"
                        alt="Hero"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        quality={80}
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85" />
                </div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />

                <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 lg:py-32 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-bold text-white">Premium Spiritual Journeys</span>
                    </div>

                    {/* 🔹 HERO HEADING - Mobile optimized */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                        Explore Premium Umrah &
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            {' '}Hajj Packages
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-2">
                        Luxury spiritual journeys with premium hotels, flights, and guided ziyarat. Book your blessed trip today.
                    </p>
                </div>
            </section>

            {/* ===== MAIN FILTER TABS ===== */}
            <section className="relative bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 sm:py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2 sm:gap-3">
                    {/* 🔹 Main Filter - Mobile par chhote buttons */}
                    <div className="flex gap-2 sm:gap-3 justify-center">
                        {(['Umrah', 'Tour'] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setActiveFilter(filter);
                                    setUmrahDuration('All');
                                }}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                                    }`}
                            >
                                {filter === 'Umrah' ? '🕋 Umrah Packages' : '🌍 Tour Packages'}
                            </button>
                        ))}
                    </div>

                    {/* 🔹 Sub-filter - Mobile par chhote buttons */}
                    {activeFilter === 'Umrah' && (
                        <div className="flex gap-1.5 sm:gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            {(['All', '15 Days', '21 Days'] as const).map((dur) => (
                                <button
                                    key={dur}
                                    onClick={() => setUmrahDuration(dur)}
                                    className={`px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-300 ${umrahDuration === dur
                                        ? 'bg-[#0A192F] text-white shadow-md scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                                        }`}
                                >
                                    {dur === 'All' ? '✨ All Umrah' : `🗓️ ${dur}`}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ===== GALLERY GRID ===== */}
            {/* 🔹 Section padding responsive */}
            <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#0f88c0] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredPackages.length === 0 ? (
                    <p className="text-center text-gray-400 py-10 text-sm sm:text-base">
                        No {activeFilter.toLowerCase()} packages found.
                    </p>
                ) : (
                    // 🔹 Grid gap responsive
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {filteredPackages.map((pkg, index) => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedImage({
                                    src: pkg.image_url,
                                    title: pkg.title,
                                    description: pkg.description,
                                    category: pkg.category,
                                    duration: pkg.duration || '15 Days'
                                })}
                                className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${index >= 3 ? 'animate-in fade-in zoom-in-95 duration-700' : ''}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* 🔹 Image height - Mobile: h-64, sm: h-72, md: h-80 */}
                                <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
                                    <Image
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        priority={index < 3}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                                    {/* 🔹 Category Badge - Mobile par chhota */}
                                    <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold text-white shadow-sm ${pkg.category === 'Tour' ? 'bg-emerald-500' : 'bg-[#0f88c0]'
                                        }`}>
                                        {pkg.category}
                                    </span>

                                    {/* 🔹 Duration Badge - Mobile par chhota */}
                                    {pkg.category === 'Umrah' && pkg.duration && (
                                        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-white/95 backdrop-blur-sm text-[#0A192F] shadow-sm">
                                            🕋 {pkg.duration}
                                        </span>
                                    )}

                                    {/* 🔹 Hover Overlay - Mobile par chhota text */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <span className="font-bold text-[#0A192F] flex items-center gap-2 text-xs sm:text-base">
                                                👁️ View Full Image
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 🔹 Card body - Mobile par kam padding */}
                                <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
                                    <h3 className="text-base sm:text-xl font-bold text-[#0A192F] group-hover:text-[#0f88c0] transition-colors">
                                        {pkg.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== LIGHTBOX MODAL ===== */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-100 bg-[#0A192F]/98 backdrop-blur-xl overflow-y-auto"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* 🔹 Close button - Mobile par chhota aur close */}
                    <button
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-101 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 sm:p-3 transition-all hover:scale-110"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* 🔹 Content - Mobile par kam padding */}
                    <div
                        className="min-h-screen flex flex-col items-center justify-start pt-20 sm:pt-24 pb-8 sm:pb-12 px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            width={2000}
                            height={1500}
                            className="w-auto max-w-full h-auto object-contain rounded-lg shadow-2xl border border-white/10"
                            priority
                            unoptimized
                        />

                        {/* 🔹 Text content - Mobile par chhota */}
                        <div className="mt-6 sm:mt-10 text-center space-y-3 sm:space-y-4 max-w-3xl px-2">
                            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                                <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white ${selectedImage.category === 'Tour' ? 'bg-emerald-500' : 'bg-[#0f88c0]'
                                    }`}>
                                    {selectedImage.category}
                                </span>
                                {selectedImage.category === 'Umrah' && (
                                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/15 backdrop-blur-sm text-white">
                                        🕋 {selectedImage.duration}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                {selectedImage.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400">
                                {selectedImage.description}
                            </p>

                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                            >
                                Contact Us
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}