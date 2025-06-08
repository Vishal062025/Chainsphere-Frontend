import { BASE_URL } from "@/config/config";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

function PresaleCard() {
const [tokenData, setTokenData] = useState({
  totalTokens: "000,000",
  totalPayoutUSD: "0,000,000",
  percentage: ""
})

 useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/token/`);
        console.log({data: response?.data?.data});
        setTokenData({...response?.data?.data, percentage: (Number(response?.data?.data?.totalTokens) * 100  / 531000000) + "%"});
      } catch (error) {
        console.error("Error fetching token data:", error);
           setTokenData({
    totalTokens: "000,000",
    totalPayoutUSD: "0,000,000",
    percentage: "0%"
  } )
      }
    };

    // Fetch immediately
    fetchTokenData();

    // Poll every 10 seconds
    const interval = setInterval(fetchTokenData, 10000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);
console.log({tokenData});

  return (
    <div>
      <div id="presale-form" className=" overflow-x-hidden flex max-w-5xl md:my-16 justify-center mx-auto flex-col items-center">
        <div className="mb-[50px]">
          <p className="font-krona font-normal text-sm text-center mb-4 leading-[17.5px] tracking-[0.6rem]"></p>
          <h2 className="font-krona text-[28px] md:text-[76px] max-tablet:text-[55px] max-smallTablet:text-[34px] max-mobile:text-[25px] leading-[95px] tracking-[-10%] text-center">
            PRESALE&nbsp;&nbsp;START
          </h2>
        </div>

        <div className="w-full max-smallTablet:max-w-full max-h-fit">
          <div className="rounded-3xl bg-gradient-to-r from-[#FFC000] to-[#FF9500] backdrop-blur-[20px] text-white p-2 md:p-[50px] max-laptop:p-[10px] relative border-2 border-white/5">
            <div className="font-geometria text-[22px] text-center mb-[15px] max-laptop:mt-[30px]">Raised</div>

            <div className="text-center mb-4">
              <p className="font-geometria font-extrabold text-3xl mb-1 max-tablet:text-2xl max-smallTablet:text-xl">
                <span>${tokenData.totalPayoutUSD}</span> / <span className="text-[#943535]">$250,000</span>
              </p>
              <p className="font-geometria text-lg max-smallTablet:text-base">Buy in before price increases!</p>
            </div>

            <div className="font-geometria flex flex-row justify-between text-center text-[#943535] max-h-min mb-6 px-4 sm:px-10 max-laptop:px-6 max-smallTablet:px-3">
              <div>
                <h3 className="font-geometria text-black font-medium text-base text-left max-smallTablet:text-sm">
                  Token Sold
                </h3>
                <p className="font-geometria font-semibold text-base text-left max-smallTablet:text-xs">
                  {tokenData.totalTokens} CSP
                </p>
              </div>
              <div>
                <h3 className="font-geometria text-black font-medium text-base text-right max-smallTablet:text-sm">
                  Total Presale Tokens
                </h3>
                <p className="font-geometria font-semibold text-base text-right max-smallTablet:text-xs">
                  531,000,000 CSP
                </p>
              </div>
            </div>

            <div className="mx-10 mb-6 flex flex-col gap-7 max-laptop:mx-6 max-smallTablet:mx-3">
              <div className="relative">
                <img
                  id="progress-bar-icon"
                  alt="NST"
                  loading="lazy"
                  width="38"
                  height="40"
                  decoding="async"
                  className="absolute top-[-10px] select-none translate-x-[-25%]"
                  style={{ color: "transparent", left: tokenData.percentage }}
                  src="/images/progressIcon.png"
                />
                <p className="h-[20px] max-tablet:h-5 bg-[#080A12] rounded-full overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-[#5271FF] to-[#00FFBB] transition-all duration-150 ease-out"
                    style={{ width: tokenData.percentage }}
                  ></span>
                </p>
                <p className="font-geometria mt-2.5 text-base max-smallTablet:text-xs font-medium flex justify-between">
                  <span className="text-left">Current Price: $0.05</span>
                  <span className="text-right">Next Stage Price: $0.07</span>
                </p>
              </div>

              <div className="flex gap-3 md:flex-row flex-col max-tablet:justify-center justify-center">
                <div className="p-3 bg-[#080A12] border rounded-[20px] border-solid border-[#FFFFFF33] backdrop-blur-2xl">
                  <div className="w-[310px] max-tablet:w-full flex justify-between items-center">
                    <div className="font-geometria flex-1">
                      <h4 className="text-[#B7C3FF] text-sm">You Pay</h4>
                      <input
                        className="w-full font-bold text-2xl bg-transparent placeholder:text-[#FFFFFF] text-[#FFFFFF] focus-visible:text-white outline-none duration-300 max-smallTablet:text-base disabled:brightness-50"
                        placeholder="0"
                        value="0"
                        onChange={() => { }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#080A12] border rounded-[20px] border-solid border-[#FFFFFF33] backdrop-blur-2xl">
                  <div className="w-[310px] max-tablet:w-full flex justify-between items-center text-[#EFEFF5]">
                    <div className="font-geometria flex-1">
                      <h4 className="text-[#B7C3FF] text-sm">You Receive</h4>
                      <input
                        className="w-full font-bold text-2xl bg-transparent placeholder:text-[#FFFFFF] text-[#FFFFFF] focus-visible:text-white outline-none duration-300 max-smallTablet:text-base disabled:brightness-50"
                        placeholder="0"
                        value="0"
                        onChange={() => { }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="flex md:flex-row flex-col items-center justify-center max-tablet:flex-col gap-3">

              <Link className="cursor-pointer" href="/login">
                <button
                  className="font-geometria select-none font-bold text-center text-xl border-transparent outline-none focus-visible:border-white/10 border-2 flex justify-center h-[60px] items-center w-[255px] text-white rounded-[50px] py-[16px] px-[50px] bg-[#3859FF] cursor-pointer transition-all duration-[0.5s] ease-in hover:text-[#343C67] hover:bg-[#07FEB8] active:bg-[#85FFDC] active:transition-none"
                >
                  Buy
                </button>
              </Link>
              <Link className="cursor-pointer" href="/login">
                <button className="font-geometria font-bold text-xl w-[255px] h-[60px] bg-[#FFFFFF] flex flex-row gap-4 items-center px-[35px] py-4 rounded-[50px] justify-center transition-all duration-[0.5s] ease-in hover:bg-[#07FEB8] active:bg-[#85FFDC]">
                  <span className="text-[#1C2449] text-[18px]">Connect wallet</span>
                  <img alt="Wallet" loading="lazy" width="30" height="30" src="/images/walletIcon.svg" />
                </button>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-geometria font-medium text-base flex gap-6 justify-center mt-[25px]">
                <a
                  href="/assets/docs/NebulaStrideWhitepaper.pdf"
                  target="_blank"
                  className="font-geometria text-white font-medium hover:text-[#943535] hover:underline"
                  rel="noopener noreferrer"
                >
                  Whitepaper
                </a>
                <button className="hover:text-[#943535] hover:underline">Add CSP to Wallet</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresaleCard;
