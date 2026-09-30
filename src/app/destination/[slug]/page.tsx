'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Topbar from '../../components/topbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// ✅ Updated Islamic Destinations Data (Only requested 9 destinations)
const destinationsData: Record<string, any> = {
    'makkah': {
        name: 'Makkah',
        subtitle: 'Masjid al-Haram',
        category: 'Holy Cities',
        image: 'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=1200&q=80&auto=format&fit=crop',
        description: 'The holiest city in Islam, home to Masjid al-Haram and the Kaaba. Every year, millions of Muslims from around the world come to perform Hajj and Umrah.',
        bestTime: 'Year Round (Ramadan is special)',
        temperature: '25°C - 45°C',
        distance: 'Center',
        tags: ['Kaaba', 'Hajj', 'Umrah', 'Masjid al-Haram'],
        rating: 5.0,
        reviews: 15847,
        highlights: [
            { icon: '🕋', title: 'The Kaaba', desc: 'The sacred house of Allah, direction of prayer for all Muslims' },
            { icon: '🕌', title: 'Masjid al-Haram', desc: 'The largest mosque in the world surrounding the Kaaba' },
            { icon: '⛰️', title: 'Safa & Marwa', desc: 'Two hills between which pilgrims walk during Hajj and Umrah' },
            { icon: '💧', title: 'Zamzam Well', desc: 'Sacred water source that has flowed for thousands of years' },
        ],
        activities: [
            { name: 'Perform Umrah', price: 'Free', duration: '2-4 hours', image: 'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=400&q=80' },
            { name: 'Tawaf & Sa\'i', price: 'Free', duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&q=80' },
            { name: 'Night Prayer (Tahajjud)', price: 'Free', duration: '2 hours', image: 'https://images.pexels.com/photos/12613484/pexels-photo-12613484.jpeg?w=400&q=60' },
            { name: 'Drink Zamzam Water', price: 'Free', duration: '15 mins', image: 'https://images.pexels.com/photos/8865389/pexels-photo-8865389.jpeg?w=400&q=60' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=400&q=80',
            'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&q=80',
            'https://images.pexels.com/photos/12613484/pexels-photo-12613484.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/8865389/pexels-photo-8865389.jpeg?w=400&q=60',
        ]
    },
    'madinah': {
        name: 'Madinah',
        subtitle: 'Masjid an-Nabawi',
        category: 'Holy Cities',
        image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=1200&q=80&auto=format&fit=crop',
        description: 'City of the Prophet ﷺ, featuring the blessed Masjid an-Nabawi. The second holiest city in Islam where Prophet Muhammad ﷺ is buried.',
        bestTime: 'Year Round',
        temperature: '20°C - 42°C',
        distance: '340 km from Makkah',
        tags: ["Prophet's Mosque", 'Ziyarat', 'Peace', 'Islamic History'],
        rating: 5.0,
        reviews: 12456,
        highlights: [
            { icon: '🕌', title: 'Masjid an-Nabawi', desc: "The Prophet's Mosque with the iconic Green Dome" },
            { icon: '🕊️', title: 'Rawdah', desc: 'Garden of Paradise between the Prophet\'s house and minbar' },
            { icon: '📚', title: 'Quba Mosque', desc: 'The first mosque built in Islam' },
            { icon: '⛰️', title: 'Mount Uhud', desc: 'Site of the famous Battle of Uhud and martyrs' },
        ],
        activities: [
            { name: 'Pray at Masjid an-Nabawi', price: 'Free', duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=400&q=80' },
            { name: 'Visit Quba Mosque', price: 'Free', duration: '1-2 hours', image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60' },
            { name: 'Mount Uhud Visit', price: 'Free', duration: '2-3 hours', image: 'https://images.pexels.com/photos/12607980/pexels-photo-12607980.jpeg?w=400&q=60' },
            { name: 'Seven Mosques Tour', price: 'Free', duration: '3-4 hours', image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=400&q=80' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=400&q=80',
            'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/12607980/pexels-photo-12607980.jpeg?w=400&q=60',
            'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=400&q=80',
        ]
    },
    'jeddah': {
        name: 'Jeddah',
        subtitle: 'Gateway to Makkah',
        category: 'Nearby Cities',
        image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=1200&q=80&auto=format&fit=crop',
        description: 'Main entry point for pilgrims with modern amenities and historical sites. Known as the Bride of the Red Sea.',
        bestTime: 'Nov - Mar',
        temperature: '18°C - 38°C',
        distance: '80 km from Makkah',
        tags: ['Airport', 'Shopping', 'Red Sea', 'Historical'],
        rating: 4.7,
        reviews: 5632,
        highlights: [
            { icon: '🏛️', title: 'Al-Balad', desc: 'Historical old town with traditional architecture' },
            { icon: '🌊', title: 'Red Sea Corniche', desc: 'Beautiful waterfront with sculptures and fountains' },
            { icon: '🛍️', title: 'Shopping Malls', desc: 'Modern shopping centers and traditional souqs' },
            { icon: '✈️', title: 'King Abdulaziz Airport', desc: 'Main gateway for Hajj pilgrims' },
        ],
        activities: [
            { name: 'Al-Balad Walking Tour', price: 'Free', duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80' },
            { name: 'Red Sea Diving', price: '$120', duration: '4 hours', image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80' },
            { name: 'Corniche Visit', price: 'Free', duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80' },
            { name: 'Floating Mosque', price: 'Free', duration: '1 hour', image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80',
            'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80',
            'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80',
            'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=400&q=80',
        ]
    },
    'arafat': {
        name: 'Arafat',
        subtitle: 'Mount of Mercy',
        category: 'Ziyarat Locations',
        image: 'https://images.pexels.com/photos/12765598/pexels-photo-12765598.jpeg?w=1200&q=60&auto=format&fit=crop',
        description: 'The most important Hajj site where pilgrims stand in prayer on the Day of Arafah. Where Prophet Muhammad ﷺ delivered his farewell sermon.',
        bestTime: '9th Dhul Hijjah',
        temperature: '25°C - 45°C',
        distance: '20 km from Makkah',
        tags: ['Day of Arafah', 'Hajj Peak', 'Dua', 'Mount of Mercy'],
        rating: 5.0,
        reviews: 9234,
        highlights: [
            { icon: '⛰️', title: 'Jabal al-Rahmah', desc: 'Mount of Mercy where Prophet ﷺ stood' },
            { icon: '🤲', title: 'Standing in Arafah', desc: 'Most important Hajj ritual on 9th Dhul Hijjah' },
            { icon: '📿', title: 'Day of Dua', desc: 'Best day for supplication and forgiveness' },
            { icon: '🕌', title: 'Namira Mosque', desc: 'Where Prophet ﷺ delivered farewell sermon' },
        ],
        activities: [
            { name: 'Wuquf at Arafat', price: 'Free', duration: 'Full day', image: 'https://images.pexels.com/photos/30698852/pexels-photo-30698852.jpeg' },
            { name: 'Climb Mount of Mercy', price: 'Free', duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1650446647974-451d05d2136d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJhZmF0fGVufDB8fDB8fHww' },
            { name: 'Visit Namira Mosque', price: 'Free', duration: '1 hour', image: 'https://images.pexels.com/photos/30698859/pexels-photo-30698859.jpeg' },
            { name: 'Dua & Dhikr', price: 'Free', duration: 'All day', image: 'https://images.pexels.com/photos/12765598/pexels-photo-12765598.jpeg?w=400&q=60' },
        ],
        gallery: [
            'https://images.pexels.com/photos/30698852/pexels-photo-30698852.jpeg',
            'https://images.unsplash.com/photo-1650446647974-451d05d2136d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJhZmF0fGVufDB8fDB8fHww',
            'https://images.pexels.com/photos/30698859/pexels-photo-30698859.jpeg',
            'https://images.pexels.com/photos/12765598/pexels-photo-12765598.jpeg?w=400&q=60',
        ]
    },
    'muzdalifah': {
        name: 'Muzdalifah',
        subtitle: 'Open-Air Sanctuary',
        category: 'Ziyarat Locations',
        image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=1200&q=60&auto=format&fit=crop',
        description: 'Where pilgrims collect pebbles for Jamarat and spend the night. An essential stop between Arafat and Mina during Hajj.',
        bestTime: 'Night of 10th Dhul Hijjah',
        temperature: '24°C - 44°C',
        distance: 'Between Mina & Arafat',
        tags: ['Overnight Stay', 'Pebbles Collection', 'Hajj', 'Sacred Valley'],
        rating: 4.8,
        reviews: 5432,
        highlights: [
            { icon: '🌙', title: 'Night Prayer', desc: 'Combine Maghrib and Isha prayers' },
            { icon: '🪨', title: 'Pebble Collection', desc: 'Collect 49-70 pebbles for Jamarat' },
            { icon: '⭐', title: 'Under the Stars', desc: 'Open-air worship under the night sky' },
            { icon: '🕋', title: 'Al-Mashar al-Haram', desc: 'Sacred monument area' },
        ],
        activities: [
            { name: 'Collect Pebbles', price: 'Free', duration: '1-2 hours', image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60' },
            { name: 'Night Prayer', price: 'Free', duration: 'Evening', image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60' },
            { name: 'Hajj Rituals', price: 'Free', duration: 'Overnight', image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60' },
            { name: 'Reflection & Dhikr', price: 'Free', duration: 'Night', image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60' },
        ],
        gallery: [
            'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?w=400&q=60',
        ]
    },
    'quba-mosque': {
        name: 'Quba Mosque',
        subtitle: 'First Mosque in Islam',
        category: 'Historical Sites',
        image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=1200&q=60&auto=format&fit=crop',
        description: 'The first mosque built by Prophet ﷺ, prayer here equals Umrah. A blessed place with immense spiritual significance.',
        bestTime: 'Saturday Morning',
        temperature: '20°C - 42°C',
        distance: '3 km from Masjid Nabawi',
        tags: ['Sunnah Prayer', 'Historic', 'Madinah', 'First Mosque'],
        rating: 4.9,
        reviews: 8765,
        highlights: [
            { icon: '🕌', title: 'First Mosque', desc: 'Built by Prophet ﷺ upon arrival in Madinah' },
            { icon: '🤲', title: 'Special Prayer', desc: 'Prayer here equals the reward of Umrah' },
            { icon: '📚', title: 'Islamic History', desc: 'Rich 1400+ years of history' },
            { icon: '✨', title: 'Beautiful Architecture', desc: 'Modern expansion with traditional elements' },
        ],
        activities: [
            { name: 'Prayer at Quba', price: 'Free', duration: '1-2 hours', image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60' },
            { name: 'Historical Tour', price: 'Free', duration: '1 hour', image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60' },
            { name: 'Learn History', price: 'Free', duration: '30 mins', image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60' },
            { name: 'Photography', price: 'Free', duration: '30 mins', image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60' },
        ],
        gallery: [
            'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60',
            'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?w=400&q=60',
        ]
    },
    'istanbul': {
        name: 'Istanbul',
        subtitle: 'Turkey',
        category: 'International',
        image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80&auto=format&fit=crop',
        description: 'Historic city bridging Europe and Asia, home to magnificent mosques like the Blue Mosque and Hagia Sophia, offering a rich blend of Islamic and Ottoman heritage.',
        bestTime: 'Apr - Oct',
        temperature: '10°C - 28°C',
        distance: 'International',
        tags: ['Blue Mosque', 'Hagia Sophia', 'Bosphorus', 'Islamic History'],
        rating: 4.9,
        reviews: 12500,
        highlights: [
            { icon: '🕌', title: 'Blue Mosque', desc: 'Stunning 17th-century mosque with six minarets' },
            { icon: '🏛️', title: 'Hagia Sophia', desc: 'Masterpiece of Byzantine and Ottoman architecture' },
            { icon: '🌊', title: 'Bosphorus Strait', desc: 'Scenic waterway dividing Europe and Asia' },
            { icon: '🛍️', title: 'Grand Bazaar', desc: 'One of the largest and oldest covered markets' },
        ],
        activities: [
            { name: 'Blue Mosque Tour', price: 'Free', duration: '2 hours', image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80' },
            { name: 'Bosphorus Cruise', price: '$30', duration: '2 hours', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80' },
            { name: 'Grand Bazaar Shopping', price: 'Free', duration: '3 hours', image: 'https://images.pexels.com/photos/37805690/pexels-photo-37805690.jpeg' },
            { name: 'Hagia Sophia Visit', price: '$25', duration: '1.5 hours', image: 'https://images.pexels.com/photos/9406839/pexels-photo-9406839.jpeg' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80',
            'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80',
            'https://images.pexels.com/photos/37805690/pexels-photo-37805690.jpeg',
            'https://images.pexels.com/photos/9406839/pexels-photo-9406839.jpeg',
        ]
    },
    'dubai': {
        name: 'Dubai',
        subtitle: 'United Arab Emirates',
        category: 'International',
        image: 'https://images.pexels.com/photos/33306216/pexels-photo-33306216.jpeg',
        description: 'A modern metropolis known for luxury shopping, ultramodern architecture, and vibrant nightlife, alongside rich Islamic heritage and beautiful mosques.',
        bestTime: 'Nov - Mar',
        temperature: '15°C - 35°C',
        distance: 'International',
        tags: ['Modern City', 'Shopping', 'Luxury', 'Islamic Culture'],
        rating: 4.8,
        reviews: 18200,
        highlights: [
            { icon: '🏙️', title: 'Burj Khalifa', desc: 'The tallest building in the world' },
            { icon: '🕌', title: 'Jumeirah Mosque', desc: 'Beautiful example of modern Islamic architecture' },
            { icon: '🛍️', title: 'Dubai Mall', desc: 'World\'s largest shopping destination' },
            { icon: '🏜️', title: 'Desert Safari', desc: 'Thrilling adventure in the Arabian desert' },
        ],
        activities: [
            { name: 'Burj Khalifa Visit', price: '$40', duration: '2 hours', image: 'https://images.pexels.com/photos/12099895/pexels-photo-12099895.jpeg' },
            { name: 'Desert Safari', price: '$60', duration: '6 hours', image: 'https://images.pexels.com/photos/26926258/pexels-photo-26926258.jpeg' },
            { name: 'Jumeirah Mosque Tour', price: 'Free', duration: '1 hour', image: 'https://images.pexels.com/photos/16958923/pexels-photo-16958923.jpeg' },
            { name: 'Dubai Mall Shopping', price: 'Free', duration: '3 hours', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&q=80' },
        ],
        gallery: [
            'https://images.pexels.com/photos/27206533/pexels-photo-27206533.jpeg',
            'https://images.pexels.com/photos/712380/pexels-photo-712380.jpeg',
            'https://images.pexels.com/photos/18795087/pexels-photo-18795087.jpeg',
            'https://images.pexels.com/photos/35375500/pexels-photo-35375500.jpeg',
        ]
    },
    'kuala-lumpur': {
        name: 'Kuala Lumpur',
        subtitle: 'Malaysia',
        category: 'International',
        image: 'https://images.pexels.com/photos/67559/kuala-lumpur-petronas-twin-towers-malaysia-klcc-67559.jpeg',
        description: 'Vibrant capital city known for its modern skyline, rich Islamic culture, diverse food scene, and the iconic Petronas Twin Towers.',
        bestTime: 'Year Round',
        temperature: '23°C - 32°C',
        distance: 'International',
        tags: ['Petronas Towers', 'Islamic Arts', 'Culture', 'Food'],
        rating: 4.7,
        reviews: 9800,
        highlights: [
            { icon: '🏢', title: 'Petronas Towers', desc: 'Iconic twin skyscrapers and symbol of Malaysia' },
            { icon: '🕌', title: 'National Mosque', desc: 'Stunning modern Islamic architecture' },
            { icon: '🏛️', title: 'Islamic Arts Museum', desc: 'Largest Islamic arts museum in Southeast Asia' },
            { icon: '🍜', title: 'Street Food', desc: 'Diverse and delicious local cuisine' },
        ],
        activities: [
            { name: 'Petronas Towers Tour', price: '$25', duration: '2 hours', image: 'https://images.pexels.com/photos/27118622/pexels-photo-27118622.jpeg' },
            { name: 'National Mosque Visit', price: 'Free', duration: '1 hour', image: 'https://images.pexels.com/photos/36461474/pexels-photo-36461474.jpeg' },
            { name: 'Islamic Arts Museum', price: '$5', duration: '2 hours', image: 'https://images.pexels.com/photos/31711746/pexels-photo-31711746.jpeg' },
            { name: 'Jalan Alor Food Tour', price: '$20', duration: '3 hours', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80' },
        ],
        gallery: [
            'https://images.pexels.com/photos/27118622/pexels-photo-27118622.jpeg',
            'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80',
            'https://images.pexels.com/photos/31711746/pexels-photo-31711746.jpeg',
            'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80',
        ]
    }
};

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

export default function DestinationDetailPage() {
    const params = useParams();
    const { ref, isInView } = useInView();
    const [isMounted, setIsMounted] = useState(false);
    const destinationSlug = params?.slug as string;
    const destination = destinationsData[destinationSlug];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!destination) {
        notFound();
    }

    return (
        <div className="w-full bg-white text-gray-700">
            <Topbar />
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[70vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        quality={80}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/95 via-[#0A192F]/60 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    {/* Breadcrumb */}
                    <nav className={`flex items-center gap-2 text-sm text-white/70 mb-4 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{destination.name}</span>
                    </nav>

                    {/* Destination Header */}
                    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-all duration-700 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-[#0f88c0] text-white text-sm font-bold rounded-full">
                                    {destination.category}
                                </span>
                                <span className="text-white/80 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {destination.distance}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                                {destination.name}
                            </h1>
                            <p className="text-xl text-[#0f88c0] font-bold mb-4">{destination.subtitle}</p>
                            <p className="text-lg text-white/90 max-w-3xl mb-6 leading-relaxed">
                                {destination.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {destination.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xl font-bold text-white">{destination.rating}</span>
                                </div>
                                <span className="text-white/70">({destination.reviews.toLocaleString()} reviews)</span>
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Best Time
                                </p>
                                <p className="text-white font-bold">{destination.bestTime}</p>
                            </div>
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    Temperature
                                </p>
                                <p className="text-white font-bold">{destination.temperature}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HIGHLIGHTS SECTION ===== */}
            <section ref={ref} className="py-20 bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Must-See <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Highlights</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience the spiritual and historical significance of {destination.name}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {destination.highlights.map((highlight: any, index: number) => (
                            <div
                                key={index}
                                className={`group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#0f88c0]/20 transition-all duration-500 hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {highlight.icon}
                                </div>
                                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{highlight.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{highlight.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ACTIVITIES SECTION (NO LEARN MORE BUTTON) ===== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-2">
                            Spiritual <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Activities</span>
                        </h2>
                        <p className="text-gray-600">Meaningful experiences for your journey</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {destination.activities.map((activity: any, index: number) => (
                            <div
                                key={index}
                                className="group flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0f88c0]/30 transition-all duration-300"
                            >
                                <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={activity.image}
                                        alt={activity.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="150px"
                                        quality={70}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-lg text-[#0A192F] mb-3">{activity.name}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">
                                            <svg className="w-4 h-4 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {activity.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full text-emerald-700 font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {activity.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY SECTION ===== */}
            <section className="py-20 bg-linear-to-b from-sky-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Explore <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">{destination.name}</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover the beauty and spirituality through stunning visuals
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {destination.gallery.map((image: string, index: number) => (
                            <div
                                key={index}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={70}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#0f88c0]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">🕋</span>
                        <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Plan Your Visit
                        </span>
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Begin Your Sacred
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            {' '}Journey
                        </span>
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Let us help you plan your spiritual journey to {destination.name} with complete guidance,
                        accommodation, and transportation services.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/packages"
                            className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] flex items-center justify-center gap-3 transition-all duration-300"
                        >
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300"
                        >
                            Contact Experts
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== BACK TO DESTINATIONS BUTTON ===== */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Destinations
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        Explore more blessed destinations
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}