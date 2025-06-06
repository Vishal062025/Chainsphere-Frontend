"use client";
import { ResetPasswordForm } from "@/components/resetPasswordForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const requested = localStorage.getItem("requestforChangePassword");
    if (!requested) {
      router.push("/login");
    }
  }, [router]);
  
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
