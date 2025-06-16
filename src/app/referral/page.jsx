"use client";

import React, { useEffect, useState } from "react";
import HowItWork from "@/components/HowItWork";
import LayoutWrapper from "@/components/LayoutWrapper";
import ReferralInput from "@/components/ReferralInput";
import StatsCard from "@/components/StatsCard";
import { BASE_URL } from "@/config/config";
import { userAuth } from "@/Use_Context/authContext";
import axios from "axios";

const ReferralHomePage = () => {
  const { authUser, checkAuth } = userAuth();
  const [data, setData] = useState({});
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const getReferralDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/referral/`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
          "Content-Type": "application/json",
        },
      });
      setData(response?.data?.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    // First check authentication
    const init = async () => {
      await checkAuth();
      setIsAuthChecked(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (isAuthChecked && authUser) {
      getReferralDetails();
    }
  }, [isAuthChecked, authUser]);

  return (
    <LayoutWrapper>
      <div className="flex flex-col mx-auto max-w-7xl items-center top-40 mt-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl sm:text-4xl text-gray-300 font-semibold sm:font-bold tracking-widest">
            Earn Reward For Referring Your Friend
          </h1>
          <div className="text-center italic text-lg sm:text-xl max-w-2xl mx-auto text-gray-400 tracking-wide">
            Unlock rewards by inviting others to join Chainsphere. Earn
            commissions from both your direct and indirect referrals!
          </div>
        </div>
        <div className="md:w-xl mt-9 w-full">
          <ReferralInput value={data?.referralId} />
        </div>
        <StatsCard className="mt-18" data={data} />
        {/* <HowItWork /> */}
      </div>
    </LayoutWrapper>
  );
};

export default ReferralHomePage;
