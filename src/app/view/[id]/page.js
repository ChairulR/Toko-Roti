"use client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProductById } from "@/app/lib/action";
import Loading from "@/app/components/loading";

export default function Page() {
  const { id } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const r = await getProductById(id);
      if (!r.success) {
        notFound();
      } else {
        setProduct(r.data);
        setReviews(r.data.comments || []);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return <Loading message="Loading product..."/>
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rate, 0) /
    (reviews.length || 1);

  return (
    <div className="product-container">
      <div className="product-image">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          width={400}
          height={400}
        />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">Rp{product.price}</p>
        <p className="description">{product.description}</p>
        <button className="buy-button" onClick={() => setShowCheckout(true)}>
          Beli Sekarang
        </button>
      </div>
      <div className="product-reviews">
        <p className="overall-rating">
          Rating:{" "}
          <span>
            {"⭐".repeat(Math.round(averageRating))} ({averageRating})  
          </span>
        </p>
        {reviews.map((review) => (
          console.log(review),
          <div key={review.id} className="review-card">
            <p className="user">
              <strong>{review.name}</strong>
            </p>
            <p className="rating">{"⭐".repeat(review.rate)}</p>
            <p className="comment">{review.comment}</p>
          </div>
        ))}
        {showCheckout && (
          <div className="checkout-popup">
            <div className="checkout-content">
              <h2 className="checkout-title">Checkout</h2>
              <p className="checkout-product">
                Produk: <span>{product.name}</span>
              </p>
              <p className="checkout-price">
                Harga: <span>Rp{product.price}</span>
              </p>

              {/* Kontrol jumlah item */}
              <div className="quantity-controls">
                <div className="quantity-controlsmin">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="qty-button"
                  >
                    -
                  </button>
                </div>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <div className="quantity-controlsplus">
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="qty-button"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="checkout-total">
                <strong>
                  Total: <span>Rp{product.price * quantity}</span>
                </strong>
              </p>

              <button
                onClick={() => router.push("/checkout")}
                className="confirm-button"
              >
                Konfirmasi Pembayaran
              </button>
              <button
                className="close-button"
                onClick={() => setShowCheckout(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
