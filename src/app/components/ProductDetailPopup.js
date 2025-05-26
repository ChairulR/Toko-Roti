"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const ProductDetailPopup = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      axios.get(`/api/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error("Error fetching product data:", error));
    }
  }, [productId]);

  if (!product) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <Image src={product.image} alt={product.name} width={200} height={200} />
        <h2>{product.name}</h2>
        <p className="price">Rp{product.price}</p>
        <p className="rating">⭐ {product.rating} ({product.reviews} ulasan)</p>
        <p className="description">{product.description}</p>
        <button className="order-btn">Tambah Pesanan</button>
      </div>
    </div>
  );
};

export default ProductDetailPopup;