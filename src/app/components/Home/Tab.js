'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Tab component for switching between "sweet" and "savory" flavors.
 *
 * Updates the URL query parameter `flavor` to reflect the selected tab,
 * preserving other query parameters.
 *
 * @param {Object} props
 * @param {string} props.activePage - The currently active flavor tab ("sweet" or "savory").
 * @author wignn
 * @returns {JSX.Element}
 */

function Tab({ activePage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabClick = (flavor) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('flavor', flavor); 
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="tabs">
      <button
        className={`tab ${activePage === "sweet" ? "active" : ""}`}
        onClick={() => handleTabClick("sweet")}
      >
        Sweet
      </button>
      <button
        className={`tab ${activePage === "savory" ? "active" : ""}`}
        onClick={() => handleTabClick("savory")}
      >
        Savory
      </button>
    </div>
  );
}

export default Tab;
