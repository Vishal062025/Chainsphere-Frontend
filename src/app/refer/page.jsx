
import StakeholderSection from '@/components/StakeholderSection';
import React from 'react';
import {
  FaUserPlus,      
  FaLink,           
  FaShareAlt,       
  FaGift,             
  FaRocket,
  FaUser,
  FaCode,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';

const icons = [FaUserPlus, FaLink, FaShareAlt, FaGift];


const howItWorksSteps = [
  { title: "Sign Up", description: 'Sign up for the referral program using your account.' },
  { title: "Get Link", description: 'Get your unique referral link from the dashboard.' },
  { title: "Share The Link", description: 'Share the link with friends, family, or your network.' },
  { title: "Earn Rewards", description: 'Earn rewards when they join and engage with the ecosystem!' },
];

const ReferralProgramPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <div
          className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <h1 className="text-5xl font-bold mb-4">Join Our Referral Program</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a revolutionary blockchain and AI-powered ecosystem. Invite others and unlock exclusive rewards!
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Get Started Now <FaArrowRight className="inline ml-2" />
          </button>
        </div>

        {/* Stakeholder Sections */}
        <div className="py-16 px-4 max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StakeholderSection
            icon={FaRocket}
            title="For Investors"
            description="Invest in a cutting-edge blockchain and AI ecosystem via our ICO. Gain token rewards, governance rights, and support a transformative project."
            cta="Join the ICO"
          />
          <StakeholderSection
            icon={FaUser}
            title="For Users"
            description="Stake tokens, participate in governance, and enhance AI models by sharing data. Refer friends to earn rewards and grow the community."
            cta="Sign Up Now"
          />
          <StakeholderSection
            icon={FaCode}
            title="For Developers & Partners"
            description="Contribute to our open-source codebase or partner with us to build innovative blockchain and AI solutions."
            cta="Collaborate With Us"
          />
          <StakeholderSection
            icon={FaGlobe}
            title="For the Global Community"
            description="Join our DAO to shape the future, spread awareness, and drive global adoption of decentralized technologies."
            cta="Join the DAO"
          />
        </div>

        <div className='pb-16 px-4 max-w-7xl mx-auto'>
          <h2 className="text-2xl font-semibold mb-4">
            How our Chainsphere Referral Program works
          </h2>
          <ul className="flex flex-wrap gap-6">
            {howItWorksSteps.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <li
                  key={`${item.title}_${idx}`}
                  className="w-[calc(50%-20px)] flex items-center gap-3 p-4 group bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-6 h-6 text-blue-500 group-hover:text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>

  );
};

export default ReferralProgramPage;