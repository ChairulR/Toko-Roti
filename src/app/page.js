"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Search from "./components/Home/Search";
import Tab from "./components/Home/Tab";
import Banner from "./components/Home/Banner";
import ProductDetailPopup from "./components/ProductDetailPopup";
import { getProductByQuery } from "@/app/lib/action";
import Link from "next/link";
import Card from "./components/Home/Card";

/**
 * Main page component of the bakery store.
 *
 * This page displays a welcome message, search bar, promotional banner,
 * product tabs (sweet, savory, etc.), and dynamically filtered product cards
 * based on the selected flavor from the query parameter.
 *
 * If the "history" tab is selected, it displays a list of past orders instead.
 *
 * Components like Search, Tab, and Banner are modularized in the components/Home folder.
 *
 * @component
 * @returns {JSX.Element} Rendered homepage content
 * @author wign
 */

export default function Page() {
  const searchParams = useSearchParams();
  const [banners, setBanners] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const activeTab = searchParams.get("flavor") || "sweet";
  

  const fetchProduct = async () => {
    try {
      const query = searchParams.get("flavor");
      const response = await getProductByQuery(query, activeTab);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchParams, activeTab]);

  
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
      <div className="banner">
        {banners.map((banner) => (
          <img
            key={banner.id}
            src={`/images/${banner.image}`}
            alt={banner.title}
          />
        ))}
      </div>

      {/* Tabs */}
      <Tab activePage={activeTab} />

      {/* Content */}
      <Card activePage={activeTab} filteredProducts={product} />
      {selectedProduct && (
        <ProductDetailPopup
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
