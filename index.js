// # Configuración básica de express
const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// 1. Crear el servidor o apliación de express
const app = express();

//Conexión a Base de Datos
dbConnection();

// CORS
app.use(cors());

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
app.use("/api/events", require("./routes/events"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html")); // __dirname apunta hacia donde corre la app en dicho momento
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
