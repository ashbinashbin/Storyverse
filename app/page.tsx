"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/api";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // LOGIN FUNCTION
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const data = await loginUser(
        email,
        password
      );

      // LOGIN FAILED
      if (!data.token) {

        setError(
          data.message ||
          "Invalid credentials"
        );

        setLoading(false);

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      // REDIRECT TO HOME
      router.push("/home");

    } catch (error) {

      console.log(error);

      setError("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#e8e0e7] min-h-screen flex items-center justify-center relative overflow-hidden font-sans">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(221,183,255,0.15) 0%, rgba(10,10,10,0) 70%)",
          }}
        />

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#ddb7ff]/5 blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ddb7ff]/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8fuWHZ9wytN7DcLDZyEH8vLMfUtcYwm3Kp7GcsSlWTasqDjxNBI-Ybu3jVGz9BnsEXvxBo5d2c0JlZp0zCIHSUbwh9IJIXcMu_baAt99RB0v5dnEQjZdwaZQY3PS0CIhjAFvWx-u3J2o5f4TeFlQBH68KBMWr6JF1JSMwjLcRIOHV6ShOtU37Mfvwz75Go2zAPszsUvVkQSDaPWpJkB-wx58d88VQyKdwOrdYerhI1iD0Qu9VnYfFBFLFFRbri5LiMdkoUYiEOh8z')",
          }}
        />
      </div>

      {/* MAIN */}
      <main className="relative z-10 w-full max-w-[480px] px-5 md:px-0">

        {/* BRAND */}
        <div className="text-center mb-8">

          <h1 className="text-[32px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#ddb7ff] mb-2">

            Storyverse
          </h1>

          <p className="text-[#cdc3d0] text-sm">

            Enter the sanctuary of digital narratives
          </p>
        </div>

        {/* CARD */}
        <div
          className="rounded-[2rem] p-8 md:p-12 border border-white/10"
          style={{
            background:
              "rgba(22, 22, 22, 0.7)",
            backdropFilter: "blur(30px)",
            boxShadow:
              "0 0 40px rgba(0,0,0,0.5)",
          }}
        >

          {/* TABS */}
          <div className="flex bg-[#1d1b1f] p-1 rounded-full mb-8 border border-white/5">

            <button className="flex-1 py-2.5 rounded-full text-sm font-medium bg-[#ddb7ff] text-[#40215e] shadow-lg transition-all duration-300">

              Login
            </button>

            <Link
              href="/register"
              className="flex-1 py-2.5 rounded-full text-sm font-medium text-[#cdc3d0] hover:text-white transition-all duration-300 text-center"
            >
              Sign Up
            </Link>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* EMAIL */}
            <div className="space-y-2">

              <label className="text-sm text-[#cdc3d0] ml-1">

                Email Address
              </label>

              <div className="flex items-center bg-[#373438]/30 border border-white/10 rounded-xl px-4 py-3 transition-all duration-300 focus-within:border-[#ddb7ff] focus-within:shadow-[0_0_15px_rgba(221,183,255,0.1)]">

                <Mail
                  size={20}
                  className="text-[#cdc3d0] mr-3"
                />

                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="bg-transparent border-none outline-none w-full text-[#e8e0e7] placeholder:text-[#cdc3d0]/40"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">

              <div className="flex justify-between items-center ml-1">

                <label className="text-sm text-[#cdc3d0]">

                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#ddb7ff]/70 hover:text-[#ddb7ff] transition-colors"
                >
                  Forgot?
                </button>
              </div>

              <div className="flex items-center bg-[#373438]/30 border border-white/10 rounded-xl px-4 py-3 transition-all duration-300 focus-within:border-[#ddb7ff] focus-within:shadow-[0_0_15px_rgba(221,183,255,0.1)]">

                <Lock
                  size={20}
                  className="text-[#cdc3d0] mr-3"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="bg-transparent border-none outline-none w-full text-[#e8e0e7] placeholder:text-[#cdc3d0]/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-[#cdc3d0] hover:text-[#ddb7ff] transition-colors"
                >
                  {showPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">

                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ddb7ff] text-[#40215e] text-sm font-medium py-4 rounded-xl shadow-[0_0_20px_rgba(221,183,255,0.2)] hover:shadow-[0_0_30px_rgba(221,183,255,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-8 gap-4">

            <div className="h-px flex-1 bg-white/10"></div>

            <span className="text-xs text-[#cdc3d0] uppercase tracking-widest">

              Or login with
            </span>

            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          {/* SOCIAL */}
          <div className="grid grid-cols-2 gap-4">

            {/* GOOGLE */}
            <button className="flex items-center justify-center gap-3 bg-[#373438]/20 border border-white/5 py-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 group">

              <svg
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                />
              </svg>

              <span className="text-sm">
                Google
              </span>
            </button>

            {/* APPLE */}
            <button className="flex items-center justify-center gap-3 bg-[#373438]/20 border border-white/5 py-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 group">

              <span className="text-lg">
                
              </span>

              <span className="text-sm">
                Apple
              </span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center px-4">

          <p className="text-xs text-[#cdc3d0]/60 leading-relaxed">

            By continuing, you agree to Storyverse&apos;s{" "}

            <a
              href="#"
              className="text-[#ddb7ff]/60 hover:text-[#ddb7ff] transition-colors underline decoration-[#ddb7ff]/20"
            >
              Terms of Service
            </a>

            {" "}and{" "}

            <a
              href="#"
              className="text-[#ddb7ff]/60 hover:text-[#ddb7ff] transition-colors underline decoration-[#ddb7ff]/20"
            >
              Privacy Policy
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}