import React from "react";
import Link from "next/link";

function Card({activePage, filteredProducts}) {
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
              <div key={item.id} className="card">
                <img src={`/images/${item.image}`} alt={item.name} />
                  <p className="product-name">{item.name}</p>
                <p className="price">Rp{item.price.toLocaleString("id-ID")}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
