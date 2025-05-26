import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  console.log("ID yang diterima API:", id); // Debugging
  console.log("Tipe ID:", typeof id); // Cek tipe data ID

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }, // Pastikan ID dikonversi ke angka
    });

    console.log("Produk yang ditemukan:", product); // Debugging

    if (!product) {
      return new Response(JSON.stringify({ error: "Produk tidak ditemukan" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error Prisma:", error); // Cek kesalahan di Prisma
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}