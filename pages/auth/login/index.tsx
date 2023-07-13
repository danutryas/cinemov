import * as React from "react";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Button from "@/components/button/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

interface signIn {
  children: React.ReactNode;
  provider?: string;
  callbackUrl?: string;
}

const SignInProvider = ({
  children,
  provider,
  callbackUrl = "",
}: React.PropsWithChildren<signIn>) => {
  const onSignIn = (e: any) => {
    e.preventDefault();
    signIn(provider, {
      callbackUrl: `https://cinemov.vercel.app${callbackUrl}`,
    });
  };
  return (
    <button
      className="w-full rounded-md  flex h-10 justify-center items-center p-0 hover:bg-gray-100 hover:border-gray-300 gap-2"
      onClick={(e: any) => onSignIn(e)}
    >
      {children}
    </button>
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
  const onSignIn = (provider: string, callbackUrl = "") => {
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
        {/* <div className="w-full flex gap-3">
          <SignInProvider>a</SignInProvider>
          <SignInProvider>a</SignInProvider>
          <SignInProvider>a</SignInProvider>
        </div>
        <div className="w-full h-10 justify-center flex relative items-center my-3">
          <p className="text-[#637381] z-1 ">OR</p>
        </div> */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <SignInProvider provider="google">
            <FcGoogle size={18} />
            <p className="font-semibold text-md -mt-1">Login With Google</p>
          </SignInProvider>
          {/* <TextField
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
          </div> */}
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
