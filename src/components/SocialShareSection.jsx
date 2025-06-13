'use client';

import { Mail } from 'lucide-react';
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const text = encodeURIComponent('Join me on Intelisync!');



const SocialShareSection = ({ url, wrapperClassName = "", alignItemClass= "" }) => {
    const shareUrl = encodeURIComponent(url);
    const socialLinks = [

        {
            label: 'WhatsApp',
            icon: <FaWhatsapp size={20} className="text-white" />,
            bg: 'bg-[#25D366]',
            href: `https://wa.me/?text=${text}%20${shareUrl}`,
        },
        {
            label: 'X',
            icon: <FaXTwitter size={20} className="text-white" />,
            bg: 'bg-black',
            href: `https://x.com/intent/tweet?text=${text}&url=${shareUrl}`,
        },
        {
            label: 'Email',
            icon: <Mail size={20} className="text-white" />,
            bg: 'bg-gray-600',
            href: `mailto:?subject=Join me on Intelisync&body=${text} ${shareUrl}`,
        },
    ];
    return (
        <div className={`${wrapperClassName}`}>
            <div className={`flex flex-wrap gap-4 ${alignItemClass}`}>
                {socialLinks.map(({ label, icon, bg, href }, i) => (
                    <Link
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${bg} hover:scale-105 transition-transform`}
                    >
                        {icon}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SocialShareSection;
