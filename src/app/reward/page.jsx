"use client"
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import React, { useState } from "react";

const page = () => {
    const [rewardData, setRewardData] = useState({
        recipientaddress:"",
        cspAmount: 0,
        lockTime: "",
    })

    return (
    <AdminLayoutWrapper>
        
      <div className="rewardContainer border-r-4 border-r-yellow-400  mt-12 border p-2 px-4 rounded-lg">
        <h2 className="tranferReward my-4 text-xl font-semibold">
          Transfer{" "}
          <span className="text-yellow-500 drop-shadow-sm">Reward</span>
        </h2>
        <form action="" className="space-y-6">
          {/* Address start   */}
          <div className="recipientaddress">
            <label htmlFor="address"> Recipient Address</label>
            <br />
            <input
              type="text"
              value={rewardData.recipientaddress}
              onChange={(e)=>{setRewardData({...rewardData, recipientaddress:e.target.value})}}
              className="border py-1 px-2"
              placeholder="enter the address"
            />
          </div>
          {/* address ends  */}

          {/* Address start   */}
          <div className="cspAmount">
            <label htmlFor="cspAmount">CSP Amount</label>
            <br />
            <input
              type="number"
              min={0}
              value={rewardData.cspAmount}
                onChange={(e)=>{setRewardData({...rewardData, cspAmount:e.target.value})}}
              className="border py-1 px-2"
              placeholder="enter the CSP Amount"
            />
          </div>
          {/* address ends  */}

          {/* Address start   */}
          <div className="lockTime">
            <label htmlFor="lockTime">Lock Time</label>
            <br />
            <input
              type="datetime-local"
              value={rewardData.lockTime}
              onChange={(e)=>{setRewardData({...rewardData, lockTime:e.target.value})}}
              className="border py-1 px-2 bg-amber-200/50"
              placeholder="enter the LockTime"
            />
          </div>

          <button type="submit" className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]">
            Transfer
          </button>
          {/* address ends  */}
        </form>
      </div>
    </AdminLayoutWrapper>
  );
};

export default page;
