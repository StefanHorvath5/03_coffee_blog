/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { requestPasswordReset } from "../lib/api";
import ErrorMessage from "../components/ErrorMessage";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <ErrorMessage message={error} />
        {success ? (
          <div className="text-green-600">
            Check your email for a reset link.
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
}
