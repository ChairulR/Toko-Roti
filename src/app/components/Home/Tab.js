'use client';
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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
      <motion.button
        className={`tab ${activePage === "sweet" ? "active" : ""}`}
        onClick={() => handleTabClick("sweet")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Sweet
      </motion.button>

      <motion.button
        className={`tab ${activePage === "savory" ? "active" : ""}`}
        onClick={() => handleTabClick("savory")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Savory
      </motion.button>
    </div>
  );
}

export default Tab;