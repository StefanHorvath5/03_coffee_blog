/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { notFound, useRouter } from "next/navigation";
import { Roles } from "../lib/types";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/login");
    } catch (err: any) {
      setError("Logout failed");
    }
  }

  useEffect(() => {
    if (!loading && (!user || user.role !== Roles.ADMIN)) {
      return notFound();
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== Roles.ADMIN) return notFound();

  return (
    <div className="max-w-sm mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div>Email: {user.email}</div>
      <div>Role: {user.role}</div>
      <Link href="/postsAdmin" className="text-blue-600 underline">
        Posts Admin
      </Link>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white p-2 rounded mt-4"
      >
        Logout
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
