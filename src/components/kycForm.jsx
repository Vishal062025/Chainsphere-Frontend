"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { PiImagesFill } from "react-icons/pi";
import axios from "axios";
import { BASE_URL } from "@/config/config";

export function KycForm() {
  const [kycData, setKycData] = useState({
    documentId: "",
    documentFront: null,
    documentBack: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("documentId", kycData.documentId);
    formData.append("images", kycData.documentFront);
    formData.append("images", kycData.documentBack);

    const token = localStorage.getItem('token')

    const res = await axios.post(`${BASE_URL}1/user/documents`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
    })
    console.log("the response is here Succcess ",res);
  };
  console.log("the kyc data is here ", kycData)

  return (
    <div className={cn("flex  flex-col gap-6")}>
      <Card className="overflow-hidden  p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex  flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">KYC Verification</h1>
                <p className="text-muted-foreground text-balance">
                  Please complete your KYC to continue
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="documentId">Aadhaar Number</Label>
                <Input
                  id="documentId"
                  type="text"
                  value={kycData.documentId}
                  onChange={(e)=>{setKycData({...kycData, documentId:e.target.value})}}
                  maxLength="12"
                  pattern="\d{12}"
                  inputMode="numeric"
                  placeholder="Enter 12-digit Aadhaar number"
                  required
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="documentFront">Front Side of Aadhaar Card <PiImagesFill/></Label>
                <Input id="documentFront"
                  onChange={(e)=>{setKycData({...kycData, documentFront : e.target.files[0]})}}
                type="file" />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="documentBack">Back Side of Aadhaar Card <PiImagesFill/></Label>
                <Input id="documentBack"
                  onChange={(e)=>{setKycData({...kycData, documentBack : e.target.files[0]})}}
                type="file" />
              </div>

              <Button type="submit" className="w-full">
                Verify
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
