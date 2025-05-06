import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UnicornContext = createContext();

export const useUnicornContext = () => {
  return useContext(UnicornContext);
};

export const UnicornProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [power, setPower] = useState("");
  const [unicorns, setUnicorns] = useState([]);

  //CAMBIAR LA PARTE DE "608c7262bd6843468f2e61c939c93093" POR EL ENDPOINT GENERADO EN CRUDCRUD EN SU PROPIO NAVEGADOR (RECOMIENDO USAR PAGINA DE INCOGNITO PARA EVITAR ERRORES)
  const APIFetch = "https://crudcrud.com/api/608c7262bd6843468f2e61c939c93093/unicorns";

  const getUnicorns = async () => {
    try {
      const response = await axios.get(APIFetch);
      setUnicorns(response.data);
    } catch (error) {
      console.error("Error al obtener los unicornios:", error);
    }
  };

  const getUnicornById = (id) => {
    return axios
      .get(`${APIFetch}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Error al obtener el unicornio: " + error.message);
      });
  };

  const createUnicorn = async (unicorn) => {
    try {
      const response = await axios.post(APIFetch, unicorn);
      console.log("Unicornio creado:", response.data);
      getUnicorns();
    } catch (error) {
      console.error("Ocurrió un error al crear el unicornio:", error);
    }
  };

  const editUnicorn = async (id, updatedUnicorn) => {
    try {
      await axios.put(`${APIFetch}/${id}`, updatedUnicorn);
      setUnicorns((prevUnicorns) =>
        prevUnicorns.map((unicorn) => (unicorn._id === id ? { ...unicorn, ...updatedUnicorn } : unicorn))
      );
      setMessage("Unicornio actualizado con éxito");
    } catch (error) {
      setMessage(`Ocurrió un error al actualizar el unicornio: ${error.message}`);
      console.error("Error al realizar el PUT:", error);
    }
  };

  const deleteUnicorn = async (id) => {
    console.log("ID para eliminar:", id);

    if (!id) {
      setMessage("No hay un ID proporcionado para eliminar.");
      return;
    }

    try {
      await axios.delete(`${APIFetch}/${id}`);
      localStorage.removeItem("object_id");
      localStorage.removeItem("unicorn_edit");
      setUnicorns((prevUnicorns) => prevUnicorns.filter((unicorn) => unicorn._id !== id));
      setMessage(`El unicornio con ID ${id} fue eliminado exitosamente.`);
    } catch (error) {
      setMessage(`Ocurrió un error: ${error.message}`);
    }
  };

  useEffect(() => {
    getUnicorns();
  }, []);

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        setUnicorns,
        getUnicorns,
        getUnicornById,
        createUnicorn,
        editUnicorn,
        deleteUnicorn,
        message,
        setMessage,
        name,
        setName,
        color,
        setColor,
        age,
        setAge,
        power,
        setPower,
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};
