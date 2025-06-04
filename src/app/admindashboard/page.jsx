"use client";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "@/contract/ico.json";
import abi1 from "@/contract/usdt.json";
import { ICO_CONTRACT_ADDRESS } from "../../env/config";
import { USDT_CONTRACT_ADDRESS } from "../../env/config";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import axios from "axios";
// import { useWallet } from "../../walletContext/WalletContext"; // Import the useWallet hook
import { userAuth } from "@/Use_Context/authContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdClose } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";

export default function BuyCSP() {
  const [startICO, setStartICO] = useState(false);
  const [compleatedFeilds, setCompleatedFeilds] = useState(0);
  const [StepTracker, setStepTracker] = useState({
    setStartTime: false,
    setEndsTime: false,
    selectPhase: false,
    lockingPeriod: false,
  });

  const [StepTrackerValues, setStepTrackerValues] = useState({
    StartTime: false,
    EndsTime: false,
    selectPhase: false,
    lockingPeriodTime: false,
    selectLockingPhase: false,
  });

  const startICOHandler = async () => {
    setStartICO(true);
    setTimeout(() => {
      setStepTracker((prev) => ({ ...prev, setStartTime: true }));
    }, 500);
  };

  return (
    <AdminLayoutWrapper>
      {/* ICO Page Start  */}
      <div className="ICO  z-40 min-h-[80vh] my-12">
        {/* Modal Logic Start  */}
        {
          <>
            {StepTracker.setStartTime && (
              <>
                <div className="setTimeStartModal absolute backdrop-blur-[2px] z-50 top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center">
                  {/* form Start for set Time  */}

                  <form className="setTimeStartForm relative p-4 rounded-lg px-8 border border-gray-300 bg-[#e8f89a4a] ">
                    {/* close Modal start */}
                    <div className="closeModal text-xl absolute top-1 right-2">
                      <IoMdClose
                        onClick={() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            setStartTime: false,
                          }));
                        }}
                      />
                    </div>
                    {/* close modal ends  */}

                    <div className="container">
                      <Label
                        htmlFor="startTime"
                        className="text-center text-lg mb-2 font-semibold"
                      >
                        Set Start Time
                      </Label>
                      <input
                        id="startTime"
                        type="datetime-local"
                        value={StepTrackerValues.StartTime}
                        onChange={(e) => {
                          setStepTrackerValues((prev) => ({
                            ...prev,
                            StartTime: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>
                    <button
                      onClick={() => {
                        setStepTracker((prev) => ({
                          ...prev,
                          setStartTime: false,
                        }));
                        setCompleatedFeilds((prev) => prev + 1);
                        setTimeout(() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            setEndsTime: true,
                          }));
                        }, 1000);
                      }}
                      className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
                    >
                      Set Time
                    </button>
                  </form>
                  {/* form ends for set time  */}
                </div>
              </>
            )}

            {StepTracker.setEndsTime && (
              <>
                <div className="setTimeStartModal absolute backdrop-blur-[2px] z-50 top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center">
                  {/* form Start for set Time  */}

                  <form className="setTimeStartForm relative p-4 rounded-lg px-8 border border-gray-300 bg-[#e8f89a4a] ">
                    {/* close Modal start */}
                    <div className="closeModal text-xl absolute top-1 right-2">
                      <IoMdClose
                        onClick={() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            setEndsTime: false,
                          }));
                        }}
                      />
                    </div>
                    {/* close modal ends  */}

                    <div className="container">
                      <Label
                        htmlFor="EndsTime"
                        className="text-center text-lg mb-2 font-semibold"
                      >
                        Set Ends Time
                      </Label>
                      <input
                        id="EndsTime"
                        type="datetime-local"
                        value={StepTrackerValues.EndsTime}
                        onChange={(e) => {
                          setStepTrackerValues((prev) => ({
                            ...prev,
                            EndsTime: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>
                    <button
                      onClick={() => {
                        setStepTracker((prev) => ({
                          ...prev,
                          setEndsTime: false,
                        }));
                        setCompleatedFeilds((prev) => prev + 1);
                        setTimeout(() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            selectPhase: true,
                          }));
                        }, 1000);
                      }}
                      className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
                    >
                      Set Time
                    </button>
                  </form>
                  {/* form ends for set time  */}
                </div>
              </>
            )}

            {StepTracker.selectPhase && (
              <>
                <div className="setTimeStartModal absolute backdrop-blur-[2px] z-50 top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center">
                  {/* form Start for set Time  */}

                  <form className="setTimeStartForm relative p-4 rounded-lg px-8 border border-gray-300 bg-[#e8f89a4a] ">
                    {/* close Modal start */}
                    <div className="closeModal text-xl absolute top-1 right-2">
                      <IoMdClose
                        onClick={() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            selectPhase: false,
                          }));
                        }}
                      />
                    </div>
                    {/* close modal ends  */}

                    <div className="container">
                      <Label
                        htmlFor="selectPhase"
                        className="text-center text-lg mb-2 font-semibold"
                      >
                        Select Phase
                      </Label>

                      <select
                        id="phase"
                        value={StepTrackerValues.selectPhase}
                        onChange={(e) => {
                          setStepTrackerValues((prev) => ({
                            ...prev,
                            selectPhase: e.target.value,
                          }));
                        }}
                        className="bg-white text-black border- outline-none font-semibold [1px]
                         border-gray-300 m-0 px-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      >
                        {/* <option selected>Choose a currency</option> */}
                        <option defaultValue={true} value="phase1">
                          Phase 1
                        </option>
                        <option value="phase2">Phase 2</option>
                        <option value="phase3">Phase 3</option>
                        <option value="phase4">Phase 4</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        setStepTracker((prev) => ({
                          ...prev,
                          selectPhase: false,
                        }));
                        setCompleatedFeilds((prev) => prev + 1);
                        setTimeout(() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            lockingPeriod: true,
                          }));
                        }, 1000);
                      }}
                      className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
                    >
                      Select Phase
                    </button>
                  </form>
                  {/* form ends for set time  */}
                </div>
              </>
            )}

            {StepTracker.lockingPeriod && (
              <>
                <div className="setTimeStartModal absolute backdrop-blur-[2px] z-50 top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center">
                  {/* form Start for set Time  */}

                  <form className="setTimeStartForm relative p-4 rounded-lg px-8 border border-gray-300 bg-[#e8f89a4a] ">
                    {/* close Modal start */}
                    <div className="closeModal text-xl absolute top-1 right-2">
                      <IoMdClose
                        onClick={() => {
                          setStepTracker((prev) => ({
                            ...prev,
                            lockingPeriod: false,
                          }));
                        }}
                      />
                    </div>
                    {/* close modal ends  */}

                    <div className="container">
                      <Label
                        htmlFor="EndsTime"
                        className="text-center text-lg mb-2 font-semibold"
                      >
                        Set Locking Phase
                      </Label>
                      <select
                        id="phase"
                        value={StepTrackerValues.selectLockingPhase}
                        onChange={(e) => {
                          setStepTrackerValues((prev) => ({
                            ...prev,
                            selectLockingPhase: e.target.value,
                          }));
                        }}
                        className="bg-white text-black border- outline-none font-semibold [1px]
                         border-gray-300 m-0 px-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      >
                        {/* <option selected>Choose a currency</option> */}
                        <option defaultValue={true} value="phase1">
                          Phase 1
                        </option>
                        <option value="phase2">Phase 2</option>
                        <option value="phase3">Phase 3</option>
                        <option value="phase4">Phase 4</option>
                      </select>
                      <Label
                        htmlFor="EndsTime"
                        className="text-center text-lg mt-4 mb-2 font-semibold"
                      >
                        Set Locking Period
                      </Label>
                      <input
                        id="EndsTime"
                        type="number"
                        min="0"
                        className="border border-white p-1 w-[100%]"
                        placeholder="Enter time in Months"
                        value={StepTrackerValues.lockingPeriodTime}
                        onChange={(e) => {
                          setStepTrackerValues((prev) => ({
                            ...prev,
                            lockingPeriodTime: e.target.value,
                          }));
                        }}
                        required
                      />
                      <br />
                      <span className="text-xs text-red-500 font-medium">
                        Enter the time in Months Only (1 year = 12)
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setStepTracker((prev) => ({
                          ...prev,
                          lockingPeriod: false,
                        }));
                        setCompleatedFeilds((prev) => prev + 1);
                        //  setTimeout(() => {
                        //    setStepTracker((prev) => ({
                        //      ...prev,
                        //      : true,
                        //    }));
                        //  }, 1000);
                      }}
                      className="bg-gradient-to-r px-4 py-2 mt-4 font-semibold from-[#FFC000] to-[#FF9500]"
                    >
                      Locking Period
                    </button>
                  </form>
                  {/* form ends for set time  */}
                </div>
              </>
            )}
          </>
        }

        {/* Modal Logic Ends  */}

        {/* ICO status start  */}
        <div className="ICOHeading  text-xl flex justify-between items-center gap-2">
          {/* ICO Heading start  */}
          <h1 className="ICOTitle font-semibold tracking-wider">ICO</h1>
          {/* ICO HEading ends  */}

          {/* status start  */}
          <div className="status   font-normal text-lg ">
            <span>Status : </span>{" "}
            <span className="border-b-2 border-yellow-400 pb-1">
              {" "}
              Not Started
            </span>
          </div>
          {/* status ends  */}
        </div>
        {/* ICO status Ends  */}

        {/* Stages Section start  */}
        <div className="Stages my-12">
          {/* start ICO btn start  */}
          <li
            onClick={startICOHandler}
            className={` ${
              !compleatedFeilds > 0 &&
              "bg-gradient-to-r from-[#FFC000] to-[#FF9500]"
            } mb-4 p-2 list-none cursor-pointer w-fit shadow-sm  font-medium  text-white duration-200 ease-linear rounded-lg text-start border-none"
                : ""
            `}
          >
            {!compleatedFeilds > 0 && "Start ICO"}
            {compleatedFeilds > 0 && (
              <p>
                Current Stage : &nbsp;
                {compleatedFeilds == 1 && (
                  <span className="text-gray-400">Set Time Start</span>
                )}
                {compleatedFeilds == 2 && (
                  <span className="text-gray-400">Set Time End</span>
                )}
                {compleatedFeilds == 3 && (
                  <span className="text-gray-400">Select Phase</span>
                )}
                {StepTrackerValues.lockingPeriodTime && (
                  <span className="text-gray-400 ">Compleated</span>
                )}
              </p>
            )}
          </li>
          {/* start ICO btn ends  */}

          {/* Steps Start  */}

          <div
            className={`steps space-y-8 mt-8 duration-300 linear ${
              !startICO
                ? "opacity-0 translate-y-4"
                : " opacity-100 translate-y-0"
            }`}
          >
            <li
              onClick={() => {
                if (StepTrackerValues.StartTime == false) {
                  setStepTracker((prev) => ({
                    ...prev,
                    setStartTime: true,
                  }));
                }
                setStepTracker((prev) => ({
                  ...prev,
                  setStartTime: true,
                }));
              }}
              className="list-none relative z-50 w-fit flex justify-baseline items-center gap-2 "
            >
              <span
                className={` ${
                  StepTracker.setStartTime || StepTrackerValues.StartTime
                    ? "bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white"
                    : !compleatedFeilds == 0 && "opacity-50"
                } p-2 px-4 mr-4 rounded-sm  bg-gray-400 font-bold text-center `}
              >
                1
              </span>
              <span
                className={` 
                  ${
                    !compleatedFeilds == 0 ? "text-gray-300" : "text-white"
                  } text-sm tracking-wide w-[100px]`}
              >
                {" "}
                Set Start Time{" "}
              </span>
              <span
                className={`mx-4 duration-200 ${
                  StepTrackerValues.StartTime && !StepTracker.setStartTime
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } `}
              >
                <GrStatusGood
                  fontSize={"1.4rem"}
                  className="  text-green-400"
                />
              </span>
              {/* Step Line  start  */}
              <span
                className={`
                  ${
                    StepTrackerValues.StartTime && !StepTracker.setStartTime
                      ? "opacity-100 -bottom-[100%]"
                      : "opacity-0 top-0"
                  } 
                  
                  mx-4 absolute z-20  duration-500 left-1 h-[100%] w-[1px]
                   border border-yellow-300 border-dashed`}
              ></span>
              {/* Step line Ends  */}
            </li>

            <li
              onClick={() => {
                if (StepTrackerValues.StartTime != false) {
                  setStepTracker((prev) => ({
                    ...prev,
                    setEndsTime: true,
                  }));
                }
              }}
              className="list-none relative z-50 w-fit flex justify-baseline items-center gap-2"
            >
              <span
                className={` ${
                  StepTracker.setEndsTime || StepTrackerValues.EndsTime
                    ? " bg-gradient-to-r from-[#FFC000] to-[#FF9500]"
                    : (!StepTrackerValues.StartTime) && "opacity-50"
                } p-2 px-4 mr-4 rounded-sm bg-gray-400 font-bold text-center `}
              >
                2
              </span>{" "}
              <span
                className={` ${
                  StepTrackerValues.StartTime
                    ? "font-me text-white"
                    : "text-gray-400 "
                } text-sm tracking-wide w-[100px] `}
              >
                {" "}
                Set Ends Time{" "}
              </span>
              <span
                className={`mx-4 duration-200 ${
                  StepTrackerValues.EndsTime && !StepTracker.setEndsTime
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } `}
              >
                <GrStatusGood
                  fontSize={"1.4rem"}
                  className="  text-green-400"
                />
              </span>
              {/* Step Line  start  */}
              <span
                className={`
                  ${
                    StepTrackerValues.EndsTime && !StepTracker.setEndsTime
                      ? "opacity-100 -bottom-[100%]"
                      : "opacity-0 top-0"
                  } 
                  
                  mx-4 absolute z-20  duration-500 left-1 h-[100%] w-[1px]
                   border border-yellow-300 border-dashed`}
              ></span>
              {/* Step line Ends  */}
            </li>

            {/* TODO : start doing with select phase   */}

            <li
              onClick={() => {
                if (StepTrackerValues.EndsTime != false) {
                  setStepTracker((prev) => ({
                    ...prev,
                    selectPhase: true,
                  }));
                }
              }}
              className="list-none relative z-50 w-fit flex justify-baseline items-center gap-2"
            >
              <span
                className={` ${
                  StepTracker.selectPhase || StepTrackerValues.selectPhase
                    ? " bg-gradient-to-r from-[#FFC000] to-[#FF9500]"
                    : !StepTrackerValues.EndsTime && "opacity-50"
                } p-2 px-4 mr-4 rounded-sm bg-gray-400 font-bold text-center `}
              >
                3
              </span>{" "}
              <span
                className={`  ${
                  StepTrackerValues.EndsTime
                    ? "font-me text-white"
                    : "text-gray-400 "
                }  text-gray-400 text-sm tracking-wide w-[100px]`}
              >
                Select Phase
              </span>
              <span
                className={`mx-4 duration-200 ${
                  StepTrackerValues.selectPhase && !StepTracker.selectPhase
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } `}
              >
                <GrStatusGood
                  fontSize={"1.4rem"}
                  className="  text-green-400"
                />
              </span>
              {/* Step Line  start  */}
              <span
                className={`
                  ${
                    StepTrackerValues.selectPhase && !StepTracker.selectPhase
                      ? "opacity-100 -bottom-[100%]"
                      : "opacity-0 top-0"
                  } 
                  
                  mx-4 absolute z-20  duration-500 left-1 h-[100%] w-[1px]
                   border border-yellow-300 border-dashed`}
              ></span>
              {/* Step line Ends  */}
            </li>

            <li
              onClick={() => {
                if (StepTrackerValues.selectPhase != false) {
                  setStepTracker((prev) => ({
                    ...prev,
                    lockingPeriod: true,
                  }));
                }
              }}
              className="list-none relative z-50 w-fit flex justify-baseline items-center gap-2"
            >
              <span
                className={` ${
                  StepTracker.lockingPeriod ||
                  StepTrackerValues.lockingPeriodTime
                    ? " bg-gradient-to-r from-[#FFC000] to-[#FF9500]"
                    : !StepTrackerValues.selectPhase && "opacity-50"
                } p-2 px-4 mr-4 rounded-sm bg-gray-400 font-bold text-center `}
              >
                4
              </span>{" "}
              <span
                className={`  ${
                  StepTrackerValues.selectPhase
                    ? "font-me text-white"
                    : "text-gray-400 "
                }   text-sm tracking-wide w-[100px]`}
              >
                Locking Token
              </span>
              <span
                className={`mx-4 duration-200 ${
                  StepTrackerValues.lockingPeriodTime &&
                  !StepTracker.lockingPeriod
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } `}
              >
                <GrStatusGood
                  fontSize={"1.4rem"}
                  className="  text-green-400"
                />
              </span>
            </li>
          </div>

          {/* Steps Ends  */}

          {/* Subbmit button start  */}
          {compleatedFeilds >= 4 && (
            <button className="submit mt-12 bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white font-semibold text-sm p-1 px-4 rouned-sm">
              Continue
            </button>
          )}
          {/* Subbmit button ends  */}
        </div>
        {/* Stages SectionEnds */}
      </div>
      {/* ICO Page Ends  */}
    </AdminLayoutWrapper>
  );
}
