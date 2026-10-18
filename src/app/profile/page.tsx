"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if(!user){
    redirect('/signin')
  }

  const [show, setShow] = useState(false)


  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    await authClient.updateUser({
      ...newUserData,
    });
  };

  const handleShowFrom = () =>{
    setShow(!show)
  }

  return (
    <div className="mt-5 bg-base-200 ">
      <div className="flex flex-col items-center">
        <Link href={"/profile"}>
          <div className="avatar">
            <div className="w-10 rounded-full ring-2 ring-red-600">
              <img src={user?.image || ""} alt="User Avatar" />
            </div>
          </div>
        </Link>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>

        <button onClick={handleShowFrom} className="btn">Edit profile</button>

        { show && <form onSubmit={handleUpdateProfile}>
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

            <button type="submit" className="btn bg-red-600 mt-4 text-amber-50">
              Update Profile
            </button>
          </fieldset>
        </form>}
      </div>
    </div>
  );
};

export default ProfilePage;
