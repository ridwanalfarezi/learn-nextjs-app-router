"use client";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const { user, signOut } = useClerk();
  const router = useRouter();
  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <span className="font-semibold">{user?.fullName}</span>
          <button
            className="underline"
            onClick={async () => {
              await signOut();
              router.replace("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
