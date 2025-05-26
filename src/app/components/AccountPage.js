"use client"


import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserById } from "../lib/action";
import { useRouter } from "next/navigation";
import { formatDateToDMY } from "../lib/utils";
// import AccountSetting from "./AccountSetting"

/**
 * ProfilePage component to display user's profile and account information.
 *
 * Fetches and displays user data from the server, shows account details,
 * and provides a logout option using NextAuth.
 *
 * @component
 * @param {{ user: { id: string, name: string, email: string } }} props - The current logged-in user.
 * @returns {JSX.Element}
 * @author wignn
 */


export default function ProfilePage({ user }) {

  const router = useRouter()
  const [profile, setProfile] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const res = await getUserById(user.id)
        if (res) {
          setProfile(res)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user.id])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  if (isLoading) {
    return <ProfileSkeleton />
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
          <Link href="/" className="p-2">
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
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center pr-8">Profil Saya</h1>
        </div>
      </motion.div>

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

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">ID Pengguna</p>
              <p className="font-medium">{user.id}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Nama</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
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
  )
}

import ProfileSkeleton from "./skeleton/Profile-skeleton"
