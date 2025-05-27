"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {useSearchParams } from "next/navigation";
import Search from "./components/Home/Search";
import Tab from "./components/Home/Tab";
import Banner from "./components/Home/Banner";
import ProductDetailPopup from "./components/ProductDetailPopup";
import { getProductByQuery } from "@/app/lib/action";
import Link from "next/link";


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
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const activePage = searchParams.get("flavor") || "sweet";
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const activeTab = searchParams.get("flavor") || "sweet";
  

  useEffect(() => {
    axios.get("/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));

    axios.get("/api/banners")
      .then(response => setBanners(response.data))
      .catch(error => console.error("Error fetching banners:", error));
  }, []);

  const filteredProducts = products.filter((item) => item.flavor === activeTab);
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
          <img key={banner.id} src={`/images/${banner.image}`} alt={banner.title} />
        ))}
      </div>

      {/* Tabs */}
      <Tab activePage={activeTab} />

      {/* Content */}
      {activePage === "history" ? (
        <>
          <h2>Riwayat Pesanan</h2>
          <div className="history-list">
            {orderHistory.map((item, index) => (
              <div key={index} className="history-item">
                <p className="product-name">{item.name}</p>
                <p className="date">{item.date}</p>
                <p className="status">{item.status}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
          <div className="cards">
            {filteredProducts.map((item) => (
              <Link key={item.id} href={`/view/${item.id}`}>
                <div key={item.id} className="card">
                  <img src={`/images/${item.image}`} alt={item.name} />
                  <Link href={`/view/${item.id}`}>
                    <p className="product-name">{item.name}</p>
                  </Link>
                    <p className="price">Rp{item.price}</p>
                </div>
              </Link>
              ))}
          </div>
      )}
      {selectedProduct && (
        <ProductDetailPopup 
        productId={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
