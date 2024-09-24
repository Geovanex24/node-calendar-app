/**
 * Rutas de Eventos / Events
 *
 * host + /api/events
 */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT); // Caulquier petición deberá validarse su jwt

//Obtener eventos
router.get("/", getEvents);

//Crear un nuevo evento
router.post("/", createEvent);

//Actualizar un evento
router.put("/:id", updateEvent);

//Borrar un evento
router.delete("/:id", deleteEvent);

module.exports = router;
