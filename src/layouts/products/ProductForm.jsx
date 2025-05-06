import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Ambos campos son obligatorios.");
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert("El precio debe ser un número válido y mayor que cero.");
      return;
    }

    onAdd({ name, price: parseFloat(price) });
    setName("");
    setPrice("");

    // Redirigir a la tabla de productos si se crea correctamente
    navigate("/productos");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex justify-center items-start pt-16 px-4"
    >
      <div className="w-full max-w-lg shadow-2xl bg-gray-800 rounded-lg p-6">
        <h4 className="text-center text-indigo-500 text-xl font-bold mb-6">Crear Producto</h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 mb-5 w-full border border-gray-300 rounded-lg py-2 px-3 bg-indigo-100 text-gray-800"
              placeholder="Ingrese el nombre del producto"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-white">
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 mb-5 w-full border border-gray-300 rounded-lg py-2 px-3 bg-indigo-100 text-gray-800"
              placeholder="Ingrese el precio del producto"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            type="submit"
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 rounded-lg"
          >
            Crear
          </motion.button>
        </form>

        <motion.button
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          className="mt-4 w-full border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white py-2 rounded-lg"
          onClick={() => navigate("/productos")}
        >
          Volver a la Tabla
        </motion.button>
      </div>
    </motion.div>
  );
}
