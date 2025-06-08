import React from 'react';

export default function Roadmap() {
  const PolygonLabel = ({ text }) => (
    <div className="relative w-20 h-20 text-yellow-500 flex items-center justify-center font-bold text-2xl" style={{
      clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
      border: ''
    }}>
      {text}
    </div>
  );

  const phases = [
    {
      title: 'Phase 1 – ICO Launch',
      label: 'Q1',
      details: [
        'Token Sale & Community Building',
        'Exchange Listings & Staking Mechanism',
        'AI Research & Development Kickoff'
      ]
    },
    {
      title: 'Phase 2 – Platform Development',
      label: 'Q2',
      details: [
        'AI Integration & Smart Contracts',
        'Beta Launch of AI-Powered DApps',
        'Strategic Partnerships with Enterprises'
      ]
    },
    {
      title: 'Phase 3 – Full Ecosystem Launch',
      label: 'Q3',
      details: [
        'AI-Blockchain Mainnet Deployment',
        'Expansion into Global Markets',
        'Scaling AI Solutions Across Industries'
      ]
    }
  ];

  return (
    <div id='roadmap' className=" text-white flex flex-col justify-center items-center px-2 md:px-8 py-16">
      <h1 className="text-5xl font-bold mb-16">Roadmap</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {phases.map((phase, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-yellow-500 text-xl font-semibold mb-10">{phase.title}</h2>
            <div className="relative bg-[#2b2a2a] p-6 rounded-lg shadow-lg text-gray-200">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <PolygonLabel text={phase.label} />
              </div>
              <ul className="list-disc list-inside space-y-2 my-1">
                {phase.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-started mt-5 text-gray-300 text-[16px] py-16 px-6 md:px-20 lg:px-25">
        <p>Prepare for an exciting journey with Chainsphere, a next-generation technology company redefining digital finance. With enhanced security, efficiency, and user-friendly solutions, our blockchain ecosystem offers an unparalleled experience.</p>
        <h3 className="text-yellow-500 text-2xl font-semibold mt-6">Our Blockchain Technology</h3>
        <p className="mt-2">Chainsphere operates on a high-performance, Ethereum Virtual Machine (EVM)-compatible blockchain, utilizing a secure and energy-efficient consensus algorithm to ensure reliability and transparency in every transaction.</p>
      </div>
    </div>
  
  );
}
