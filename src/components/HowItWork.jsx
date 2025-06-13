'use client';

import { Share2, ShoppingCart, Gift } from 'lucide-react';

const steps = [
    {
        icon: <Share2 size={28} className="text-orange-500" />,
        label: 'Share your link',
    },
    {
        icon: <ShoppingCart size={28} className="text-orange-500" />,
        label: 'Your friend buys',
    },
    {
        icon: <Gift size={28} className="text-orange-500" />,
        label: 'You get rewarded',
    },
];

export default function HowItWork() {
    return (
        <section className="text-center py-10 px-4  bg-inherit">
            <h2 className="text-2xl font-semibold text-gray-200 mb-8">How it works</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-sm">
                            {step.icon}
                        </div>
                        <p className="text-sm text-gray-400">{step.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
