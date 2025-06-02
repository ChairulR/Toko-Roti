import CheckoutPage from "@/app/components/checkout";
import { getProductById } from "@/app/lib/action";

export default async function Page({ searchParams }) {
  const id = parseInt(searchParams.id);
  const note = searchParams.note || "";
  const quantity = parseInt(searchParams.quantity) || 1;

  return  <CheckoutPage quantity={quantity} note={note} id={id}/>
}


export async function generateMetadata({ searchParams }) {
  const id = parseInt(searchParams.id);
  const note = searchParams.note || "";
  const quantity = parseInt(searchParams.quantity) || 1;
  const product = await getProductById(id)
  if (!product.success) {
    return {
      title: "Checkout - Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `Checkout - ${product.data.name}`,
    description: `Checkout for product ID ${id} with quantity ${quantity} and note "${note}"`,
  };
}

