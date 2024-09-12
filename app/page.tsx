"use client";

import { Search } from "./components/Search/Search";
import { DishList } from "./components/DishList/DishList";
import { Text } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <Text fontSize="3xl">Carlos s Restaurant</Text>
        <Search />
        <DishList />
      </main>
    </Suspense>
  );
}
