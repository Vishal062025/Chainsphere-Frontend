"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { userAuth } from "@/Use_Context/authContext";
import { useRouter } from "next/navigation";
import { navItem } from "@/lib/constant";
import { useScrollSpy } from "@/hooks/useScrollSpy";

function Navbar() {
  const { authUser, logout } = userAuth();
  const router = useRouter();
  // let user = {};
  // if (authUser) {
  //   user = typeof userDetails === 'string' ? JSON.parse(userDetails) : userDetails;
  // }

  const sectionIds = navItem.map(item => item.id);
  const activeSectionId = useScrollSpy(sectionIds);

  function handleNavItemClick(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth", block: "start"}); 
  }

  return (
    <nav className="fixed bg-black top-0 left-0 w-full flex justify-between z-150 shadow-md">
      <div className="left flex justify-start p-2 items-center max-w-fit">
        <img
          src="/images/logo.svg"
          alt="logo"
          className="cursor-pointer w-12 p-2"
          onClick={() => router.push("/")}
        />
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          Chainsphere
        </span>
      </div>

      <ul className="flex gap-11 items-center">
        {navItem.map((item, idx) => (
          <li
            key={idx}
          >
            <a
              className={`font-semibold cursor-pointer transition-colors duration-100 ease-in-out 
                        ${item.id === activeSectionId ? 'text-[#9b4bff]' : 'hover:text-[#9b4bff]'}`}
              onClick={() => handleNavItemClick(item.id)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="right p-4 flex gap-1 sm:gap-5">
        {!authUser ? (
          <>
            <Link className="cursor-pointer" href="/login">
              <Button className="z-50 cursor-pointer text-black hover:bg-gray-200">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="cursor-pointer text-black hover:bg-gray-200 ">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="wrapper flex gap-1 sm:gap-3 justify-center items-center">
              {/* <h2 className="username ">
                  {user?.firstName}
                </h2> */}
              <appkit-button />

              <Link className="cursor-pointer mx-2  lg:block" href="/dashboard">
                <Button className="z-50 cursor-pointer text-black hover:bg-gray-200">
                  Dashboard
                </Button>
              </Link>
              <Link className="cursor-pointer mx-2" href="/login">
                <Button
                  onClick={logout}
                  className="z-50 cursor-pointer text-black hover:bg-gray-200"
                >
                  Logout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;