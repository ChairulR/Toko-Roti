"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { banners, products as allProducts } from "./lib/moc";

const Page = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const activePage = searchParams.get("flavor") || "sweet";
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const filtered = allProducts.filter((item) => item.flavor === activePage);
    setProduct(filtered);
  }, [activePage]);

  const handleTabClick = (flavor) => {
    router.push(`/?flavor=${flavor}`);
  };

  const orderHistory = [
    { name: "Roti Sosis Mayo", date: "25 Apr 2025", status: "Selesai" },
    { name: "Roti Bluder Keju", date: "23 Apr 2025", status: "Selesai" },
  ];

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Selamat Datang di Toko Roti!</h1>
      </motion.div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Mau order apa hari ini?" />
        <button className="search-icon">🔍</button>
      </div>

      {/* Banner */}
      <div className="banner" onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}>
        <img src={banners[currentBanner].img} alt="Promo" />
        <div className="banner-text">
          <h2>{banners[currentBanner].title}</h2>
          <p className="edition">{banners[currentBanner].subtitle}</p>
        </div>
        <div className="dots">
          {banners.map((_, i) => (
            <span key={i} className={i === currentBanner ? "dot active" : "dot"} />
          ))}
        </div>
      </div>

      {/* Tabs */}
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
          {product.map((item, i) => (
            <div key={i} className="card">
              <img src={item.img} alt={item.name} />
              <Link href="/view">
                <p className="product-name">{item.name}</p>
              </Link>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
