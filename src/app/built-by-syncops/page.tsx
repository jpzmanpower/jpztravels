'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useInView } from '../hooks/useInView';

const services = [
    {
        title: 'AI Solutions',
        desc: 'GenAI automation, predictive insights, and intelligent agents.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Custom Software',
        desc: 'Products from concept to production — MVPs in weeks.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Web Development',
        desc: 'High-performance apps with Next.js and modern stacks.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Mobile Apps',
        desc: 'iOS & Android experiences that convert and retain.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Cloud & DevOps',
        desc: 'AWS, Azure, GCP with CI/CD and auto-scaling.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Cybersecurity',
        desc: 'Threat modeling, compliance, and continuous protection.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Data Analytics',
        desc: 'BI dashboards that turn data into decisions.',
        href: 'https://syncops.tech/services',
    },
    {
        title: 'Digital Transformation',
        desc: 'Legacy modernization and system integration.',
        href: 'https://syncops.tech/services',
    },
];

const pillars = [
    {
        label: 'Build',
        title: 'Idea to launch',
        desc: 'Custom software with production-ready MVP in 4–6 weeks.',
        meta: '2–4 Weeks Discovery',
    },
    {
        label: 'Automate',
        title: 'AI that works',
        desc: 'Agents and automation that cut manual work by up to 80%.',
        meta: 'SOC2 Ready',
    },
    {
        label: 'Scale',
        title: 'Cloud-native',
        desc: 'Infrastructure that grows with you — 99.9% uptime.',
        meta: '99.9% Uptime',
    },
];

const caseStudies = [
    { name: 'SyncPeople', focus: 'AI HR Platform', desc: 'Workforce ops and role-based intelligence.' },
    { name: 'MediMind AI', focus: 'Medical Assistant', desc: '~50% less charting with AI prescriptions.' },
    { name: 'SyncIQ', focus: 'Ops Intelligence', desc: 'Audit automation and real-time risk analytics.' },
    { name: 'SmartProperty AI', focus: 'Real Estate AI', desc: 'Predictions and blockchain verification.' },
];

const techStack = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', '.NET',
    'PostgreSQL', 'MongoDB', 'AWS', 'Azure', 'GCP', 'Tailwind CSS',
];

