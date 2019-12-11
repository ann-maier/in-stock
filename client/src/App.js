import React from "react";

import { Warehouses } from "./components/warehouses";
import { Products } from "./components/products";
import { ProductsInStock } from "./components/productsInStock";

import "./App.css";

export const App = () => {
  const [selectedItem, setSelectedItem] = React.useState({});

  return (
    <div className="App">
      <Warehouses
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Products selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <ProductsInStock
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};
