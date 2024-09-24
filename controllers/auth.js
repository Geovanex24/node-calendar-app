const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "¡Ya existe un usuario con ese correo!",
      });
    }

    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuario. ¡Por favor, hable con el administrador!",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "¡No existe un usuario con ese correo!",
      });
    }

    // Confirmar passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        message: "¡La contraseña es incorrecta!",
      });
    }

    // Generar nuestro JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al iniciar sesión. ¡Por favor, hable con el administrador!",
    });
  }
};

const revalidateToken = async (req, res) => {
  const { uid, name } = req;

  // Generar un nuevo JWT y retornarlo en está petición
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
