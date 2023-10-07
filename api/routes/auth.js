const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      //   profilePic: req.body.profilePic,
    });
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      saveUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Incorrect username");
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Incorrect password");

    const { password, ...others } = user._doc;
    res.status(200).json({
      success: true,
      ...others,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
