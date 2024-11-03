"use client";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn.create({ identifier: email, password });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}