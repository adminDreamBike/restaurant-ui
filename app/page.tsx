"use client";

import { useEffect, useState } from "react";
import { Search } from "./components/Search/Search";
import { DishList } from "./components/DishList/DishList";
import { Text, Spinner } from "@chakra-ui/react";
import { useProductsStore } from "./lib/stores/product";
import Skeleton from "react-loading-skeleton";
import { useDebounce } from "./hooks/useDebounce";
import { Product } from "./lib/stores/types";
import 'react-loading-skeleton/dist/skeleton.css'


export default function Home() {
  const { products, isLoading, error, fetchData } = useProductsStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 200 });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchProduct = (value: string) => {
    setValue(value);
    const filter = products.filter((product) => product.name.includes(value));
    setFilteredProducts(filter);
  };
  console.log("isLoading", isLoading);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center ">
      <Text fontSize="3xl">Carlos s Restaurant</Text>
      <Search
        onSearchProuct={handleSearchProduct}
        valueInput={debouncedValue}
      />      
      {isLoading ? (
        <Spinner size='lg' />
      ) : (
        <DishList products={filteredProducts || products} />
      )}
    </main>
  );
}
