import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  console.log("ID produk diterima di API:", id); // Debugging

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error dalam API:", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data produk" });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}