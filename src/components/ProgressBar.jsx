'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

const ProgressBar = ({ amount=30, progressPercent = 42, className = '' }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className={clsx("w-full max-w-3xl mx-auto", className)}>
            {/* Top Labels */}
            <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-1">
                <span className='text-lg font-bold text-gray-400'>$0</span>
                <span className='text-lg font-bold text-gray-400'>$25K</span>
                <span className='text-lg font-bold text-gray-400'>$75K</span>
            </div>

            {/* Progress Bar with Tooltip */}
            <div 
                className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 relative"
                    style={{ width: `${progressPercent}%` }}
                >
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute -top-7 right-0 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            ${amount}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Labels */}
            <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2 px-1">
                <span className='text-xs text-gray-400 font-bold'>Member</span>
                <span className='text-xs text-gray-400 font-bold ml-3'>Core Member</span>
                <span className='text-xs text-gray-400 font-bold'>Ambassador</span>
            </div>
        </div>
    );
};

export default ProgressBar;
