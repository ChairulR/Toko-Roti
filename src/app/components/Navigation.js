"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navigation() {
  const pathname = usePathname();
  const activePage = pathname.split("/").pop();
  console.log(activePage);

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

      <button
        className={`nav-item ${activePage === "history" ? "active" : ""}`}
      >
        <span role="img" aria-label="history">
          📄
        </span>
        <small>History</small>
      </button>

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
