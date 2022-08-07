const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, valideteUser } = require("../module/User");

router.post("/", async (req, res) => {
  try {
    const { error } = valideteUser(req.body);

    if (error) {
      res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword });

    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
