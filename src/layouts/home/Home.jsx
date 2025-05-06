import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white shadow-lg rounded-lg p-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 text-center mb-6"
        >
          Bienvenido
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 leading-relaxed mb-6"
        >
          Esta página es un proyecto diseñado para gestionar productos y unicornios de manera eficiente y moderna.
          Utilizo <span className="font-semibold text-indigo-500">React</span> junto con{" "}
          <span className="font-semibold text-indigo-500">Tailwind CSS</span>y{" "}
          <span className="font-semibold text-indigo-500">Framer Motion</span> para ofrecer una experiencia visual
          atractiva y animaciones fluidas.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Apartado de Productos</h2>
            <p className="text-gray-700">
              En la sección de productos, puedes gestionar una lista de productos, agregar nuevos, eliminarlos y ver su
              información. Los datos se almacenan en el{" "}
              <span className="font-semibold text-indigo-500">localStorage</span>, lo que permite que los cambios sean
              persistentes incluso al recargar la página.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Apartado de Unicornios</h2>
            <p className="text-gray-700">
              La sección de unicornios utiliza un <span className="font-semibold text-indigo-500">contexto global</span>{" "}
              para manejar el estado de los datos. Aquí puedes crear, editar y eliminar unicornios, además de exportar
              la lista en formato PDF con un diseño moderno y profesional.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Exportación de PDF</h2>
            <p className="text-gray-700">
              Una funcionalidad destacada es la posibilidad de exportar la lista de unicornios a un archivo PDF. Esto se
              logra utilizando la biblioteca <span className="font-semibold text-indigo-500">jsPDF</span>, que permite
              generar documentos con un diseño atractivo y organizado.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Separación de Contextos</h2>
            <p className="text-gray-700">
              Para mantener el código limpio y modular, los productos y unicornios se gestionan en contextos separados.
              Esto facilita la escalabilidad y el mantenimiento del proyecto, asegurando que cada apartado funcione de
              manera independiente.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
