const { default: mongoose } = require("mongoose");
const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el evento. Hable con el administrador",
    });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  // Validar que el ID tenga un formato válido de MongoDB
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({
      ok: false,
      msg: "El ID no es válido",
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado ningún evento con ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permiso para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error); // Para fines del curso usamos logs. Pero lo ideal sería grabar los errores en un archivo texto...
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el evento. Hable con el administrador",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  // Validar que el ID tenga un formato válido de MongoDB
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({
      ok: false,
      msg: "El ID no es válido",
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado ningún evento con ese id",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permiso para eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el evento. Hable con el administrador",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
