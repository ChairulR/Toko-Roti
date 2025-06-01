"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "@/app/components/Home/Search";
import Tab from "@/app/components/Home/Tab";
import Banner from "@/app/components/Home/Banner";
import ProductDetailPopup from "@/app/components/ProductDetailPopup";
import Card from "@/app/components/Home/Card";


export default function Home({ products, activeTab }) {
  const [selectedProduct, setSelectedProduct] = useState();

  return (
    <div className="container-home">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="Selamatdtg">
          Selamat Datang di Toko Roti Mayra D'Light!
        </div>
      </motion.div>

      {/* Search Bar */}
      <Search />

      {/* Banner */}
      <Banner />

      {/* Tabs */}
      <Tab activePage={activeTab} />

      {/* Content */}
      <Card activePage={activeTab} filteredProducts={products} />

      {selectedProduct && (
        <ProductDetailPopup
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
