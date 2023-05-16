const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Create a new user with encrypted password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });

    // Save the new user
    const user = await newUser.save();

    // Send a successful response
    res.status(201).json(user);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If user does not exist, send an error response
    !user && res.status(401).json("Wrong password or username!");

    // Decrypt the stored password and compare with the provided password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // If passwords don't match, send an error response
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    // Generate an access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    // Remove the password from the user object
    const { password, ...info } = user._doc;

    // Send a successful response with user information and access token
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

module.exports = router;
