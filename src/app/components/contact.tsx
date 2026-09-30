'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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

export default function ContactSection() {
    const { ref, isInView } = useInView();

    // Social Links with Exact Brand Colors as Background
    const socialLinks = [
        {
            name: 'YouTube',
            bgColor: '#FF0000',
            path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.504 3.545 12 3.545 12 3.545s-7.504 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.873.505 9.377.505 9.377.505s7.504 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
            href: 'https://www.youtube.com/@jpztravelsandmanpowerservices'
        },
        {
            name: 'TikTok',
            bgColor: '#000000',
            path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
            href: 'https://www.tiktok.com/@jpzmanpower'
        },
        {
            name: 'Instagram',
            bgColor: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
            href: 'https://www.instagram.com/jpz.travels'
        },
        {
            name: 'Facebook',
            bgColor: '#1877F2',
            path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
            href: 'https://www.facebook.com/jpzinternationaltravels/'
        },
    ];

    return (
        <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
            {/* Background - White Theme */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

            {/* ✅ WIDTH BARHA DI: max-w-5xl se max-w-7xl kar diya */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-emerald-100/50 border border-gray-100/50">
                        <span className="text-xl">🕋</span>
                        <span className="text-base font-bold text-[#0f88c0]">Contact Us</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Get In{' '}
                        <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Touch</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Ready to plan your Umrah or Hajj journey? Connect with us directly via WhatsApp or scan the QR code to start chatting instantly.
                    </p>
                </div>

                {/* Contact Cards Grid - Same Height */}
                <div className={`grid md:grid-cols-2 gap-8 items-stretch transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Left Card - WhatsApp Button & Contact Info */}
                    <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/30 overflow-hidden border border-gray-100 flex flex-col h-full">
                        {/* Top Gradient Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-transparent"></div>

                        <div className="p-8 md:p-10 flex flex-col items-center justify-between grow">
                            {/* Animated WhatsApp Button */}
                            <div className="relative flex justify-center items-center py-8 w-full mb-8">
                                {/* Animated background rings */}
                                <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
                                    <div className="absolute w-48 h-48 bg-green-400/20 rounded-full animate-ping"></div>
                                    <div className="absolute w-36 h-36 bg-green-500/30 rounded-full animate-pulse"></div>
                                </div>
                                {/* WhatsApp Button Link */}
                                <a
                                    href="https://wa.me/message/QU63HAS5NBOKF1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 flex items-center gap-4 px-8 py-5 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 group"
                                >
                                    <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>

                            {/* Contact Info */}
                            <div className="w-full space-y-4 grow flex flex-col justify-center">
                                {/* Phone Numbers */}
                                <div className="flex flex-col gap-3">
                                    <a href="tel:+923006407345" className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="font-semibold text-gray-700 group-hover:text-emerald-600">+92 300 6407345</span>
                                    </a>
                                    <a href="tel:+923004007345" className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="font-semibold text-gray-700 group-hover:text-emerald-600">+92 300 4007345</span>
                                    </a>
                                </div>

                                {/* Email */}
                                <a href="mailto:Info@jpztravel.com" className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl hover:bg-sky-50 hover:text-[#0f88c0] transition-all group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0f88c0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold text-gray-700 group-hover:text-[#0f88c0] text-sm md:text-base">Info@jpztravel.com</span>
                                </a>

                                {/* Support Badge */}
                                <div className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-50 to-sky-50 rounded-2xl border border-emerald-100">
                                    <span className="text-2xl"></span>
                                    <span className="font-bold text-gray-700">24/7 Makkah Support Available</span>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex items-center justify-center gap-3 pt-2">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            className="w-11 h-11 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
                                            style={{
                                                background: social.bgColor,
                                            }}
                                        >
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d={social.path} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>

                                {/* Strong SEO backlinks: SyncOps + CEO Majid Ali */}
                                <div className="pt-4 mt-2 border-t border-gray-100 text-center space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <a
                                            href="https://syncops.tech"
                                            target="_blank"
                                            rel="noopener"
                                            title="Built by SyncOps — AI-Powered Software Solutions & Enterprise Development | syncops.tech"
                                            className="font-bold text-[#0f88c0] hover:text-sky-600 underline underline-offset-2 decoration-[#0f88c0]/40 hover:decoration-[#0f88c0] transition-colors"
                                        >
                                            Built by SyncOps
                                        </a>
                                    </p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Website by{' '}
                                        <a
                                            href="https://syncops.tech"
                                            target="_blank"
                                            rel="noopener"
                                            title="SyncOps — AI software development company | syncops.tech"
                                            className="font-semibold text-gray-700 hover:text-[#0f88c0] transition-colors"
                                        >
                                            SyncOps
                                        </a>
                                        {' · '}
                                        <a
                                            href="https://majidali.tech"
                                            target="_blank"
                                            rel="noopener"
                                            title="Majid Ali — Founder & CEO of SyncOps | majidali.tech"
                                            className="font-semibold text-gray-700 hover:text-[#0f88c0] transition-colors"
                                        >
                                            Majid Ali, Founder &amp; CEO
                                        </a>
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                        <a
                                            href="https://syncops.tech"
                                            target="_blank"
                                            rel="noopener"
                                            className="hover:text-[#0f88c0] transition-colors"
                                        >
                                            syncops.tech
                                        </a>
                                        {' · '}
                                        <a
                                            href="https://majidali.tech"
                                            target="_blank"
                                            rel="noopener"
                                            className="hover:text-[#0f88c0] transition-colors"
                                        >
                                            majidali.tech
                                        </a>
                                        {' · '}
                                        <Link
                                            href="/built-by-syncops"
                                            title="About SyncOps and Majid Ali — team behind JPZ Travel"
                                            className="hover:text-[#0f88c0] transition-colors"
                                        >
                                            About the builders
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0]"></div>
                    </div>

                    {/* Right Card - QR Code */}
                    <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/30 overflow-hidden border border-gray-100 flex flex-col h-full">
                        {/* Top Gradient Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent"></div>

                        <div className="p-8 md:p-10 flex flex-col items-center justify-between grow">
                            {/* QR Code Title */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-[#0A192F] mb-2">Scan to Chat</h3>
                                <p className="text-gray-500 text-center">Scan the QR code to instantly connect with us on WhatsApp</p>
                            </div>

                            {/* QR Code Image with Animation */}
                            <div className="relative mb-8 grow flex items-center justify-center">
                                {/* Animated border glow */}
                                <div className="absolute -inset-2 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                                {/* QR Code */}
                                <div className="relative bg-white p-4 rounded-2xl shadow-xl border-2 border-gray-100">
                                    <img
                                        src="/qr-cd.jpg"
                                        alt="WhatsApp QR Code - Jpz Travel & Manpower Services"
                                        className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-xl"
                                    />
                                    {/* WhatsApp Icon Overlay */}
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-linear-to-r from-green-500 to-emerald-600 p-3 rounded-full shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="text-center space-y-2 mt-4">
                                <p className="text-sm text-gray-500">Or click the button to chat directly</p>
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span>Instant Response Guaranteed</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-1 bg-linear-to-r from-emerald-400 via-[#0f88c0] to-emerald-400"></div>
                    </div>
                </div>

                {/* ============ GOOGLE MAP - OFFICE LOCATION (WIDER) ============ */}
                <div className={`mt-16 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Heading Badge */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-lg shadow-emerald-100/50 border border-gray-100/50">
                            <span className="text-xl">📍</span>
                            <span className="text-base font-bold text-[#0f88c0]">Our Office Location</span>
                        </div>
                    </div>

                    {/* Map Container - Full Width of max-w-7xl */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/40 border border-gray-100 h-100 md:h-125">
                        <iframe
                            src="https://maps.google.com/maps?q=Jpz%20Travel%20%26%20Manpower%20Services%2C%20Jinnah%20Stadium%2C%20Civil%20Lines%2C%20Gujranwala%2C%20Pakistan&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Jpz Travel & Manpower Services - Office Location"
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>
                {/* ============ MAP END ============ */}

            </div>
        </section>
    );
}