"use client";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import React, { useState } from "react";

const page = () => {
  const [balances, setBalances] = useState({
    USDT: 0,
    BNB: 0,
  });
  return (
    <AdminLayoutWrapper>
      <div className="contractBalContainer border-r-4 border-r-yellow-400  mt-12 border p-2 px-4 rounded-lg">
        <h2 className="tranferReward my-4 text-xl font-semibold">
          Contract
          <span className="text-yellow-500 drop-shadow-sm"> Balance</span>
        </h2>
        {/* balance USDT start   */}
        <div className="balanceUSDT  my-2 flex items-center gap-4">
          <h2 className="w-14"> US<span className="text-yellow-500 font-semibold">DT</span> : </h2>
          <span className="USDT">{balances.USDT}</span>
        </div>
        {/* balance USDT ends  */}

        {/* balance BNB start   */}
        <div className="balanceBNB my-2 flex items-center gap-4">
          <h2 className="w-14"> B<span className="text-yellow-500 font-semibold">N</span>B : </h2>
          <span className="USDT">{balances.USDT}</span>
        </div>
        {/* balance BNB ends  */}

        {/* buttons start   */}
        <div className="buttons flex justify-start items-center gap-4 flex-wrap">
          <button
            type="submit"
            className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
          >
            Withdraw USDT
          </button>

          <button
            type="submit"
            className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
          >
            Withdraw BNB
          </button>
        </div>
        {/* buttons ends  */}
      </div>
    </AdminLayoutWrapper>
  );
};

export default page;
