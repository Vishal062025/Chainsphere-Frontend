"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/signup-form";

export default function SignupFormWrapper() {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    const codeFromURL = searchParams.get("referralCode");

    // If referral code is in URL, save it to localStorage
    if (codeFromURL) {
      localStorage.setItem("referralCode", codeFromURL);
      setReferralCode(codeFromURL);
    } else {
      // If not in URL, try to get it from localStorage
      const storedCode = localStorage.getItem("referralCode");
      if (storedCode) {
        setReferralCode(storedCode);
      }
    }
  }, [searchParams]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm referralCode={referralCode} />
      </div>
    </div>
  );
}
