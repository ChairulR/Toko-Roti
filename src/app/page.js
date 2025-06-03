import Home from "./components/Home";
import { getProductByQuery } from "@/app/lib/action";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const { flavor = "sweet", query = "" } = params;
  const response = await getProductByQuery(query, flavor);
  const products = response.data;

  return <Home products={products} activeTab={flavor} query={query} />;
}
