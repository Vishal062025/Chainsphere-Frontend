"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/config/config";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import Image from "next/image";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
          token,
        });

        if (res.status === 201) {
          setStatus("success");
          setMessage(res.data.message || "Email verified successfully!");
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        setStatus("error");
        setMessage(error?.response?.data?.message || "Verification failed.");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8 flex flex-col items-center justify-center gap-6 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="animate-spin h-12 w-12 text-primary" />
              <p className="text-sm text-muted-foreground">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold text-green-700">{message}</p>
              <Button className="w-full" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-lg font-semibold text-red-700">{message}</p>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push("/register")}
              >
                Back to Signup
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
