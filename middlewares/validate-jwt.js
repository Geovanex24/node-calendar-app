const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  //x-token headers
  // El token debe ser enviado en el header como 'x-token'.
  // Si no se envía de esta manera (No lo voy a permitir, no se hace nada), no podremos validarlo correctamente.
  // Esto asegura que el token se transmita de forma estándar y segura.

  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  // Verificar el token
  try {
    //payload
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    // La request se pasa como referencia a las funciones que siguen tras llamar a 'next'.
    // Es decir, una vez que este middleware finaliza, el siguiente middleware o controlador
    // recibirá la misma request para continuar con el procesamiento.

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = { validateJWT };
