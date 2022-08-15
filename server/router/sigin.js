require('dotenv').config();

const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../module/User");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).send({ message: "Invalid username or password" });
    }

    const comparePasswords = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePasswords) {
      res.status(401).send({ message: "Passwords dont match" });
    }

    const token = user.generateAuthToken();

    res
      .status(200)
      .send({ message: "Logged in successfully", token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/', (req, res) => {
  res.send(req.user);
})

module.exports = router;
