import CheckoutPage from "@/app/components/checkout";
import Loading from "@/app/components/loading";
import { getProductById } from "@/app/lib/action";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutPage />
    </Suspense>
  );
}

export async function generateMetadata({ searchParams }) {
  const p = await searchParams
  const {id} = p
  const product = await getProductById(parseInt(id, 10));

  return {
    title: `Checkout - ${product.data.name}`,
    keywords: `checkout, ${product.data.name}, ${product.data.category}`,
    description: "Proses checkout produk.",
  };
}
