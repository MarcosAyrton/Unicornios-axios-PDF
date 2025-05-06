import { useEffect, useState } from "react";
import { initialProducts } from "./productsData";
import ProductForm from "./ProductForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductsView({ products, deleteProduct }) {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <motion.button
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          className="p-2 rounded border-gray-800 border text-gray-800 hover:bg-gray-800 hover:text-white"
          onClick={() => navigate("/productos/crear")}
        >
          Crear Producto
        </motion.button>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos cargados, cargue uno para verlo listado aquí.</p>
      ) : (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="table-auto w-full border-collapse shadow-xl border-gray-800"
        >
          <thead>
            <tr>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Nombre</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Precio</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="transition-all duration-300 hover:bg-indigo-200">
                <td className="border border-gray-800 p-2 text-center">{product.name}</td>
                <td className="border border-gray-800 p-2 text-center">${product.price.toFixed(2)}</td>
                <td className="border border-gray-800 p-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, cursor: "pointer" }}
                      className="border-red-500 border text-red-500 hover:bg-red-600 hover:text-white text-xs px-4 py-2 rounded"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Eliminar
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}
