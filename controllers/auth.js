const User = require("../models/User");

const createUser = async (req, res) => {
  // const { name, email, password } = req.body;

  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: true,
      msg: "register",
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
