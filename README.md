#  Unicornios - Axios + PDF

Este proyecto es una pequeña app que utiliza Axios para conectarse a una API y generar PDF. Sigue los pasos abajo para correrla en tu máquina.

##  Pasos para correr el proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/MarcosAyrton/Unicornios-axios-PDF.git
```

2. **Entrar a la carpeta del proyecto**

```bash
cd Unicornios-axios-PDF
```

3. **Instalar las dependencias**

```bash
npm install
```

4. **Cambiar el endpoint de la API**

Abre el archivo:

```
src/context/UnicornContext.jsx
```

Busca la línea **19** y reemplaza el endpoint viejo por uno nuevo que obtendrás en la página [https://crudcrud.com/](https://crudcrud.com/).

```js
// CAMBIAR LA PARTE DE "608c7262bd6843468f2e61c939c93093" POR EL ENDPOINT GENERADO EN CRUDCRUD EN SU PROPIO NAVEGADOR (RECOMIENDO USAR PÁGINA DE INCOGNITO PARA EVITAR ERRORES)
const APIFetch = "https://crudcrud.com/api/TU_NUEVO_ENDPOINT/unicorns";
```

>  *Recomendación:* abre [https://crudcrud.com/](https://crudcrud.com/) en modo incógnito para generar tu endpoint único sin errores.

5. **Correr el proyecto**

Desde la raíz del proyecto, ejecuta:

```bash
npm run dev
```

¡Y listo! Ya deberías ver funcionando la app de unicornios.

---

 Si algo no te funciona, asegúrate de que tu endpoint esté correctamente copiado y que no haya expirado (duran 24 horas).
