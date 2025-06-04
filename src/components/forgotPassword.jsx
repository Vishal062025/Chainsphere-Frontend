"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BASE_URL } from "@/config/config";

export function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState(null);

  const handleSubmite = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("email", email);
      localStorage.setItem("requestforChangePassword", true);

      const res = await axios.post(
        `${BASE_URL}/user/forgot-password`,
        { email: email }
      );

      if (res.success) toast("please verify otp");
      router.push("/verify_otp");

    } catch (error) {
      toast("something went wrong", error);
    }

  };

  return (
    <div className={cn("flex  flex-col gap-6")}>
      <Card className="overflow-hidden  p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmite} className="p-6 md:p-8">
            <div className="flex  flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Email</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your mail
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="m@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/logo.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain p-8 "
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
