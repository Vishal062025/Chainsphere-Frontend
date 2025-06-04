"use client";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { lock } from "ethers";
import React, { useState } from "react";

const page = () => {
  const [lockingBal, setLockingBal] = useState({
    userAddress: "",
    arr: 0,
  });
  const [data, setData] = useState({
    amount: 0,
    purchaseTime: "1-Jun-2025",
    phase:1,
    unlockTime:"2d"
  });
  return (
    <AdminLayoutWrapper>
      <div className="lockingBalance border-r-4 border-r-yellow-400 mt-12 border p-2 px-4 rounded-lg">
        <h2 className="tranferReward my-4 text-xl font-semibold">
          Locking
          <span className="text-yellow-500 drop-shadow-sm"> Balance</span>
        </h2>
        <form action="" className="space-y-4">
          {/* user address start start   */}
          <div className="userAddress">
            <label htmlFor="userAddress">User Address</label>
            <br />
            <input
              type="text"
              min={0}
              value={lockingBal.userAddress}
              onChange={(e) => {
                setLockingBal({ ...lockingBal, userAddress: e.target.value });
              }}
              className="border py-1 px-2"
              placeholder="enter the User address"
            />
          </div>
          {/* user address ends  */}

          <div className="lockingAmount">
            <label htmlFor="lockingAmount">Locking Amount</label>
            <br />
            <input
              type="number"
              min={0}
              value={lockingBal.arr}
              onChange={(e) => {
                setLockingBal({ ...lockingBal, arr: e.target.value });
              }}
              className="border py-1 px-2"
              placeholder="enter the locking amount"
            />
          </div>

          {/* btn start  */}
          <button
            type="submit"
            className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
          >
            Lock
          </button>
          {/* btn ends ends  */}
        </form>
      </div>

      {/* information start */}
      <div className="info mt-12">

        {/* title start  */}
        {/* NOTE : TODO HEading need to change ⚠️⚠️ */}
        <div className="heading font-bold mt-2 mb-6 text-xl ">Extra <span className="pb-1.5 border-b border-amber-400">Information</span> </div>
        {/* title ends  */}
        {/* info ammount start   */}
        <div className="infoUSDT  my-2 flex items-center gap-4">
          <h2 className="w-32">
            {" "}
            Amou<span className="text-yellow-500 font-semibold">nt</span> :{" "}
          </h2>
          <span className="amount">{data.amount}</span>
        </div>
        {/* info amount ends  */}

        {/* info purchase time start   */}
        <div className="infoPurchaseTime my-2 flex items-center gap-4">
          <h2 className="w-32">
            {" "}
            <span className="text-yellow-500 font-semibold">Purc</span>hase Time
            :{" "}
          </h2>
          <span className="purchaseTime">{data.purchaseTime}</span>
        </div>
        {/* info purchase time ends  */}

        {/* info Phase start   */}
        <div className="infoPhase  my-2 flex items-center gap-4">
          <h2 className="w-32">
            {" "}
            Pha<span className="text-yellow-500 font-semibold">se</span> :{" "}
          </h2>
          <span className="phase">{data.phase}</span>
        </div>
        {/* info Phase ends  */}

        {/* info unclock time start   */}
        <div className="infoLock  my-2 flex items-center gap-4">
          <h2 className="w-32">
            {" "}
            un<span className="text-yellow-500 font-semibold">lock</span>time :{" "}
          </h2>
          <span className="UnLock">{data.unlockTime}</span>
        </div>
        {/* info unlock time ends  */}
      </div>
      {/* information ends  */}
    </AdminLayoutWrapper>
  );
};

export default page;
