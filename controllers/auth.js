const createUser = (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "register",
    user: {
      name,
      email,
      password,
    },
  });
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
