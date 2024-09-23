const User = require("../models/User");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        ok: false,
        message: "¡Ya existe un usuario con ese correo!",
      });
    }

    user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuario. ¡Por favor, hable con el administrador!",
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "login",
    user: {
      email,
      password,
    },
  });
};

const revalidateToken = (req, res) => {
  res.json({
    ok: true,
    msg: "revalidate token",
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
