'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useInView } from '../hooks/useInView';

// ✅ Tester wale image-based services
const servicesImages = [
    { id: 1, src: '/airticket.jpg', title: 'Air Ticket', description: 'Book your flights with best deals' },
    { id: 2, src: '/travel.jpg', title: 'Worldwide Transport', description: 'Complete travel solutions' },
    { id: 3, src: '/saudivisa.jpg', title: 'Saudi Visa', description: 'Saudi Arabia visa processing' },
    { id: 4, src: '/embassy.jpg', title: 'Embassy', description: 'Embassy services & assistance' },
    { id: 5, src: '/appointment.jpg', title: 'Appointment', description: 'Schedule your appointments' },
    { id: 6, src: '/insurance.jpg', title: 'Insurance', description: 'Travel insurance coverage' },
    { id: 7, src: '/hotel.jpg', title: 'Hotel', description: 'Premium hotel bookings' },
    { id: 8, src: '/workvisa.jpg', title: 'Visit Visa', description: 'Work visa processing services' },
    { id: 9, src: '/umrah.jpg', title: 'Umrah', description: 'Umrah pilgrimage packages' },
];

export default function ServicesPage() {
    const statsRef = useInView();
    const [isMounted, setIsMounted] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({
        pilgrims: 0,
        visas: 0,
        hotels: 0,
        satisfaction: 0
    });

    // ✅ Lightbox state
    const [selectedService, setSelectedService] = useState<typeof servicesImages[0] | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Animate stats on scroll
    useEffect(() => {
        if (statsRef.isInView) {
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;
            let step = 0;
            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setAnimatedStats({
                    pilgrims: Math.floor(50000 * easeOut),
                    visas: Math.floor(100 * easeOut),
                    hotels: Math.floor(150 * easeOut),
                    satisfaction: Math.floor(99 * easeOut)
                });
                if (step >= steps) clearInterval(timer);
            }, interval);
            return () => clearInterval(timer);
        }
    }, [statsRef.isInView]);

    // 🔒 Lock background scroll when lightbox is open
    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedService]);

    return (
        <div className="w-full">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=1200&q=80&auto=format&fit=crop"
                        alt="Masjid al-Haram, Makkah"
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

                <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 lg:py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-bold text-white">💼 Premium Pilgrimage Services</span>
                    </div>

                    {/* 🔹 HERO HEADING - Mobile optimized */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                        Everything You Need for
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            {' '}Sacred Journey
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-2">
                        Complete Umrah & Hajj services with visa assistance, premium hotels,
                        guided Ziyarat, and 24/7 support for a spiritually fulfilling pilgrimage.
                    </p>
                </div>
            </section>

            {/* ===== NEW: IMAGE CARDS SECTION (Tester wala) ===== */}
            <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
                <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#0f88c0]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-400/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                            <span className="text-lg sm:text-xl">🖼️</span>
                            <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                Service Gallery
                            </span>
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A192F] mb-4 sm:mb-5 leading-tight px-2">
                            Our{' '}
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Services
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full" />
                            </span>
                        </h2>

                        <p className="mt-3 sm:mt-4 text-gray-500 max-w-xl mx-auto text-base sm:text-lg px-2">
                            Click any image to view full details and contact us for booking.
                        </p>
                    </div>

                    {/* 🔹 Grid - Mobile: 1 col, md: 2 col, lg: 3 col */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {servicesImages.map((service, index) => (
                            <div
                                key={service.id}
                                onClick={() => setSelectedService(service)}
                                className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${index >= 3 ? 'animate-in fade-in zoom-in-95 duration-700' : ''}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* 🔹 Image height - Mobile: h-64, sm: h-72, md: h-80 */}
                                <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
                                    <Image
                                        src={service.src}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        priority={index < 3}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <span className="font-bold text-[#0A192F] flex items-center gap-2 text-sm sm:text-base">
                                                👁️ View Full Image
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#0A192F] group-hover:text-[#0f88c0] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRUST / STATS SECTION ===== */}
            <section ref={statsRef.ref} className="bg-[#0A192F] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-48 sm:h-64 bg-[#0f88c0]/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-2">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight">
                            Trusted by <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Thousands</span> of Pilgrims
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                            Our commitment to excellence has made us a leading Umrah & Hajj services provider
                        </p>
                    </div>

                    {/* 🔹 Stats Grid - Mobile: 2 cols with smaller gap */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {[
                            { val: animatedStats.pilgrims, suffix: '+', label: 'Pilgrims Served', icon: '🕋' },
                            { val: animatedStats.visas, suffix: '%', label: 'Visa Success Rate', icon: '🌍' },
                            { val: animatedStats.hotels, suffix: '+', label: 'Partner Hotels', icon: '🏨' },
                            { val: animatedStats.satisfaction, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer text-center"
                            >
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    {stat.val}{stat.suffix}
                                </p>
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 🔹 Grid - Mobile: stacked, lg: side by side, gap reduced */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                                <span className="text-lg sm:text-xl">✨</span>
                                <span className="text-sm sm:text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Why Choose Us
                                </span>
                            </span>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A192F] mb-4 sm:mb-6 leading-tight">
                                We Make Your{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Pilgrimage
                                </span>{' '}
                                Simple & Spiritual
                            </h2>

                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                With over a decade of experience in Umrah and Hajj services, we ensure every pilgrim receives personalized care, spiritual guidance, and seamless logistics.
                            </p>

                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { title: 'Sunnah-Compliant Services', desc: 'All services follow authentic Islamic teachings', icon: '📿' },
                                    { title: '24/7 Ground Support', desc: 'Always here when you need us in Makkah & Madinah', icon: '🎧' },
                                    { title: 'Transparent Pricing', desc: 'No hidden fees, complete financial clarity', icon: '💎' },
                                    { title: 'Expert Scholars', desc: 'Learn rituals from qualified Islamic scholars', icon: '🤲' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 sm:gap-4 group">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-emerald-400/10 flex items-center justify-center text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-base sm:text-lg font-bold text-[#0A192F] mb-1">{item.title}</h4>
                                            <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-4 lg:mt-0">
                            <div className="absolute -inset-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-3xl opacity-20 blur-2xl" />
                            <Image
                                src="https://images.pexels.com/photos/34246980/pexels-photo-34246980.jpeg"
                                alt="Masjid al-Haram"
                                width={800}
                                height={600}
                                className="relative rounded-2xl shadow-2xl w-full object-cover h-72 sm:h-80 md:h-96 lg:h-112"
                            />

                            {/* 🔹 Floating badge - Mobile par chhota */}
                            <div className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:-left-8 bg-[#0A192F] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/10">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#0f88c0] to-emerald-400 flex items-center justify-center text-white text-lg sm:text-2xl shrink-0">
                                        🏆
                                    </div>
                                    <div>
                                        <p className="text-lg sm:text-2xl font-black text-white">#1 Rated</p>
                                        <p className="text-xs sm:text-sm text-gray-400">Umrah Services 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 relative overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f88c0/10_0%,#0A192F_60%)]" />

                <div className="max-w-6xl mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* 🔹 Inner padding - Mobile: p-6, sm: p-10, md: p-16, lg: p-20 */}
                    <div className="relative z-10 p-6 sm:p-10 md:p-16 lg:p-20 text-center">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-sm sm:text-base font-bold text-white">Begin Your Journey</span>
                        </span>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                            Ready to Perform Your
                            <br className="hidden sm:block" />
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent"> Sacred Pilgrimage?</span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
                            Book your Umrah or Hajj with confidence. Our expert team is ready to guide you every step of the way.
                        </p>

                        {/* 🔹 Buttons - Mobile: full width stacked */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <Link
                                href="/packages"
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                View Packages
                            </Link>
                            <Link
                                href="/#contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Talk to an Expert
                            </Link>
                        </div>

                        {/* 🔹 Trust badges - Mobile: smaller gap, stack better */}
                        <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-300 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Visa Guaranteed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Best Price Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ FULL SCREEN LIGHTBOX (Tester wala) */}
            {selectedService && (
                <div
                    className="fixed inset-0 z-100 bg-[#0A192F]/98 backdrop-blur-xl overflow-y-auto"
                    onClick={() => setSelectedService(null)}
                >
                    {/* 🔹 Close button - Mobile par chhota aur close */}
                    <button
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-101 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 sm:p-3 transition-all hover:scale-110"
                        onClick={(e) => { e.stopPropagation(); setSelectedService(null); }}
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="min-h-screen flex flex-col items-center justify-start pt-20 sm:pt-24 pb-8 sm:pb-12 px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedService.src}
                            alt={selectedService.title}
                            width={2000}
                            height={1500}
                            className="w-auto max-w-full h-auto object-contain rounded-lg shadow-2xl border border-white/10"
                            priority
                            unoptimized
                        />
                        <div className="mt-6 sm:mt-10 text-center space-y-3 sm:space-y-4 max-w-3xl px-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedService.title}</h3>
                            <p className="text-sm sm:text-base text-gray-400">{selectedService.description}</p>
                            <p className="text-xs sm:text-sm text-gray-400">Scroll to view full details</p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                            >
                                Contact Us
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}