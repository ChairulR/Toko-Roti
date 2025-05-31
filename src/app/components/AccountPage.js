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
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await getUserById(user.id);
        if (res) {
          setProfile(res);
          setUpdatedProfile({ name: res.name, email: res.email });
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
    try {
      await axios.put("/api/account", updatedProfile);
      alert("Profil berhasil diperbarui!");
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container min-h-screen flex flex-col pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-4 border-b border-gray-100"
      >
        <div className="flex items-center">
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
          <h1 className="text-xl font-bold flex-1 text-center pr-8">Profil Saya</h1>
        </div>
      </motion.div>

      {/* Profile Picture & Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center py-6"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mb-3">
          <span className="text-3xl font-bold text-gray-500">{profile.name?.charAt(0)}</span>
        </div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-gray-500 text-sm">Member sejak {formatDateToDMY(profile.createdAt)}</p>
      </motion.div>

      {/* User Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4"
      >
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Informasi Akun</h3>

          {editMode ? (
            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Nama</p>
                  <input
                    type="text"
                    name="name"
                    value={updatedProfile.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <input
                    type="email"
                    name="email"
                    value={updatedProfile.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="submit" className="save-button">Simpan Perubahan</button>
                <button type="button" onClick={() => setEditMode(false)} className="cancel-button">Batal</button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Nama</p>
                <p className="font-medium">{profile.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>

              <button onClick={() => setEditMode(true)} className="edit-button">Edit Profil</button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 p-3 border border-red-200 text-red-500 rounded-lg font-medium"
        >
          Keluar
        </button>
      </motion.div>
    </div>
  );
}