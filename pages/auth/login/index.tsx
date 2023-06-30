import * as React from "react";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Button from "@/components/button/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

interface signIn {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}

const SignInProvider = ({
  children,
  onClick,
}: React.PropsWithChildren<signIn>) => {
  return (
    <Button
      className="w-full rounded-md  flex h-10 justify-center items-center p-0 hover:bg-gray-100 hover:border-gray-300"
      onClick={onClick}
      type="outlined"
    >
      {children}
    </Button>
  );
};

const LoginPage = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signIn("Sign In", {
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const onSignIn = (e: any, provider: string, callbackUrl = "") => {
    e.preventDefault();
    signIn(provider, {
      callbackUrl: `http://localhost:3000${callbackUrl}`,
    });
  };

  return (
    <div className="container max-w-sm mx-auto mt-6">
      <div className="flex flex-col items-center ">
        <div className="flex flex-col gap-2 w-full mb-10">
          <h4 className="font-normal text-2xl text-[#212529] tracking-wider">
            Sign in to Cinemov
          </h4>
          <p className="text-[#637381] text-base font-medium">
            Enter your details below.
          </p>
        </div>
        <div className="w-full flex gap-3">
          <SignInProvider onClick={(e: any) => onSignIn(e, "google")}>
            <FcGoogle size={18} />
          </SignInProvider>
          <SignInProvider>a</SignInProvider>
          <SignInProvider>a</SignInProvider>
          <SignInProvider>a</SignInProvider>
        </div>
        <div className="w-full h-10 justify-center flex relative items-center my-3">
          <p className="text-[#637381] z-1 ">OR</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
          />
          <div className="flex flex-col gap-4">
            <Link
              href=""
              className="text-[#824179] hover:text-[#be72b4] text-sm font-medium"
            >
              Foget password?
            </Link>
            <Button type="submit" fullWidth className="bg-blue text-white">
              Sign In
            </Button>
          </div>
          <div className="text-sm flex gap-1 justify-center">
            <p className="font-medium">Not a member yet?</p>
            <Link
              href=""
              className="text-[#824179] hover:text-[#be72b4] font-medium"
            >
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
