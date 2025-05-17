'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * this is a search bar component that allows users to search for products
 * @description: it uses the useSearchParams hook to get the current search params and update them when the user submits the form
 * @author: wign
 */
  

function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();


  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set('query', query.trim());
    } else {
      params.delete('query');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Mau order apa hari ini?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-icon">🔍</button>
    </form>
  );
}

export default Search;
