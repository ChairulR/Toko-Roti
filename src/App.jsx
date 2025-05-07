import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";

<motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
    <h1>Selamat Datang di Toko Roti!</h1>
</motion.div>;

const App = () => {
  const [activeTab, setActiveTab] = useState("sweet");
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      img: "banner.png",
      //title: "Discount 10%",
      //subtitle: "Savory Edition",
    },
    {
      img: "",
      title: "Buy 2 Get 1",
      subtitle: "Sweet Only",
    },
  ];

  const sweetProducts = [
    {
      name: "Roti Sisir Mentega Cokelat",
      price: "Rp. 5.000",
      img: "image1-rotisisir.jpg",
    },
    {
      name: "Roti Sisir Mentega Keju",
      price: "Rp. 8.000",
      img: "mentegakeju.jpg",
    },
    {
      name: "Roti Bluder Coklat",
      price: "Rp. 7.000",
      img: "",
    },
    {
      name: "Roti Bluder Keju",
      price: "Rp. 7.000",
      img: "",
    },
  ];

  const savoryProducts = [
    {
      name: "Roti Sosis Mayo",
      price: "Rp. 6.000",
      img: "",
    },
    {
      name: "Roti Abon Pedas",
      price: "Rp. 7.500",
      img: "",
    },
  ];

  const products = activeTab === "sweet" ? sweetProducts : savoryProducts;

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Mau order apa hari ini?" />
        <button className="search-icon">🔍</button>
      </div>

      {/* Banner Slider */}
      <div className="banner" onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}>
        <img src={banners[currentBanner].img} alt="Promo" />
        <div className="banner-text">
          <p className="offer"></p>
          <h2>{banners[currentBanner].title}</h2>
          <p className="edition">{banners[currentBanner].subtitle}</p>
          <p className="note"></p>
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
          className={`tab ${activeTab === "sweet" ? "active" : ""}`}
          onClick={() => setActiveTab("sweet")}
        >
          Sweet
        </button>
        <button
          className={`tab ${activeTab === "savory" ? "active" : ""}`}
          onClick={() => setActiveTab("savory")}
        >
          Savory
        </button>
      </div>

      {/* Product Cards */}
      <div className="cards">
        {products.map((item, i) => (
          <div key={i} className="card">
            <img src={item.img} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-item active">
          <span role="img" aria-label="home">🏠</span>
          <small>Home</small>
        </button>
        <button className="nav-item">
          <span role="img" aria-label="history">📄</span>
          <small>History</small>
        </button>
        <button className="nav-item">
          <span role="img" aria-label="account">👤</span>
          <small>Account</small>
        </button>
      </div>
    </div>
  );
};

export default App;
