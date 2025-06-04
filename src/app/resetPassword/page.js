"use client";
import { ResetPasswordForm } from "@/components/resetPasswordForm";
import { useRouter } from "next/navigation";
 
export default function LoginPage() {
  const router = useRouter();
  let requested = localStorage.getItem("requestforChangePassword");
  if(!requested){
    router.push("/login")
  }
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
