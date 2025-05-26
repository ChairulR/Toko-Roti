import { useEffect, useState } from "react";


export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products") // Mengambil data dari API
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="cards">
      {products.map((item) => (
        <div key={item.id} className="card">
          <img src={`/images/${item.image}`} alt={item.name} />
          <Link href={`/view/${item.id}`}>
            <p className="product-name">{item.name}</p>
          </Link>
          <p className="price">Rp{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export const banners = [
  { id: 1, image: "/public/banner.png", title: "Promo Roti Lezat" },
];