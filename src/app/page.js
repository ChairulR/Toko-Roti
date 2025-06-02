import Home from "./components/Home";
import { getProductByQuery } from "@/app/lib/action";

export default async function Page({ searchParams }) {
  const flavor = searchParams?.flavor || "sweet";
  const query = searchParams?.query || "";

  const response = await getProductByQuery(query, flavor);
  const products = response.data;

  return <Home products={products} activeTab={flavor} query={query} />;
}
