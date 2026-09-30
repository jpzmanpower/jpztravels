import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Built by SyncOps | AI Software Studio by Majid Ali | JPZ Travel',
    description:
        'JPZ Travel was engineered by SyncOps — AI-powered software, enterprise development, and cloud platforms led by Founder & CEO Majid Ali. Visit syncops.tech and majidali.tech.',
    keywords: [
        'SyncOps',
        'syncops.tech',
        'Majid Ali',
        'majidali.tech',
        'AI software development',
        'enterprise software Pakistan',
        'custom software Gujranwala',
        'Next.js development agency',
        'AI automation SyncOps',
        'Built by SyncOps',
        'JPZ Travel website developer',
    ],
    authors: [
        { name: 'Majid Ali', url: 'https://majidali.tech' },
        { name: 'SyncOps', url: 'https://syncops.tech' },
    ],
    creator: 'SyncOps',
    publisher: 'SyncOps',
    alternates: {
        canonical: '/built-by-syncops',
    },
    openGraph: {
        title: 'Built by SyncOps | Majid Ali — AI Software Studio',
        description:
            'Discover SyncOps and Founder & CEO Majid Ali — the engineering team behind JPZ Travel. Enterprise software, AI automation, and cloud platforms.',
        url: '/built-by-syncops',
        siteName: 'JPZ Travel',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/syncops-ceo.png',
                width: 800,
                height: 1000,
                alt: 'Majid Ali — Founder & CEO of SyncOps | majidali.tech',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Built by SyncOps | Majid Ali CEO',
        description:
            'JPZ Travel engineered by SyncOps. Meet Majid Ali — Founder & CEO. Explore syncops.tech and majidali.tech.',
        images: ['/syncops-ceo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': 'https://jpztravel.com/built-by-syncops#webpage',
            url: 'https://jpztravel.com/built-by-syncops',
            name: 'Built by SyncOps | AI Software Studio by Majid Ali',
            description:
                'JPZ Travel was engineered by SyncOps, led by Founder & CEO Majid Ali. AI-powered software, enterprise development, and cloud platforms.',
            isPartOf: { '@id': 'https://jpztravel.com/#website' },
            about: [
                { '@id': 'https://syncops.tech/#organization' },
                { '@id': 'https://majidali.tech/#person' },
            ],
            primaryImageOfPage: {
                '@type': 'ImageObject',
                url: 'https://jpztravel.com/syncops-ceo.png',
                caption: 'Majid Ali — Founder & CEO, SyncOps',
            },
        },
        {
            '@type': 'Organization',
            '@id': 'https://syncops.tech/#organization',
            name: 'SyncOps',
            alternateName: ['SyncOps Technologies', 'Sync Ops'],
            url: 'https://syncops.tech',
            logo: 'https://syncops.tech/favicon.ico',
            email: 'info@syncops.tech',
            telephone: '+92-301-8678-319',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Mumtaz Market',
                addressLocality: 'Gujranwala',
                addressCountry: 'PK',
            },
            sameAs: [
                'https://syncops.tech',
                'https://www.linkedin.com/company/syncops',
                'https://majidali.tech',
            ],
            founder: { '@id': 'https://majidali.tech/#person' },
            description:
                'AI-powered software solutions & enterprise development — custom software, AI agents, automation, and cloud platforms.',
            knowsAbout: [
                'Artificial Intelligence',
                'Custom Software Development',
                'Cloud Computing',
                'DevOps',
                'Web Development',
                'Mobile App Development',
            ],
        },
        {
            '@type': 'Person',
            '@id': 'https://majidali.tech/#person',
            name: 'Majid Ali',
            url: 'https://majidali.tech',
            jobTitle: 'Founder & Chief Executive Officer',
            worksFor: { '@id': 'https://syncops.tech/#organization' },
            image: 'https://jpztravel.com/syncops-ceo.png',
            sameAs: ['https://majidali.tech', 'https://syncops.tech'],
            description:
                'Majid Ali is Founder & CEO of SyncOps with 10+ years building scalable full-stack and AI-powered products.',
            knowsAbout: [
                'Full-Stack Development',
                'AI Software',
                'Next.js',
                'Enterprise SaaS',
            ],
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://jpztravel.com/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Built by SyncOps',
                    item: 'https://jpztravel.com/built-by-syncops',
                },
            ],
        },
    ],
};

export default function BuiltBySyncopsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
