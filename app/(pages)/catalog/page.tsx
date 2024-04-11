import React from "react";
import CatalogPage from "@/components/CatalogPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookify Katalog",
  description: "Vyhledejte své oblíbené recepty a začněte vařit už dnes",
};

const Catalog = () => {
  return (
    <>
      <CatalogPage />
    </>
  );
};

export default Catalog;
