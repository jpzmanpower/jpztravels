'use client';
import Link from 'next/link';
import Topbar from '../components/topbar';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function TicketsPage() {
    const benefits = [
        { icon: '✈️', title: 'Premium Airlines', desc: 'Emirates, Qatar, Saudia, PIA & more with priority boarding & halal meals.' },
        { icon: '💰', title: 'Best Price Guarantee', desc: 'We compare 100+ airlines to secure the most competitive fares for pilgrims.' },
        { icon: '🔄', title: 'Flexible Changes', desc: 'Free date changes within policy. Transparent cancellation & refund terms.' },
        { icon: '👥', title: 'Group Discounts', desc: 'Special rates for families & groups of 3+ passengers with dedicated support.' }
    ];

    const steps = [
        { step: '01', title: 'Select Route', desc: 'Choose departure city, destination (Jeddah/Madinah), and travel dates.' },
        { step: '02', title: 'Confirm & Pay', desc: 'Pay via PKR card, bank transfer, or cash. Instant e-ticket confirmation.' },
        { step: '03', title: 'Travel Ready', desc: 'Receive visa-ready itinerary, baggage details, and 24/7 support access.' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION (Matches Insurance Theme) ===== */}
            <section className="bg-[#0A192F] py-20 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Best Deals on{' '}
                    <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                        Air Tickets
                    </span>
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Secure your spiritual journey with premium airlines, transparent pricing,
                    and hassle-free booking for Hajj, Umrah, and international travel.
                    Get visa-ready flight itineraries with 24/7 expert support.
                </p>
            </section>

            {/* ===== BENEFITS GRID ===== */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0A192F]">Why Book Flights With Us?</h2>
                    <p className="text-gray-500 text-sm mt-2">Trusted by thousands of pilgrims for reliable, affordable travel</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {benefits.map((item, i) => (
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
                    <h2 className="text-2xl font-bold text-[#0A192F] mb-8">Simple 3-Step Booking</h2>
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

            {/* ===== AIRLINE PARTNERS ===== */}
            <section className="py-12 px-4 border-t border-gray-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-xl font-bold text-[#0A192F] mb-4">Our Airline Partners</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-2xl mx-auto">
                        We work directly with top carriers for priority seating, extra baggage, and halal meal options.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Emirates', 'Qatar Airways', 'Saudia', 'PIA', 'Turkish Airlines', 'Etihad', 'FlyDubai'].map(airline => (
                            <span key={airline} className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 shadow-sm">
                                {airline}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION (Matches Insurance Theme - All links to /#contact) ===== */}
            <section className="bg-[#0A192F] py-16 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-black text-white mb-3">Need a Custom Flight Plan?</h2>
                    <p className="text-white/70 text-sm mb-6">
                        Our ticketing experts will find the best routes, handle visa-ready documentation,
                        and offer flexible payment plans for your pilgrimage.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {/* <Link href="/#contact" className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                            Get Quote & Book Now
                        </Link> */}
                        <Link href="/#contact" className="px-8 py-3 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                            Talk to an Agent
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}