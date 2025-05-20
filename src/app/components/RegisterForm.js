"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { resgiter } from "../lib/action";


/**
 * RegisterForm component handles user registration.
 * It manages form inputs for name, email, and password,
 * shows error and success messages, and handles loading state.
 * 
 * On successful registration, it redirects the user to the homepage.
 * 
 * @component
 * @author wignn
 * @returns {JSX.Element} Registration form UI
 */

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resgiter({
        name,
        email,
        password,
      });

      if (res.success) {
        setError(res.error);
        setSuccess("");
      } else {
        setSuccess("Login berhasil!");
        setError("");
        window.location.href = "/";
      }
    } catch (error) {
        console.log("Error:", error);
        setError("Terjadi kesalahan, silakan coba lagi.");
    }finally {
        setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-8"
      >
        <h1 className="text-2xl font-bold">Toko Roti</h1>
        <p className="text-gray-500 mt-2">Masuk ke akun Anda</p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Nama
            </label>
            <input
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan email Anda"
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </motion.div>

      {/* Alternative Login Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-4"
      >
        <div className="flex items-center gap-4 my-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-500">atau masuk dengan</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Google
          </button>
          <button className="flex-1 border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Facebook
          </button>
        </div>
      </motion.div>
    </div>
  );
}
