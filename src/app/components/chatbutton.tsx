// components/chatbutton.tsx
'use client';

export default function ChatButton() {
    return (
        <a
            href="https://wa.me/message/QU63HAS5NBOKF1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-[9990] group flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] text-white text-base font-semibold rounded-full shadow-lg shadow-green-600/30 hover:bg-[#1da851] hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
            {/* Chat Bubble Icon */}
            <svg
                className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span>Chat with us</span>
        </a>
    );
}