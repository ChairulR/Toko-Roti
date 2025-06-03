import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import next/image
import { formatterCurrency } from "@/app/lib/utils";

function Card({ activePage, filteredProducts }) {
  return (
    <div>
      {activePage === "history" ? (
        <div>
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
        </div>
      ) : (
        <div className="cards">
          {filteredProducts.map((item) => (
            <Link key={item.id} href={`/view/${item.id}`}>
              <div className="card">
                <Image
                  src={`/images/${item.image}`}
                  alt={item.name}
                  width={200} 
                  height={200}
                  priority={item.id === 1} 
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
                />
                <p className="product-name">{item.name}</p>
                <p className="price">{formatterCurrency.format(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;