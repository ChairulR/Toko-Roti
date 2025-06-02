import Home from "./components/Home";
import { getProductByQuery } from "@/app/lib/action";

export default async function Page({ searchParams }) {
  const f = await searchParams
  const {flavor} = f || { flavor: "sweet" };
  const { query } = f; 

  const response = await getProductByQuery(query, flavor);
  const products = response.data;

  return <Home products={products} activeTab={flavor} query={query} />;
}
