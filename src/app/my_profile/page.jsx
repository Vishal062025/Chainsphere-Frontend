"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "@/config/config";

export default function Page({ className, ...props }) {
  const [user, setUser] = useState({
    firstName: "Matt",
    lastName: "Doe",
    country: "USA",
    state: "California",
    city: "Los Angeles",
    dob: "15-06-1998",
    address: "123 Main St, Apartment 4B",
    zipCode: "90001",
    ibiName: "Some Business",
    ibiId: "IBI123456",
    email: "matt@yopmail.com"
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token") || "vishwas"; 
        if (!token) {
          toast.error("No token found");
          return;
        }
        
        // document.cookie("token", token, { path: "/" });
        // console.log("this is the cookie ",document.cookie)
  
        const response = await axios.get(`${BASE_URL}/api/user/myProfile`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiaDJAeW9wbWFpbC5jb20iLCJpYXQiOjE3NDQxMTMzMzAsImV4cCI6MTc0NDM3MjUzMH0.BrkBr21xVrWEEiQ1-JURmnIIk_Q5zCWxWmH5SyU-utQ`,
          },
        });
  
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to load profile data.");
        console.error(error);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0 w-full mx-auto">
            <CardContent>
              <form className="p-2 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <p className="text-muted-foreground text-balance mt-2">
                      You can't modify any details here.
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={user?.firstName || ""} readOnly />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={user?.lastName || ""} readOnly />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={user?.country || ""} readOnly />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" value={user?.state || ""} readOnly />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={user?.city || ""} readOnly />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" value={user?.dob || ""} readOnly />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={user?.address || ""} readOnly />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" value={user?.zipCode || ""} readOnly />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="ibiName">IBI Name</Label>
                      <Input id="ibiName" value={user?.ibiName || ""} readOnly />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="ibiId">IBI ID</Label>
                      <Input id="ibiId" value={user?.ibiId || ""} readOnly />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ""} readOnly />
                  </div>

                  
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
