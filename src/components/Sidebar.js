"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { useWallet } from "../walletContext/WalletContext"; // Import the useWallet hook
import { userAuth } from "@/Use_Context/authContext";
import axios from "axios"; // Import axios for API calls
import { useState } from "react"; // Import useState for managing modal state
import { BASE_URL } from "../config/config";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Buy CSP", path: "/dashboard" },
  // { name: 'Transaction History', path: '/transactions' },
  // { name: 'Ambassador', path: '/ambassador' },
  // { name: 'My Wallet', path: '/dashboard' },
  // { name: 'KYC', path: '/kyc' },
  // { name: 'My Profile', path: '/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // const { account, connectWallet } = useWallet();
  const { authUser } = userAuth();

  const [showSideBar, setShowSideBar] = useState(false);

  // const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("XYZ"); //Testing With XYZ, Change it Later
  const [copied, setCopied] = useState(false);

  const handleReferClick = async () => {
    // if (!authUser) {
    //   alert("Please log in first.");
    //   return;
    // }

    // const token = authUser;
    try {
      // const response = await axios.get(`${BASE_URL}/user/referral-code`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   },
      // });

      // setReferralCode(response.data.data.referralCode);
      // setModalOpen(true);
      router.push(`/referral`);
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  // Function to copy referral code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(BASE_URL + "registerReferral/" + referralCode)
      .then(() => {
        // alert("Referral code copied to clipboard!"); // Notify user
        setCopied(true); // Set copied status to true
      });
  };

  return (
    <div
      className={`w-64 bg-black text-white h-screen p-5 absolute z-50 md:static ${
        showSideBar ? "left-0" : "left-[-257px]"
      } md:w-64 sm:w-40`}
    >
      {/* show/hide side bar in mobile view start   */}
      <div className="show/hide md:hidden relative w-[100%]">
        {showSideBar ? (
          <span
            className="absolute right-2 "
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}
          >
            <FaArrowLeft color="white" />{" "}
          </span>
        ) : (
          <span
            className="absolute -right-10"
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}
          >
            <FaArrowRight color="white" />{" "}
          </span>
        )}
      </div>
      {/* show/hide side bar in mobile view ends   */}

      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`mb-4 p-2 ${
              pathname === item.path
                ? "hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white duration-200 ease-linear p-2 rounded-lg text-black text-start border-none"
                : ""
            }`}
          >
            <Link
              href={item.path}
              className="block hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] p-2 rounded-lg"
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li
          className="cursor-pointer mt-2 mb-2 hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white duration-200 rounded-lg p-2 px-3 text-left ease-linear g-transparent w-[100%]"
          onClick={handleReferClick}
        >
          Refer Someone!
        </li>
        {/* Conditional rendering based on wallet connection */}
        {
          // <div className="mb-4 p-2 rounded-lg hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white duration-200 ease-linear">
          //   Account: {account.slice(0, 7) + "..." + account.slice(-4)}{" "}
          //   {/* Display shortened address */}
          // </div>
        // ) : (
          // <li
          //   className="cursor-pointer mt-2 mb-2 hover:bg-gradient-to-r from-[#FFC000] to-[#FF9500] text-white duration-200 rounded-lg p-2 px-3 text-left ease-linear g-transparent w-[100%]"
          //   // onClick={connectWallet}
          // >
          //   Connect Wallet
          // </li>
      //</div>  )
      }
      </ul>

      {/* Modal for displaying referral code */}
      {/* {modalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-grey-600 bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white max-w-sm  sm:max-w-full text-black p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Here is your referral link:</h2>
            <h3 className="text-md text-gray-500 font-semibold">
              (click the link to copy)
            </h3>
            <p
              className={`text-sm sm:text-xl cursor-pointer transition-all duration-300 ease-in-out ${
                copied ? "text-green-500 transform scale-105" : ""
              }`}
              onClick={copyToClipboard}
              onMouseEnter={() => setCopied(false)}
            >
              {BASE_URL + "registerReferral/" + referralCode}{" "}
            </p>
            {copied && <span className="text-green-500">Copied!</span>}{" "}
            <Button className="mt-4" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )} */}
      
    </div>
  );
}
