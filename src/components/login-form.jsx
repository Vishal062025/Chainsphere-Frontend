"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { userAuth } from "@/Use_Context/authContext";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/config/config";

export function LoginForm({ className, ...props }) {

  const { login, checkAuth } = userAuth();

  const router = useRouter();

  // temp validation if user is already login
  // useEffect(() => {
  //   if (localStorage.getItem("token")) router.push("/dashboard")
  // }, [router]);
  
  useEffect(() => {
    checkAuth()
  }, [router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData
      );
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast("Login Successfully");
      login(token, response.data.data);
      router.push("/dashboard");

    } catch (error) {
      toast("Something went wrong")
    }
  };

  return (
      <div className={cn("flex  flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden  p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex  flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Chainsphere account
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgotPassword"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="inputWraper flex relative">

                    <Input
                      id="password"
                      type={`${showPassword ? "text" : "password"}`}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="enter your password"
                      required
                    />
                    {showPassword ? (
                      <span
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                        className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                      >
                        {" "}
                        <BiShow fontSize={"1.2rem"} />{" "}
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                        className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                      >
                        {" "}
                        <BiHide fontSize={"1.2rem"} />{" "}
                      </span>
                    )}
                  </div>
                </div>

                <Button type="submit" className="cursor-pointer w-full">
                  Login
                </Button>
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
            <Image
              width={358}
              height={358}
              loading="lazy"
                src="/images/logo.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-contain p-8 "
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
  );
}
