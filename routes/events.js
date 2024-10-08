/**
 * Rutas de Eventos / Events
 *
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validate-fields");
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
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  createEvent
);

//Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  updateEvent
);

//Borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
