// # Configuración básica de express
const express = require("express");

// 1. Crear el servidor o apliación de express
const app = express();

// Directorio público

/**
 * app.use => es un middleware, lo que corresponde a una simple función que se ejecuta en el momento en que alguién
 * hace una petición a mi servidor
 */
app.use(express.static("public")); // Este es el necesario para establecer un directorio público

//Rutas
/**
 * Cada ruta debe definir una respuesta específica según el tipo de solicitud (GET, POST, etc.)
 * y el contenido recibido del cliente.
 */

// Crear una ruta inicial
// app.get("/", (req, res) => {
//   res.json({ ok: true });
// });

// Escuchar peticiones
app.listen(4000, () => {
  console.log(`Servidor corriendo en el puerto ${4000}`);
});