export default function BuiltBySyncopsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const founderRef = useInView(0.15);
    const servicesRef = useInView(0.1);
    const pillarsRef = useInView(0.15);
    const casesRef = useInView(0.1);
    const ctaRef = useInView(0.2);
    const statsRef = useInView(0.2);
    const [stats, setStats] = useState({ projects: 0, uptime: 0, rating: 0, integrations: 0 });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!statsRef.isInView) return;
        const duration = 1600;
        const steps = 48;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const t = 1 - Math.pow(1 - step / steps, 3);
            setStats({
                projects: Math.floor(50 * t),
                uptime: Math.min(99.5, +(99.5 * t).toFixed(1)),
                rating: Math.min(9.9, +(9.9 * t).toFixed(1)),
                integrations: Math.floor(25 * t),
            });
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, [statsRef.isInView]);

    return (
        <div className="w-full bg-[#050d1a]">
            <Topbar />
            <Navbar />

            {/* ===== HERO — single CEO image ===== */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(15,136,192,0.28),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(16,185,129,0.12),transparent_40%),linear-gradient(165deg,#050d1a,#0A192F_60%,#071525)]" />
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                            backgroundSize: '48px 48px',
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-12">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        <div
                            className={`lg:col-span-7 transition-all duration-700 ease-out ${
                                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            <a
                                href="https://syncops.tech"
                                target="_blank"
                                rel="noopener"
                                title="SyncOps — AI-Powered Software Solutions"
                                className="inline-flex items-center gap-2 text-[#0f88c0] font-semibold tracking-[0.22em] uppercase text-[11px] sm:text-xs mb-3 hover:text-sky-300 transition-colors"
                            >
                                SyncOps · syncops.tech
                            </a>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] tracking-tight mb-3">
                                Building secure,{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                                    scalable, intelligent products
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-white/65 max-w-lg leading-relaxed mb-6">
                                This{' '}
                                <Link href="/" className="text-white/85 hover:text-[#0f88c0] transition-colors">
                                    JPZ Travel
                                </Link>{' '}
                                experience was engineered by{' '}
                                <a
                                    href="https://syncops.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-[#0f88c0] font-semibold hover:text-sky-300 underline underline-offset-2 decoration-[#0f88c0]/40"
                                >
                                    SyncOps
                                </a>{' '}
                                — enterprise software, AI automation, and cloud platforms built for scale.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href="https://syncops.tech"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit SyncOps official website"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f88c0] hover:bg-sky-500 text-white text-sm font-bold rounded-full transition-all duration-300 hover:scale-[1.02] shadow-md shadow-[#0f88c0]/25"
                                >
                                    Visit SyncOps
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="https://majidali.tech"
                                    target="_blank"
                                    rel="noopener"
                                    title="Majid Ali — Founder & CEO portfolio"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/85 hover:border-[#0f88c0] hover:text-white text-sm font-semibold rounded-full transition-all duration-300"
                                >
                                    majidali.tech
                                </a>
                            </div>
                        </div>

                        <div
                            className={`lg:col-span-5 transition-all duration-700 delay-150 ${
                                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            <figure className="relative mx-auto max-w-[280px] sm:max-w-[320px] lg:max-w-none">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                                    <Image
                                        src="/syncops-ceo.png"
                                        alt="Majid Ali — Founder & CEO of SyncOps | majidali.tech"
                                        fill
                                        priority
                                        className="object-cover object-top"
                                        sizes="(max-width: 1024px) 320px, 380px"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#050d1a]/95 via-transparent to-transparent" />
                                    <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                                        <a
                                            href="https://majidali.tech"
                                            target="_blank"
                                            rel="noopener"
                                            className="group block"
                                        >
                                            <p className="text-white font-bold text-base group-hover:text-[#0f88c0] transition-colors">
                                                Majid Ali
                                            </p>
                                            <p className="text-[#0f88c0] text-xs font-medium mt-0.5">
                                                Founder & CEO · SyncOps
                                            </p>
                                            <p className="text-white/45 text-[11px] mt-1 group-hover:text-white/70 transition-colors">
                                                majidali.tech ↗
                                            </p>
                                        </a>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section ref={statsRef.ref} className="border-y border-white/5 bg-[#0A192F]/70" aria-label="SyncOps metrics">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[
                            { value: `${stats.projects}+`, label: 'Projects' },
                            { value: `${stats.uptime}%`, label: 'Uptime' },
                            { value: `${stats.rating}/10`, label: 'Client Rating' },
                            { value: `${stats.integrations}+`, label: 'Integrations' },
                        ].map((item) => (
                            <div key={item.label} className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{item.value}</p>
                                <p className="mt-0.5 text-[11px] text-white/45 uppercase tracking-wider">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FOUNDER (no duplicate image) ===== */}
            <section
                ref={founderRef.ref}
                className="relative py-12 sm:py-14 overflow-hidden"
                aria-labelledby="founder-heading"
            >
                <div
                    className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-600 ${
                        founderRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start border-l-2 border-[#0f88c0] pl-5 sm:pl-6">
                        <div className="lg:col-span-4">
                            <p className="text-[#0f88c0] font-semibold tracking-[0.18em] uppercase text-[10px] mb-2">
                                Leadership
                            </p>
                            <h2 id="founder-heading" className="text-2xl sm:text-3xl font-black text-white leading-tight">
                                Led by{' '}
                                <a
                                    href="https://majidali.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent hover:opacity-90"
                                >
                                    Majid Ali
                                </a>
                            </h2>
                            <p className="text-sm text-white/50 mt-2">
                                Founder & CEO · 10+ years
                            </p>
                        </div>
                        <div className="lg:col-span-8 space-y-4">
                            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                                <a
                                    href="https://majidali.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-white font-semibold hover:text-[#0f88c0] transition-colors"
                                >
                                    Majid Ali
                                </a>{' '}
                                founded{' '}
                                <a
                                    href="https://syncops.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-[#0f88c0] font-semibold hover:text-sky-300"
                                >
                                    SyncOps
                                </a>{' '}
                                as a global engineering studio for AI-ready products. JPZ Travel is one of those
                                launches — secure, fast, and built for real operators. Explore his work at{' '}
                                <a
                                    href="https://majidali.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-[#0f88c0] underline underline-offset-2 decoration-[#0f88c0]/35 hover:decoration-[#0f88c0]"
                                >
                                    majidali.tech
                                </a>{' '}
                                and the full studio at{' '}
                                <a
                                    href="https://syncops.tech"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-[#0f88c0] underline underline-offset-2 decoration-[#0f88c0]/35 hover:decoration-[#0f88c0]"
                                >
                                    syncops.tech
                                </a>
                                .
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: 'Enterprise Software', href: 'https://syncops.tech' },
                                    { label: 'AI-First Delivery', href: 'https://syncops.tech/services' },
                                    { label: 'Full-Stack · majidali.tech', href: 'https://majidali.tech' },
                                ].map((chip) => (
                                    <a
                                        key={chip.label}
                                        href={chip.href}
                                        target="_blank"
                                        rel="noopener"
                                        className="px-3 py-1.5 text-xs text-white/70 border border-white/10 rounded-full bg-white/[0.03] hover:border-[#0f88c0]/50 hover:text-white transition-colors"
                                    >
                                        {chip.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PILLARS ===== */}
            <section ref={pillarsRef.ref} className="relative py-12 sm:py-14 bg-[#071525]">
                <div
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-600 ${
                        pillarsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                        <div>
                            <p className="text-emerald-400 font-semibold tracking-[0.18em] uppercase text-[10px] mb-1.5">
                                From build to scale
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">
                                How{' '}
                                <a href="https://syncops.tech" target="_blank" rel="noopener" className="hover:text-[#0f88c0] transition-colors">
                                    SyncOps
                                </a>{' '}
                                delivers
                            </h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {pillars.map((pillar, i) => (
                            <div key={pillar.label} className="group relative">
                                <span className="text-5xl font-black text-white/[0.05] absolute -top-1 left-0 select-none">
                                    0{i + 1}
                                </span>
                                <p className="relative text-[#0f88c0] font-bold tracking-widest uppercase text-[11px] mb-1.5">
                                    {pillar.label}
                                </p>
                                <h3 className="relative text-lg font-bold text-white mb-1.5">{pillar.title}</h3>
                                <p className="relative text-sm text-white/50 leading-relaxed mb-2">{pillar.desc}</p>
                                <p className="relative text-xs font-semibold text-emerald-400/85">{pillar.meta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section ref={servicesRef.ref} className="relative py-12 sm:py-14" aria-labelledby="services-heading">
                <div
                    className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-600 ${
                        servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                        <div>
                            <p className="text-[#0f88c0] font-semibold tracking-[0.18em] uppercase text-[10px] mb-1.5">
                                Services
                            </p>
                            <h2 id="services-heading" className="text-2xl sm:text-3xl font-black text-white">
                                SyncOps software services
                            </h2>
                        </div>
                        <a
                            href="https://syncops.tech/services"
                            target="_blank"
                            rel="noopener"
                            title="SyncOps services — AI, cloud, custom software"
                            className="inline-flex items-center gap-1.5 text-sm text-[#0f88c0] font-semibold hover:text-sky-300 transition-colors"
                        >
                            All services on syncops.tech
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                        {services.map((service) => (
                            <a
                                key={service.title}
                                href={service.href}
                                target="_blank"
                                rel="noopener"
                                title={`${service.title} by SyncOps`}
                                className="group block border-t border-white/10 pt-3.5 hover:border-[#0f88c0] transition-colors"
                            >
                                <h3 className="text-[15px] font-bold text-white group-hover:text-[#0f88c0] transition-colors mb-1">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-white/45 leading-relaxed">{service.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CASE STUDIES ===== */}
            <section ref={casesRef.ref} className="relative py-12 sm:py-14 bg-[#071525]">
                <div
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-600 ${
                        casesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <div className="mb-7">
                        <p className="text-emerald-400 font-semibold tracking-[0.18em] uppercase text-[10px] mb-1.5">
                            Case studies
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">
                            Products by{' '}
                            <a href="https://syncops.tech" target="_blank" rel="noopener" className="hover:text-[#0f88c0] transition-colors">
                                SyncOps
                            </a>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {caseStudies.map((study, i) => (
                            <a
                                key={study.name}
                                href="https://syncops.tech"
                                target="_blank"
                                rel="noopener"
                                className="pl-4 border-l-2 border-[#0f88c0]/35 hover:border-[#0f88c0] transition-colors py-1 block group"
                            >
                                <span className="text-[10px] font-bold text-[#0f88c0]/70 tracking-widest">0{i + 1}</span>
                                <h3 className="text-base font-bold text-white mt-0.5 group-hover:text-[#0f88c0] transition-colors">
                                    {study.name}
                                </h3>
                                <p className="text-xs text-emerald-400/90 font-medium">{study.focus}</p>
                                <p className="text-white/45 text-xs mt-1.5 leading-relaxed">{study.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TECH ===== */}
            <section className="relative py-8 sm:py-10 border-y border-white/5">
                <p className="text-center text-white/35 text-[10px] uppercase tracking-[0.22em] font-semibold mb-5">
                    Technology suite ·{' '}
                    <a href="https://syncops.tech" target="_blank" rel="noopener" className="hover:text-[#0f88c0] transition-colors">
                        SyncOps
                    </a>
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium text-white/60 bg-white/[0.03] border border-white/10 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* ===== SEO / BACKLINK HUB ===== */}
            <section className="py-10 sm:py-12" aria-label="SyncOps and Majid Ali official links">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <a
                            href="https://syncops.tech"
                            target="_blank"
                            rel="noopener"
                            title="SyncOps — AI-Powered Software Solutions & Enterprise Development"
                            className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#0f88c0]/50 transition-all"
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-[#0f88c0] font-semibold mb-1">
                                    Official site
                                </p>
                                <p className="text-white font-bold group-hover:text-[#0f88c0] transition-colors">
                                    SyncOps · syncops.tech
                                </p>
                                <p className="text-xs text-white/40 mt-0.5">
                                    AI software · enterprise development · cloud
                                </p>
                            </div>
                            <span className="text-white/30 group-hover:text-[#0f88c0] text-lg" aria-hidden>↗</span>
                        </a>
                        <a
                            href="https://majidali.tech"
                            target="_blank"
                            rel="noopener"
                            title="Majid Ali — Full-Stack Developer & SyncOps CEO"
                            className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition-all"
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                                    Founder portfolio
                                </p>
                                <p className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                                    Majid Ali · majidali.tech
                                </p>
                                <p className="text-xs text-white/40 mt-0.5">
                                    10+ years · full-stack · AI products
                                </p>
                            </div>
                            <span className="text-white/30 group-hover:text-emerald-400 text-lg" aria-hidden>↗</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section ref={ctaRef.ref} className="relative py-14 sm:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,136,192,0.18),transparent_55%)]" />
                <div
                    className={`relative max-w-2xl mx-auto px-4 text-center transition-all duration-600 ${
                        ctaRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <p className="text-[#0f88c0] font-semibold tracking-[0.18em] uppercase text-[10px] mb-2">
                        Ready to build?
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                        Partner with SyncOps
                    </h2>
                    <p className="text-white/50 text-sm mb-7 max-w-md mx-auto">
                        Free consult · Mumtaz Market, Gujranwala · Clutch · Crunchbase · Trustpilot
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <a
                            href="https://syncops.tech"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-500 text-white text-sm font-bold rounded-full hover:scale-[1.02] transition-transform shadow-lg shadow-[#0f88c0]/20"
                        >
                            Explore syncops.tech
                        </a>
                        <a
                            href="https://majidali.tech"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white text-sm font-semibold rounded-full hover:border-emerald-400/50 transition-colors"
                        >
                            Meet Majid Ali
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-white/40">
                        <a href="mailto:info@syncops.tech" className="hover:text-[#0f88c0] transition-colors">
                            info@syncops.tech
                        </a>
                        <a href="tel:+923018678319" className="hover:text-[#0f88c0] transition-colors">
                            +92 301 8678319
                        </a>
                    </div>
                    <div className="mt-7">
                        <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                            ← Back to JPZ Travel
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
