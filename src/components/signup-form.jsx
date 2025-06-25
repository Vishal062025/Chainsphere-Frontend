"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner"
import { BASE_URL } from "@/config/config";

export function SignupForm({referralCode, className, ...props }) {
  const [loading, setLoading] = useState(false);

  // const navigate =useNavigate();
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);
  const rawData = Object.fromEntries(formData.entries());

  if (rawData.password !== rawData.confirmPassword) {
    toast("Password and confirm password must be the same");
    setLoading(false);
    return;
  }

  const data = {
    ...rawData,
    ...(referralCode && { referal: referralCode }), // Use 'referral' or 'referal' as per your backend
  };

  console.log({ data });

  try {
   const res= await axios.post(`${BASE_URL}/api/auth/signup`, data);
   if(res.status==200){
      toast(res.data.message);
   }
   
    
  } catch (err) {
    console.error("Signup error: ", err);
    toast(err?.response?.data?.error || "Signup failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 max-w-full w-[700px] mx-auto">
        <CardContent>
          <form className="p-2 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Sign Up to your Chainsphere account
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" type="text" placeholder="Matt" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" type="text" placeholder="USA" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" type="text" placeholder="California" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" type="text" placeholder="Los Angeles" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="text" placeholder="MM-DD-YYYY" required />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" type="text" placeholder="123 Main St, Apartment 4B" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" type="text" placeholder="90001" required />
              </div>

              {/* <div className="grid md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="ibiName">IBI Name</Label>
                  <Input id="ibiName" name="ibiName" type="text" placeholder="Some Business" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="ibiId">IBI ID</Label>
                  <Input id="ibiId" name="ibiId" type="text" placeholder="IBI123456" required />
                </div>
              </div> */}

              <div className="grid gap-3">
                <Label htmlFor="referal">Referal</Label>
                <Input id="referal" name="referal" disabled={referralCode ?? false} type="text" placeholder="If you have a referal code" value={referralCode} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="matt@yopmail.com" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
              </div>

              {/* <div className="grid gap-3">
                <Label htmlFor="referal">Referal</Label>
                <Input id="referal" name="referal" type="text" placeholder="referal code" value={referal.referralCode} />
              </div> */}

              <Button type="submit" className="cursor-pointer w-full" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}