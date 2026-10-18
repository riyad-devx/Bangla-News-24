"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-4 top-4 flex items-center gap-3 text-sm">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <Link href={"/profile"}>
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-red-600">
                <img src={user?.image || ""} alt="User Avatar" />
              </div>
            </div>
          </Link>

          <h2 className="font-semibold">{user?.name}</h2>

          <button onClick={handleSignout} className="btn btn-error btn-xs">
            Signout
          </button>
        </div>
      ) : (
        <div>
          <Link
            href="/signin"
            className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
