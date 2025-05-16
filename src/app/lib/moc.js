export const banners = [
    { img: "banner.png" },
    { img: "", title: "Buy 2 Get 1", subtitle: "Sweet Only" },
  ];

export const products = [
    { name: "Roti Sisir Mentega Cokelat", price: "Rp. 5.000", img: "image1-rotisisir.jpg", flavor: "sweet" },
    { name: "Roti Sisir Mentega Keju", price: "Rp. 8.000", img: "mentegakeju.jpg", flavor: "sweet" },
    { name: "Roti Bluder Coklat", price: "Rp. 7.000", img: "mentegakeju.jpg", flavor: "sweet" },
    { name: "Roti Bluder Keju", price: "Rp. 7.000", img: "mentegakeju.jpg", flavor: "sweet" },
    { name: "Roti Medan", price: "Rp. 7.000", img: "mentegakeju.jpg", flavor: "sweet" },
    { name: "Roti Sosis Mayo", price: "Rp. 6.000", img: "mentegakeju.jpg", flavor: "savory" },
    { name: "Roti Abon Pedas", price: "Rp. 7.500", img: "mentegakeju.jpg", flavor: "savory" },
];

// Keep the original arrays if you still need them separately
export const sweetProducts = products.filter(product => product.flavor === "sweet");
export const savoryProducts = products.filter(product => product.flavor === "savory");