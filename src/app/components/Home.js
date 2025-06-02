"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "@/app/components/Home/Search";
import Tab from "@/app/components/Home/Tab";
import Banner from "@/app/components/Home/Banner";
import Card from "@/app/components/Home/Card";

export default function Home({ products, activeTab }) {
  const [selectedProduct, setSelectedProduct] = useState();

  return (
    <div className="container-home">
      {/* Bagian Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="welcome-section"
      >
        <h1 className="welcome-title">Selamat Datang di</h1>
        <h2 className="brand-name">Toko Roti <span>Mayra D'Light 🤍</span></h2>
        <p className="welcome-subtitle">Nikmati kelezatan roti terbaik dengan bahan berkualitas!</p>
      </motion.div>

      {/* Search Bar */}
      <Search />

      {/* Banner */}
      <Banner />

      {/* Tabs */}
      <Tab activePage={activeTab} />

      {/* Content */}
      <Card activePage={activeTab} filteredProducts={products} />
    </div>
  );
}