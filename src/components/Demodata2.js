import Image from 'next/image';
import React from 'react';

export default function ChainsphereTopicsPage() {
    return (
        <div id='topics' className=" text-white min-h-screen px-2 md:px-16 pb-10 scroll-mt-20">
            <h1 className="text-5xl font-bold mb-4 text-center">Topics</h1>
            <p className="text-yellow-400 text-xl font-semibold text-center mb-2">
                Explore a World of Knowledge
            </p>
            <p className="text-center text-lg mb-12">
                Dive into a variety of subjects, from emerging technologies to <br />business strategies, with content designed to inform and inspire.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 md:gap-y-40 py-16  px-2 md:px-20 lg:px-32">
                <div className="flex flex-col justify-center">
                    <h2 className="text-yellow-400 text-2xl font-semibold mb-4">
                        Chainsphere Coin – The Future of Digital Transactions
                    </h2>
                    <p className="mb-4">
                        Chainsphere is our platform&apos;s native digital asset, designed to revolutionize secure and seamless online transactions. Fast, scalable, and decentralized, Chainsphere powers our ecosystem, enabling smart contracts, rewards, and more.
                    </p>
                    <p>
                        Prepare for an exciting journey with Chainsphere Blockchain, a next-generation technology company redefining digital finance. With enhanced security, efficiency, and user-friendly solutions, our blockchain ecosystem offers an unparalleled experience.
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Image width={388} height={388} src="/images/topic1.svg" alt="Blockchain Globe" className="w-3/4 drop-shadow-lg" />
                </div>
                <div className="flex items-center justify-center">
                    <Image width={388} height={388} src="/images/topic2.svg" alt="Blockchain Technology" className="w-3/4 drop-shadow-lg" />
                </div>
                <div className="flex flex-col justify-center ">
                    <h2 className="text-yellow-400 text-2xl font-semibold mb-4">
                        Our Blockchain Technology
                    </h2>
                    <p>
                        Chainsphere operates on a high-performance, Ethereum Virtual Machine (EVM)-compatible blockchain, utilizing a secure and energy-efficient consensus algorithm to ensure reliability and transparency in every transaction.
                    </p>
                </div>
            </div>
        </div>
    );
}
