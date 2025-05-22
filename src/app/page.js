"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {useSearchParams } from "next/navigation";
import {products as allProducts } from "./lib/moc";
import Search from "./components/Home/Search";
import Tab from "./components/Home/Tab";
import Banner from "./components/Home/Banner";
import { getProductByQuery } from "./lib/action";

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

const Page = () => {
  const searchParams = useSearchParams();
  const activePage = searchParams.get("flavor") || "sweet";
  const [product, setProduct] = useState([]);


  useEffect(() => {
    const filtered = allProducts.filter((item) => item.flavor === activePage);
    
    setProduct(filtered);
  }, [activePage]);

  const orderHistory = [
    { name: "Roti Sosis Mayo", date: "25 Apr 2025", status: "Selesai" },
    { name: "Roti Bluder Keju", date: "23 Apr 2025", status: "Selesai" },
  ];

  return (
    <div className="container-home">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Selamat Datang di Toko Roti!</h1>
      </motion.div>

      {/* Search Bar */}
      <Search />

      {/* Banner */}
      <Banner/>

      {/* Tabs */}
      <Tab activePage={activePage} />

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
