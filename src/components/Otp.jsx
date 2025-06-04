"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BASE_URL } from "@/config/config";

const Otp = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("email") || "";
    }
    return "";
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // email =

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/resendOtp`, {
        email,
      });
      toast("OTP resent successfully");

      setTimeLeft(60);
      setIsResendDisabled(true);
    } catch (error) {
      console.log(error.response.data.message);
      toast("Failed to resend OTP: ", error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("OTP submitted:", otp);

    if (otp.length !== 6) {
      toast("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setIsVerifying(true);

      const res = await axios.post(`${BASE_URL}/user/verifyOtp`, {
        email,
        otp,
      });

      // console.log("OTP verification success:", res.data);

      toast("OTP verification success ");

      const requestForChangepassword = localStorage.getItem("requestforChangePassword");
      if(requestForChangepassword){
        router.push("/resetPassword");
      }else{
        router.push("/login");
      }

    } catch (error) {
      console.log(error.response.data.message);
      toast("OTP verification failed:", error.response.data.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0 max-w-full w-[600px] mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Verify OTP</h1>
                <p className="text-muted-foreground text-balance">
                  Enter the OTP to login to your Chainsphere account
                </p>
              </div>
              <div className="otpBoxes text-white flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" className="w-full" disabled={isVerifying}>
                Submit
              </Button>

              <p
                className={`text-blue-800 cursor-pointer ms-auto text-sm ${isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={!isResendDisabled ? resendOtp : undefined}
              >
                {isResendDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
              </p>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/logo.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain p-8"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;
