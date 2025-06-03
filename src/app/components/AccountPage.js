"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import axios from "axios";
import { getUserById } from "../lib/action";
import { formatDateToDMY } from "../lib/utils";
import ProfileSkeleton from "./skeleton/Profile-skeleton";

export default function ProfilePage({ user }) {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: "", address: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await getUserById(user.id);
        if (res) {
          setProfile(res);
          setUpdatedProfile({ name: res.name, address: res.address, password: "" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const { updateProfile } = await import("@/app/lib/action");

  const result = await updateProfile({
    name: updatedProfile.name,
    address: updatedProfile.address,
    password: updatedProfile.password,
  });

  if (result.success) {
    alert(result.message);
    setProfile({
      ...profile,
      name: updatedProfile.name,
      address: updatedProfile.address,
    });
    setEditMode(false);
    setUpdatedProfile({ ...updatedProfile, password: "" });
  } else {
    alert(result.message || "Terjadi kesalahan");
  }
};



  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="w-full min-h-screen flex flex-col pb-24 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-4 border-b border-gray-100"
      >
        <div className="w-full flex items-center">
          <button onClick={() => router.push("/")} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-xl font-bold flex-1 text-center pr-8">
            Profil Saya
          </h1>
        </div>
      </motion.div>

      {/* Profil Foto + Nama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center py-6"
      >
        <div className="relative w-24 h-24 mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg flex items-center justify-center">
          <span className="text-white text-4xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500 text-sm">
          Member sejak {formatDateToDMY(profile.createdAt)}
        </p>
      </motion.div>

      {/* Informasi Akun */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 flex-1"
      >
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-4 shadow-xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            👤 Informasi Akun
          </h3>
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Nama</p>
                <input
                  type="text"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-sm text-gray-700">
                  {profile.email}
                </p>
              </div>
              <div>
              <p className="text-xs text-gray-500">Alamat</p>
              <input
                type="text"
                name="address"
                value={updatedProfile.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                placeholder="Alamat rumah"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">Password Baru</p>
              <input
                type="password"
                name="password"
                value={updatedProfile.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                placeholder="Kosongkan jika tidak ingin mengubah"
              />
            </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Nama</p>
                <p className="font-medium text-gray-800">{profile.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Alamat</p>
                <p className="font-medium text-gray-800">{profile.address || "Belum diisi"}</p>
              </div>
            </div>
            
          )}
        </div>

        {/* Tombol Logout */}
        <div className="flex justify-center mt-6 gap-20">
          <button
            onClick={() => setEditMode(true)}
            className="px-7 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
            >
            Edit Profil
          </button>
          <button
            onClick={handleLogout}
            className="justify-start px-10 py-3 p-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-all"
          >
            Keluar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
