import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useUnicornContext } from "../../context/UnicornContext";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  age: Yup.number().required("La edad es obligatoria").positive().integer(),
  color: Yup.string().required("El color es obligatorio"),
  power: Yup.string().required("El poder es obligatorio"),
  status: Yup.string().required("El estado es obligatorio"),
});

function UnicornForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createUnicorn, editUnicorn, getUnicornById, deleteUnicorn, message } = useUnicornContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      color: "",
      power: "",
      status: "activo", // Valor predeterminado
    },
    validationSchema,
    onSubmit: async (values) => {
      const unicornData = { ...values, age: parseInt(values.age, 10) };

      if (id) {
        try {
          // Asegurarse de que el método editUnicorn se ejecute correctamente
          await editUnicorn(id, unicornData);
          console.log("PUT realizado con éxito:", unicornData); // Log para verificar el JSON enviado
        } catch (error) {
          console.error("Error al realizar el PUT:", error);
        }
      } else {
        try {
          await createUnicorn(unicornData);
          console.log("POST realizado con éxito:", unicornData); // Log para verificar el JSON enviado
        } catch (error) {
          console.error("Error al realizar el POST:", error);
        }
      }

      navigate("/unicornios");
    },
    enableReinitialize: true, // Permitir que los valores iniciales se actualicen
  });

  useEffect(() => {
    const unicornId = id || localStorage.getItem("editUnicornId"); // Obtener el ID desde localStorage si no está en los parámetros
    if (unicornId) {
      getUnicornById(unicornId)
        .then((data) => {
          formik.setValues({
            name: data.name || "",
            age: data.age?.toString() || "",
            color: data.color || "",
            power: data.power || "",
            status: data.status || "activo",
          });
        })
        .catch((error) => {
          console.error("Error al obtener unicornio:", error);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este unicornio?")) {
      await deleteUnicorn(id);
      navigate("/unicornios");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex justify-center items-start pt-16 px-4"
    >
      <div className="w-full max-w-lg shadow-2xl bg-gray-800 rounded-lg p-6">
        <h4 className="text-center text-indigo-500 text-xl font-bold mb-6">
          {id ? "Editar Unicornio" : "Crear Unicornio"}
        </h4>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "age", "color", "power"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-white capitalize">
                {field}
              </label>
              <input
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 mb-5 w-full border border-gray-300 rounded-lg py-2 px-3 bg-indigo-100 text-gray-800"
                placeholder={`Ingrese ${field}`}
              />
              {formik.touched[field] && formik.errors[field] && (
                <small className="text-red-500">{formik.errors[field]}</small>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white">
              Estado
            </label>
            <motion.select
              whileHover={{ cursor: "pointer" }}
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 mb-5 w-full border border-gray-300 rounded-lg py-2 px-3 bg-indigo-100 text-gray-800"
            >
              <option value="activo">Activo</option>
              <option value="no_activo">No Activo</option>
            </motion.select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            type="submit"
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500  hover:text-white py-2 rounded-lg"
          >
            {id ? "Actualizar" : "Crear"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default UnicornForm;
