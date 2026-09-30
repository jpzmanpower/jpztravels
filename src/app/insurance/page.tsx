'use client';
import Link from 'next/link';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function InsurancePage() {
    const coverage = [
        { icon: '🏥', title: 'Medical Emergencies', desc: 'Full coverage for hospital visits, prescriptions, and emergency treatments in Saudi Arabia.' },
        { icon: '✈️', title: 'Flight & Trip Cancellation', desc: 'Reimbursement for non-refundable costs if your journey is delayed or cancelled unexpectedly.' },
        { icon: '🧳', title: 'Baggage & Personal Items', desc: 'Protection against lost, stolen, or damaged luggage during your entire pilgrimage.' },
        { icon: '🆘', title: '24/7 Global Assistance', desc: 'Dedicated support line for medical referrals, legal aid, and emergency coordination.' }
    ];

    const steps = [
        { step: '01', title: 'Choose Plan', desc: 'Select basic or premium coverage based on your travel dates and needs.' },
        { step: '02', title: 'Secure Payment', desc: 'Quick checkout with instant policy confirmation via email & SMS.' },
        { step: '03', title: 'Travel Worry-Free', desc: 'Your digital policy is active from departure to your safe return home.' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION (Matches Guidance Theme) ===== */}
            <section className="bg-[#0A192F] py-20 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Secure Your Journey with{' '}
                    <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                        Travel Insurance
                    </span>
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Comprehensive coverage designed specifically for Hajj & Umrah pilgrims.
                    Travel with complete peace of mind knowing you and your family are protected against unexpected events.
                </p>
            </section>

            {/* ===== WHAT'S COVERED ===== */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0A192F]">What's Covered?</h2>
                    <p className="text-gray-500 text-sm mt-2">Everything you need for a stress-free spiritual journey</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {coverage.map((item, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 group">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="font-bold text-[#0A192F] mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-[#0A192F] mb-8">How It Works</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {steps.map((s, i) => (
                            <div key={i} className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-10 h-10 rounded-full bg-[#0f88c0]/10 text-[#0f88c0] font-bold flex items-center justify-center mx-auto mb-3">
                                    {s.step}
                                </div>
                                <h4 className="font-bold text-[#0A192F] mb-1">{s.title}</h4>
                                <p className="text-xs text-gray-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION (All links point to /#) ===== */}
            <section className="bg-[#0A192F] py-16 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-black text-white mb-3">Need More Information?</h2>
                    <p className="text-white/70 text-sm mb-6">
                        Contact our insurance experts for personalized quotes, policy details, and instant booking assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/#contact" className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                            Get Quote & Book Now
                        </Link>
                        {/* <Link href="/#contact" className="px-8 py-3 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                            Talk to an Expert
                        </Link> */}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}