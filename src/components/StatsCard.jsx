'use client';

import { Users, Gift, UserPlus, CircleDollarSign } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';



const StatsCard = ({ data, className = ""}) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
           
              <div
                    className="bg-gradient-to-tr from-white/70 via-white/80 to-white dark:from-neutral-800/40 dark:via-neutral-800/60 dark:to-neutral-800 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-neutral-700">
                     <UserPlus size={28} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                            Total Referral
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                            {data?.mydirectReferral || 0}
                        </p>
                    </div>
                </div>

                   <div
                    className="bg-gradient-to-tr from-white/70 via-white/80 to-white dark:from-neutral-800/40 dark:via-neutral-800/60 dark:to-neutral-800 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-neutral-700">
                     <Gift size={28} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                            Total Reward
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                            {data?.myReward || 0} CSP
                        </p>
                    </div>
                </div>

                   <div
                    className="bg-gradient-to-tr from-white/70 via-white/80 to-white dark:from-neutral-800/40 dark:via-neutral-800/60 dark:to-neutral-800 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-neutral-700">
                       <Users size={28} className="text-purple-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                            Total Team Members
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                                {data?.totalTeamMembers || 0}
                        </p>
                    </div>
                </div>

                   <div
                    className="bg-gradient-to-tr from-white/70 via-white/80 to-white dark:from-neutral-800/40 dark:via-neutral-800/60 dark:to-neutral-800 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-neutral-700">
                     <CircleDollarSign size={28} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                            Total Team Purchase
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                                {data?.teamTotalPurchase || 0}
                        </p>
                    </div>


                    
                </div>
                   {/* ➕ NEW: Total Available to Claim Box (Full Width) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <div className="bg-gradient-to-tr from-white/70 via-white/80 to-white dark:from-neutral-800/40 dark:via-neutral-800/60 dark:to-neutral-800 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg transition-all duration-300">
                    <div>
                        <p className="text-base font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                            Total Available to Claim
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            {data?.totalAvailableToClaim || 0} CSP
                        </p>
                    </div>
                    <Button  className="px-6 py-2 text-lg font-semibold">
                        Claim Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;


