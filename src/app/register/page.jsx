"use client"

import { SignupForm } from "@/components/signup-form"
import { useSearchParams } from "next/navigation";

export default function SignupFormWrapper() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm referralCode={referralCode} />
      </div>
    </div>
  );
}
