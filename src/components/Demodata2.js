import Image from 'next/image';
import React from 'react';

function CardTitle({
    className="",
    title,
    para,
    nextPara,
    imageUrl
}) {
    return (
        <div className={`flex w-full lg:items-center lg:justify-center lg:gap-9 ${className}`}>
            <div className='flex flex-col gap-4 lg:max-w-1/2'>
                {title && <div className='text-yellow-400 text-2xl font-semibold'>{title}</div>}
                {para && <p>
                    {para}
                </p>}
                {nextPara && <p>
                   {nextPara}
                </p>}
            </div>
            {imageUrl && <div className='lg:block hidden'>
                <Image width={300} height={300} src={imageUrl} alt="Blockchain Globe" className="w-[288px] h-[288px] object-cover drop-shadow-lg" />
            </div>}
        </div>
    )
}

export default function ChainsphereTopicsPage() {
    return (
        <div id='topics' className=" text-white lg:min-h-screen px-2 md:px-16 pb-10 scroll-mt-20">
            <h1 className="text-5xl font-bold mb-4 text-center">Topics</h1>
            <p className="text-yellow-400 text-xl font-semibold text-center mb-2">
                Explore a World of Knowledge
            </p>
            <p className="text-center text-lg mb-12">
                Dive into a variety of subjects, from emerging technologies to <br />business strategies, with content designed to inform and inspire.
            </p>

            <div className='mt-8 flex flex-col gap-12'>
                <CardTitle
                    className="flex-row"
                    title="Chainsphere Coin – The Future of Digital Transactions"
                    para="Chainsphere is our platform&apos;s native digital asset, designed to revolutionize secure and seamless online transactions. Fast, scalable, and decentralized, Chainsphere powers our ecosystem, enabling smart contracts, rewards, and more."
                    nextPara="Prepare for an exciting journey with Chainsphere Blockchain, a next-generation technology company redefining digital finance. With enhanced security, efficiency, and user-friendly solutions, our blockchain ecosystem offers an unparalleled experience."
                    imageUrl="/images/topic1.svg"
                />
                <CardTitle
                    className="lg:flex-row-reverse"
                    title="Our Blockchain Technology"
                    para="Chainsphere operates on a high-performance, Ethereum Virtual Machine (EVM)-compatible blockchain, utilizing a secure and energy-efficient consensus algorithm to ensure reliability and transparency in every transaction."
                    imageUrl="/images/topic2.svg"
                />
            </div>
        </div>
    );
}
