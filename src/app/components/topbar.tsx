// components/topbar.tsx
export default function Topbar() {
    return (
        <>
            {/* Topbar - ab sab se upar rahegi */}
            <div
                className="fixed top-0 left-0 right-0 z-[9999] w-full text-white bg-[linear-gradient(90deg,#152ba8_0%,#2b53d6_55%,#3f74e8_100%)] shadow-md"
            >
                <div className="max-w-7xl mx-auto h-11 flex items-center justify-between gap-3 px-6 text-sm md:text-[14.5px]">
                    {/* Address */}
                    <div className="hidden sm:flex items-center gap-2 text-white whitespace-nowrap">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                        >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Office No 99 Jinnah Stadium, Civil Lines, Gujranwala Pakistan.</span>
                    </div>

                    {/* Timing */}
                    <div className="hidden lg:flex items-center gap-2 text-white whitespace-nowrap">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Mon-Sat: 10:30 AM - 8:30 PM. Sunday CLOSED</span>
                    </div>

                    {/* Phone */}
                    <a
                        href="tel:+923006407345"
                        className="flex items-center gap-2 text-white hover:text-white/90 whitespace-nowrap"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>+923006407345</span>
                    </a>
                </div>
            </div>

            {/* Spacer - topbar ki exact height (44px = h-11) */}
            <div className="h-11" />
        </>
    );
}