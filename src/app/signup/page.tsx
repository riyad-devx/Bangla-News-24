"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { toast } from "react-toastify";

const SignupPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        if (
          error.message?.toLowerCase().includes("already") ||
          error.message?.toLowerCase().includes("exist")
        ) {
          toast.error("এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে!");
        } else {
          toast.error(error.message || "Signup failed! আবার চেষ্টা করো।");
        }

        console.log(error);
        return;
      }

      if (data) {
        toast.success("সাইন আপ সফল হয়েছে! 🎉");

        console.log(data);

        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      toast.error("কিছু একটা সমস্যা হয়েছে! আবার চেষ্টা করো।");
    }
  };

  const handleGoogleSignup = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google Sign in failed!");
      console.log(error);
      return;
    }

    console.log(data);
  };

  const handleGithubSignup = async()=>{
    const data = await authClient.signIn.social({
      provider:"github"
    });
    console.log(data)
  }

  return (
    <div className="mt-5">
      <h2 className="flex justify-center text-2xl font-bold text-red-700">
        সাইন আপ
      </h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">
          <label className="label">নাম</label>
          <input
            name="name"
            type="text"
            className="input w-md"
            placeholder="Name"
            required
          />

          <label className="label">Image</label>
          <input
            name="image"
            type="url"
            className="input w-md"
            placeholder="Image"
          />

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

          <button type="submit" className="btn bg-red-600 mt-4 text-amber-50">
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="btn mt-3 flex w-full items-center justify-center"
      >
        Sign up with Google
      </button>
      <button
        type="button"
        onClick={handleGithubSignup}
        className="btn mt-3 flex w-full items-center justify-center"
      >
        Sign up with Github
      </button>
    </div>
  );
};

export default SignupPage;
