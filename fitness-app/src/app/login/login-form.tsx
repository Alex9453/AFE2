"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "../../app/api/services/loginService";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await loginUser(email, password);

      // Save jwt to cookies
      Cookies.set("authToken", data.jwt, {
        expires: 7,
        path: "/",
        sameSite: "Lax",
        secure: true,
      });

      console.log("Login Form: Token saved to cookies:", data.jwt);

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}