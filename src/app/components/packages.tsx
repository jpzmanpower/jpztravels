'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// ================= HELPER FUNCTIONS =================
const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

export default function HajjUmrahPackagesSection() {
    const router = useRouter();
    const { ref, isInView } = useInView();

    // ✅ States
    const [packagesData, setPackagesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch Data
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch('/api/packages');
                const json = await response.json();

                if (json?.success && Array.isArray(json.data)) {
                    const mapped = json.data.map((pkg: any, index: number) => {
                        return {
                            // ✅ ID ko String mein convert karein (NaN error fix)
                            id: pkg?.id ? String(pkg.id) : `pkg-${index}`,
                            // ✅ Image URL handle karein
                            image: pkg?.image_url || pkg?.image || 'https://placehold.co/600x400/png?text=No+Image',
                            title: pkg?.title || 'Untitled Package',
                            category: pkg?.category || 'Umrah',
                            description: pkg?.description || '',
                            created_at: pkg?.created_at
                        };
                    });
                    setPackagesData(mapped);
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // ✅ DISPLAY LOGIC: Latest 3 Umrah + Latest 3 Tour
    const displayPackages = (() => {
        // 1. Pehle data ko Newest First sort karein
        const sorted = [...packagesData].sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA;
        });

        // 2. Latest 3 Umrah aur Latest 3 Tour nikalein
        const latestUmrah = sorted.filter((p: any) => p.category === 'Umrah').slice(0, 3);
        const latestTour = sorted.filter((p: any) => p.category === 'Tour').slice(0, 3);

        // 3. Combine karein (Total 6 Cards)
        return [...latestUmrah, ...latestTour];
    })();

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/40 to-white"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0f88c0]/10 rounded-full border border-[#0f88c0]/20">
                        <span className="text-2xl">🕋</span>
                        <span className="text-base font-bold text-[#0f88c0]">Latest Collections</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Curated <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-500 bg-clip-text text-transparent">Premium Packages</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-500 rounded-full"></span>
                        </span> Journeys
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Explore our newest additions for Umrah & Tour. Handcrafted itineraries with complete spiritual support.
                    </p>
                </div>

                {/* ✅ PACKAGES GRID - Exact Match with Packages Page UI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // ✅ Loading Skeleton
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg animate-pulse">
                                <div className="h-64 bg-gray-200" />
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                                    <div className="h-10 bg-gray-200 rounded-xl w-full" />
                                </div>
                            </div>
                        ))
                    ) : displayPackages.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500 font-medium">
                            No packages available yet.
                        </div>
                    ) : (
                        displayPackages.map((pkg: any, index: number) => (
                            <div
                                key={pkg.id}
                                onClick={() => router.push('/packages')}
                                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${index * 100 + 300}ms` }}
                            >
                                {/* Image Section - Aspect Ratio 4:3 like Packages Page */}
                                <div className="relative aspect-3/3 overflow-hidden">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading={index < 3 ? "eager" : "lazy"}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                                    {/* Category Badge */}
                                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm ${pkg.category === 'Tour' ? 'bg-emerald-500' : 'bg-[#0f88c0]'
                                        }`}>
                                        {pkg.category}
                                    </span>

                                    {/* Hover Overlay - View Button */}
                                    {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <span className="font-bold text-[#0A192F] flex items-center gap-2">
                                                👁️ View Full Image
                                            </span>
                                        </div>
                                    </div> */}
                                </div>

                                {/* Content Section - Title Below Image */}
                                <div className="p-6 bg-white border-t border-gray-100">
                                    <h3 className="text-xl font-bold text-[#0A192F] group-hover:text-[#0f88c0] transition-colors line-clamp-1">
                                        {pkg.title}
                                    </h3>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View More Link */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link
                        href="/packages"
                        className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"
                    >
                        View All Packages
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}