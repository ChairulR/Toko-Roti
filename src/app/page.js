import Home from "./components/Home";

export default function Page({ searchParams }) {
  const flavor =  searchParams?.flavor ?? "sweet";
  const query =  searchParams?.query ?? "";

  return <Home flavor={flavor} query={query} />;
}
