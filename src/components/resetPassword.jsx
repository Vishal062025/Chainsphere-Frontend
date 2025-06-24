"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { BiShow, BiHide } from "react-icons/bi";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/config/config";

export default function ResetPasswordForm({ className, ...props }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing from URL.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword: formData.newPassword,
      });

      if (response.status==200) {
        toast.success("Password reset successfully");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Reset failed");
      }
    } catch (err) {
      toast.error("Something went wrong", {
        description: err?.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleResetPassword} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground text-sm">
                  Set your new password below
                </p>
              </div>

              {/* New Password */}
              <div className="grid gap-3">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    placeholder="Enter new password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer"
                  >
                    {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your password"
                    required
                  />
                  <span
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <BiHide size={20} />
                    ) : (
                      <BiShow size={20} />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              width={358}
              height={358}
              loading="lazy"
              src="/images/logo.svg"
              alt="Reset Password Illustration"
              className="absolute inset-0 h-full w-full object-contain p-8"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By continuing, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
