import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUnicornContext } from "../../context/UnicornContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UnicornsView() {
  const { unicorns, getUnicorns, deleteUnicorn } = useUnicornContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnicorns = async () => {
      setLoading(true);
      await getUnicorns();
      setLoading(false);
    };

    fetchUnicorns();
  }, []);

  const handleDelete = (id) => {
    deleteUnicorn(id);
  };

  const exportToPDF = (unicorns) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Lista de Unicornios", 14, 20);

    autoTable(doc, {
      head: [["Nombre", "Color", "Edad", "Poder", "Estado"]],
      body: unicorns.map((u) => [u.name, u.color, u.age, u.power, u.status === "activo" ? "Activo" : "No Activo"]),
      startY: 30,
      styles: {
        font: "helvetica",
        fontSize: 12,
        textColor: "#333",
        lineColor: "#ddd",
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: "#4CAF50",
        textColor: "#fff",
        fontSize: 14,
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: "#f3f3f3",
      },
    });

    doc.save("unicorns.pdf");
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <motion.button
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          className="p-2 rounded border-gray-800 border text-gray-800 hover:bg-gray-800 hover:text-white"
          onClick={() => navigate("/unicornios/crear")}
        >
          Crear Unicornio
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          className="p-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => exportToPDF(unicorns)}
        >
          Exportar PDF
        </motion.button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5,
              ease: "linear",
            }}
            className="h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full"
          ></motion.div>
        </div>
      ) : unicorns.length === 0 ? (
        <p className="text-center text-gray-500">No hay unicornios cargados, cree uno para verlo listado aquí.</p>
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
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Edad</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Color</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Poder</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Estado</th>
              <th className="border-2 border-gray-800 bg-gray-800 text-white p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unicorns.map((unicorn) => (
              <tr key={unicorn._id} className="transition-all duration-300 hover:bg-indigo-200">
                <td className="border border-gray-800 p-2 text-center">{unicorn.name}</td>
                <td className="border border-gray-800 p-2 text-center">{unicorn.age}</td>
                <td className="border border-gray-800 p-2 text-center">{unicorn.color}</td>
                <td className="border border-gray-800 p-2 text-center">{unicorn.power}</td>
                <td
                  className={`border border-gray-800 p-2 text-center font-bold ${
                    unicorn.status === "activo" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {unicorn.status === "activo" ? "Activo" : "No Activo"}
                </td>
                <td className="border border-gray-800 p-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, cursor: "pointer" }}
                      className="border-blue-500 border text-blue-500 hover:bg-blue-600 hover:text-white text-xs px-4 py-2 rounded"
                      onClick={() => {
                        localStorage.setItem("editUnicornId", unicorn._id);
                        navigate(`/unicornios/editar/${unicorn._id}`);
                      }}
                    >
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, cursor: "pointer" }}
                      className="border-red-500 border text-red-500 hover:bg-red-600 hover:text-white text-xs px-4 py-2 rounded"
                      onClick={() => handleDelete(unicorn._id)}
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

export default UnicornsView;
