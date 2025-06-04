"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useWallet } from "../walletContext/WalletContext"; // Import the useWallet hook
import { userAuth } from "@/Use_Context/authContext";
import axios from "axios"; // Import axios for API calls
import { useState } from "react"; // Import useState for managing modal state
import { BASE_URL, BASE_URL1 } from "../config/config";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const menuItems = [
  { name: "ICO", path: "/admindashboard" },
  { name: "Reward", path: "/reward" },
  { name: "contract Balance", path: "/contractBalance" },
  { name: "Locking Balance", path: "/lockingBalance" },
  // { name: 'Transaction History', path: '/transactions' },
  // { name: 'Ambassador', path: '/ambassador' },
  // { name: 'My Wallet', path: '/dashboard' },
  // { name: 'KYC', path: '/kyc' },
  // { name: 'My Profile', path: '/profile' },
];

export default function AdminSidebar() {
  
  const [showSideBar, setShowSideBar] = useState(false);
  const pathname = usePathname();

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
      </ul>
    </div>
  );
}
