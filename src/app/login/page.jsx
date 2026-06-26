"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    console.log(userData);
    const {data,error}= await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackUrl:"/"
    })
  };
    const [error, setError] = useState("");

    const handleLogin = async (e) => {a
      e.preventDefault();

      setError("");

      const form = e.target;

      const email = form.email.value;
      const password = form.password.value;

      try {
        toast.success("Login successful!");
      } catch (err) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    };

    const handleGoogleLogin = async () => {
      try {
        toast.success("Google login successful!");
      } catch (err) {
        toast.error("Google login failed");
      }
    };

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

          <p className="text-center text-gray-500 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            <button className="btn btn-primary w-full">Login</button>
          </form>
          <div className="divider my-6">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-primary font-semibold cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
