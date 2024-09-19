// # Configuración básica de express
const express = require("express");

// 1. Crear el servidor o apliación de express
const app = express();

// Directorio público

// app.use => Es un middleware, una función que se ejecuta cada vez que alguien realiza una petición a mi servidor.
// Actúa antes de que se realice cualquier otra acción, permitiendo realizar tareas como procesamiento de datos, validaciones o
// modificaciones a la solicitud o respuesta.
app.use(express.static("public")); // Este es el necesario para establecer un directorio público

// Lectura y parseo del body
app.use(express.json()); // Este es el necesario para leer el body de las peticiones

//Rutas
/**
 * Cada ruta debe definir una respuesta específica según el tipo de solicitud (GET, POST, etc.)
 * y el contenido recibido del cliente.
 */

// ** Auth **
app.use("/api/auth", require("./routes/auth")); // El contenido exportado de este archivo auth, será habilitado en la ruta /api/auth
//TODO: CRUD: Eventos // crear, leer, actualizar, eliminar

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
