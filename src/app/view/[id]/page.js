"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Page() {
  const { id } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [reviews, setReviews] = useState([
    { id: 1, user: "Inka", rating: 5, comment: "Roti ini lembut dan enak banget, suka deh" },
    { id: 2, user: "Syafira", rating: 4, comment: "Rasa manisnya pas, cocok untuk sarapan!" },
    { id: 3, user: "Muti", rating: 3, comment: "Lumayan, tapi menurutku terlalu manis." },
    { id: 4, user: "Aldi", rating: 4, comment: "Enak buanget, boleh minta banyakin coklatnya ngga?" },
    { id: 5, user: "Irul", rating: 1, comment: "Punya aku gosong mah" },
    { id: 6, user: "Aldi", rating: 5, comment: "Alhamdulillah coklatnya dibanyakin" }
  ]);
  const averageRating = reviews.length > 0 
  ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
  : "Belum ada rating";

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error("Error fetching product data:", error));
    }
  }, [id]);

  if (!product) {
    return <h1></h1>;
  }

  return (
    <div className="product-container">
      <div className="product-image">
        <Image src={`/images/${product.image}`} alt={product.name} width={400} height={400} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">Rp{product.price}</p>
        <p className="description">{product.description}</p>
        <button className="buy-button" onClick={() => setShowCheckout(true)}>Beli Sekarang</button>
      </div>
      <div className="product-reviews">
        <p className="overall-rating">Rating: <span>{"⭐".repeat(Math.round(averageRating))} ({averageRating})</span></p>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p className="user"><strong>{review.user}</strong></p>
            <p className="rating">{"⭐".repeat(review.rating)}</p>
            <p className="comment">{review.comment}</p>
          </div>
        ))}
        {showCheckout && (
        <div className="checkout-popup">
        <div className="checkout-content">
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-product">Produk: <span>{product.name}</span></p>
            <p className="checkout-price">Harga: <span>Rp{product.price}</span></p>

        {/* Kontrol jumlah item */}
            <div className="quantity-controls">
                <div className="quantity-controlsmin">
                    <button onClick={() => setQuantity(prev => Math.max(prev - 1, 1))} className="qty-button">-</button>
                </div>
                <input 
                    type="number" 
                    className="qty-input"
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                />
                <div className="quantity-controlsplus">
                    <button onClick={() => setQuantity(prev => prev + 1)} className="qty-button">+</button>
                </div>
            </div>

        <p className="checkout-total"><strong>Total: <span>Rp{product.price * quantity}</span></strong></p>

        <button onClick={() => router.push("/checkout")} className="confirm-button">
           Konfirmasi Pembayaran
        </button>
        <button className="close-button" onClick={() => setShowCheckout(false)}>Tutup</button>
        </div>
        </div>
        )}
      </div>
    </div>
  );
}