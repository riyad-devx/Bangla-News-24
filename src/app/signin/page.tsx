"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SigninPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign in failed! আবার চেষ্টা করো।");
        console.log(error);
        return;
      }

      if (data) {
        toast.success("সাইন ইন সফল হয়েছে! 🎉");
        console.log(data);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("কিছু একটা সমস্যা হয়েছে! আবার চেষ্টা করো।");
    }
  };

  const handleGoogleSignIn = async ()=>{
     const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data)
  }

  const  handleGithubSignIn = async () =>{
    const data = await authClient.signIn.social({
      provider:"github"
    });
    console.log(data)
  }

  return (
    <div className="mt-5">
      <h2 className="flex justify-center text-2xl font-bold text-red-700">
        সাইন ইন
      </h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
            required
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="btn bg-red-600 mt-4 text-amber-50"
          >
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
      <button onClick={handleGoogleSignIn} className="btn mt-3 flex w-full items-center justify-center">Sign In with Google</button>
      <button onClick={handleGithubSignIn} className="btn mt-3 flex w-full items-center justify-center">Sign In with Github</button>
      
    </div>
  );
};

export default SigninPage;