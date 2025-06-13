"use client";
import HowItWork from "@/components/HowItWork";
import LayoutWrapper from "@/components/LayoutWrapper";
import SimpleProgressBar from "@/components/ProgressBar";
import ReferralInput from "@/components/ReferralInput";
import SocialShareSection from "@/components/SocialShareSection";
import StatsCard from "@/components/StatsCard";
import { BASE_URL } from "@/config/config";
import { userAuth } from "@/Use_Context/authContext";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { useEffect } from "react";

const ReferralHomePage = () => {
  // const searchParams = useSearchParams();
  const { authUser, checkAuth } = userAuth();
  const [data, setData] = useState({});


  const getReferralDetails = async ()=>{
    try {
   
      const response = await axios.get(
      `${BASE_URL}/api/referral/`,
      {
        headers: {
          Authorization: `Bearer ${authUser}`,
          "Content-Type": "application/json",
        },
      }
    );
   setData(response?.data?.data)
    } catch (error) {
      console.log({error})
    }
  }
  const url = "https://intelisync.ai/xyz"
 
  useEffect(()=>{
    checkAuth()
    getReferralDetails()
  }, [])
    console.log({data})

  return (
    <LayoutWrapper>
      <div className="flex flex-col mx-auto max-w-7xl  items-center top-40 mt-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl sm:text-4xl text-gray-300 font-semibold sm:font-bold tracking-widest">Earn Reward For Referring Your Friend</h1>
          <div className="text-center italic text-lg sm:text-xl max-w-2xl mx-auto text-gray-400 tracking-wide">Unlock rewards by inviting others to join Chainsphere. Earn commissions from both your direct and indirect referrals!</div>
        </div>
        <div className="md:w-xl mt-9 w-full">
          <ReferralInput value={data?.referralId} />
        </div>
        <StatsCard className="mt-18" data={data} />
        {/* <SocialShareSection referralId={data?.referralId} wrapperClassName="fixed top-20 md:top-40 right-4" alignItemClass="flex-col" /> */}
        
        {/* <HowItWork /> */}

        
      </div>
    </LayoutWrapper>
  );
};

export default ReferralHomePage;
