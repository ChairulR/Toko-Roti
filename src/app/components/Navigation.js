"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const activePage = pathname.split("/").pop();
  
/**
 * Navigation component renders a bottom navigation bar with links to
 * Home, History, and Account pages. 
 * 
 * Highlights the active page button based on the current URL path.
 * 
 * this component uses Next.js's usePathname hook to determine the current page.
 * this component will be import to the layout.js file
 * @component
 * @returns {JSX.Element} Bottom navigation bar
 * @author wignn
 */

  return (
    <div className="bottom-nav">
      <Link href="/">
        <button className={`nav-item ${activePage === "" ? "active" : ""}`}>
          <span role="img" aria-label="home">
            🏠
          </span>
          <small>Home</small>
        </button>
      </Link>

    <Link href="/order/history">
      <button
        className={`nav-item ${activePage === "history" ? "active" : ""}`}
      >
        <span role="img" aria-label="history">
          📄
        </span>
        <small>History</small>
      </button>
    </Link>

      <Link href="/account">
        <button
          className={`nav-item ${activePage === "account" ? "active" : ""}`}
        >
          <span role="img" aria-label="account">
            👤
          </span>
          <small>Account</small>
        </button>
      </Link>
    </div>
  );
}

export default Navigation;
