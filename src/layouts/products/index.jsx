import { Route, Routes } from "react-router-dom";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";
import { useState, useEffect } from "react";

export default function ProductsRoutes() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Actualizar el estado
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Actualizar localStorage
  };

  return (
    <Routes>
      <Route path="/" element={<ProductsView products={products} deleteProduct={deleteProduct} />} />
      <Route path="/crear" element={<ProductForm onAdd={addProduct} />} />
    </Routes>
  );
}
