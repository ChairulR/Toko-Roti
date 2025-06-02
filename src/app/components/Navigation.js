"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const activePage = pathname.split("/").pop();

  const navItems = [
    {
      name: "Home",
      path: "/",
      emoji: "🏠",
      match: "",
    },
    {
      name: "History",
      path: "/order/history",
      emoji: "📄",
      match: "history",
    },
    {
      name: "Account",
      path: "/account",
      emoji: "👤",
      match: "account",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-md">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const isActive = activePage === item.match;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center text-xs transition-all duration-200 ${
                isActive ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              <span role="img" aria-label={item.name} className="text-xl">
                {item.emoji}
              </span>
              <span className="mt-1">{item.name}</span>
              {isActive && (
                <div className="w-5 h-1 bg-black rounded-full mt-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}