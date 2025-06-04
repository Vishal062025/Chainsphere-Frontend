import { SignupForm } from "@/components/signup-form"

export default function LoginPage() {
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max -w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
