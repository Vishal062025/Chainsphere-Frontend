"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { userAuth } from "@/Use_Context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

function Navbar() {
  const { authUser, logout } = userAuth();
  const router = useRouter();
  // let user = {};
  // if (authUser) {
  //   user = typeof userDetails === 'string' ? JSON.parse(userDetails) : userDetails;
  // }

  return (
      <nav className="fixed bg-black top-0 left-0 w-full flex justify-between z-150 shadow-md">
        <div className="left flex justify-start p-2 items-center w-full "  >
          <img src="/images/logo.svg" alt="logo" className="cursor-pointer w-12 p-2" onClick={()=> router.push("/")} />
          <span className="cursor-pointer" onClick={()=> router.push("/")}>Chainsphere</span>
        </div>
        <div className="right p-4 flex gap-1 sm:gap-5">
          {!authUser ?
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
            :
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

                  <Button onClick={logout} className="z-50 cursor-pointer text-black hover:bg-gray-200">
                    Logout
                  </Button>
                </Link>
              </div>
            </>}
        </div>
      </nav>
  );
}

export default Navbar;