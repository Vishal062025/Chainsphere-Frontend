"use client";
import React from "react";
import Demodata from "./Demodata";
import Demodata1 from "./Demodata1";
import Demodata2 from "./Demodata2";
import PresaleCard from "./PresaleCard";
import Usecases from "./Usecases";
import Tokenomics from "./Tokenomics";

function Landing() {
  return (
    <div section="landing">
      <div
        id="home"
        section="sec-1"
        className="home-container md:h-screen max-w-6xl mx-auto flex items-center justify-center gap-5"
      >
        <div className="left-content md:p-5 m-5 ">
          <h1 className="text-[28px] md:text-[55px] font-medium leading-tight">
            The AI Revolution
            <br /> Starts Here
          </h1>
          <p className="text-[16px] sm:text-[20px] mr -20 text-gray-400 my-5 ">
            The world is on the brink of an artificial intelligence revolution,
            and Chainsphere is at the forefront. Our vision is to create a
            decentralized, AI-powered ecosystem that transforms industries,
            enhances efficiency, and drives automation across multiple sectors.
          </p>
          <p className="text-[16px] sm:text-[20px] text-gray-400 my-5">
            But before we build the future, we&apos;re inviting early believers
            to be part of our journey. Chainsphere is currently in its Initial
            Coin Offering (ICO) phase, allowing investors and visionaries like
            you to get in at the ground level.
          </p>
        </div>
        <div className="right-content mx-auto">
          {/* <img
            src="/images/logo.svg"
            className="object-contain size-[800px]" // Adjusting with Tailwind classes
            alt="landing"
          /> */}
        </div>
      </div>
      <div section="sec-2 " className=" md:h-[50vh]">
        <h2 className="text-[28px] md:text-[50px] font-medium mx-auto text-center leading-tight">
          Why Invest in Chainsphere?
        </h2>

        {/* My Code Start */}

        <div className="benefites max-w-[1300px] mx-auto my-20 px-4">
          {/* steps tracker start  */}
          <div className="steps-traker-wrapper max-w-[100%] mx-auto flex flex-col justify-center items-center sm:flex-row sm:justify-around sm:items-start relative">
            {/* Dotted Border start  */}
            <div className="StepsBorder hidden sm:block absolute top-6 left-[82px] md:left-[125px] mx-auto  z-10 w-[75%] border-t-1 border-b border-dotted border-[#FFFFFF]"></div>
            {/* Dotted Border ends  */}

            {/* step 1 */}
            <div className="step1 text-center space-y-4 relative z-40 mb-6 sm:mb-0">
              {/* step  */}
              <h2 className="step flex justify-center items-center text-black w-[50px] h-[50px] font-medium mx-auto rounded-full bg-[#ffc000]">
                1
              </h2>

              {/* step desciption start */}
              <div className="step-TitleAndDescription w-[200px] sm:w-auto mx-auto space-y-2 sm:space-y-4">
                {/* title  */}
                <div className="title font-medium text-[18px]">
                  {" "}
                  Early Access to the Future
                </div>

                {/* description  */}
                <div className="Step-des text-[12px] w-[80%] mx-auto">
                  Be among the first to invest in an AI ecosystem that will
                  redefine industries. {" "}
                </div>
              </div>
            </div>

            {/* step 2 */}
            <div className="step2 text-center space-y-4 relative z-40 mb-6 sm:mb-0">
              {/* step  */}
              <h2 className="step flex justify-center items-center text-black w-[50px] h-[50px] font-medium mx-auto rounded-full bg-[#ffc000]">
                2
              </h2>

              {/* step desciption */}
              <div className="step-TitleAndDescription w-[200px] sm:w-auto mx-auto space-y-2 sm:space-y-4">
                {/* title  */}
                <div className="title font-medium text-[18px]">
                  {" "}
                  Real-World Utility
                </div>

                {/* description  */}
                <div className="Step-des text-[12px] w-[80%] mx-auto">
                  Our AI solutions will integrate into healthcare, finance,
                  logistics, and more. 
                </div>
              </div>
            </div>

            {/* step 3 */}
            <div className="step3 text-center space-y-4 relative z-40 mb-6 sm:mb-0">
              {/* step  */}
              <h2 className="step flex justify-center items-center text-black w-[50px] h-[50px] font-medium mx-auto rounded-full bg-[#ffc000]">
                3
              </h2>

              {/* step desciption */}
              <div className="step-TitleAndDescription w-[200px] sm:w-auto mx-auto space-y-2 sm:space-y-4">
                {/* title  */}
                <div className="title font-medium text-[18px]">
                  Decentralized & Secure
                </div>

                {/* description  */}
                <div className="Step-des text-[12px] w-[80%] mx-auto">
                  Powered by blockchain, ensuring transparency and security in
                  all transactions. 
                </div>
              </div>
            </div>

            {/* step 4 */}
            <div className="step4 text-center space-y-4 relative z-40 mb-6 sm:mb-0">
              {/* step  */}
              <h2 className="step flex justify-center items-center text-black w-[50px] h-[50px] font-medium mx-auto rounded-full bg-[#ffc000]">
                4
              </h2>

              {/* step desciption */}
              <div className="step-TitleAndDescription w-[200px] sm:w-auto mx-auto space-y-2 sm:space-y-4">
                {/* title  */}
                <div className="title font-medium text-[18px]">
                   Token Utility & Rewards
                </div>

                {/* description  */}
                <div className="Step-des text-[12px] w-[80%] mx-auto">
                   Our native token ($CSP) will be at the heart of AI-driven
                  transactions and reward mechanisms.
                </div>
              </div>
            </div>
          </div>

          {/* steps tracker ends  */}
        </div>

        {/* My Code End */}

        {/* <div section="sec-2" className="relative max-w-6xl mx-auto ">
          <img
            src="/images/line.svg"
            className="m-16 px-16 w-full mx-auto md:block hidden"
            alt="line"
          />
          <div className="fle x md:flex-row flex-col hidden">
            <div className="absolute text-center top-16  left-5 w-40">
              Early Access to the Future
              <p className="pt-3 text-gray-400 text-sm">
                Be among the first to invest in an AI ecosystem that will
                redefine industries. 
              </p>
            </div> 

            <div className="absolute text-center top-16  left-[330px] w-40">
              Real-World Utility
              <p className="pt-7 text-gray-400 text-sm">
                Our AI solutions will integrate into healthcare, finance,
                logistics, and more. 
              </p>
            </div>

            <div className="absolute text-center top-16  left-[660px] w-40">
              Decentralized & Secure
              <p className="pt-3 text-gray-400 text-sm">
                 Powered by blockchain, ensuring transparency and security in
                all transactions. 
              </p>
            </div>

            <div className="absolute text-center top-16  left-[980px] w-40">
               Token Utility & Rewards
              <p className="pt-3 text-gray-400 text-sm">
                 Our native token ($CSP) will be at the heart of AI-driven
                transactions and reward mechanisms.
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <PresaleCard />

      <Usecases />
      <Demodata />
      <Demodata1 />
      <Demodata2 />
      <Tokenomics />
    </div>
  );
}

export default Landing;
