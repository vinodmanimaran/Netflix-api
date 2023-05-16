const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      // Find and update the user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      // Handle any errors and send an error response
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      // Find and delete the user
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      // Handle any errors and send an error response
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

// GET
router.get("/find/:id", async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      // Get all users if the requester is an admin
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      // Handle any errors and send an error response
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

// GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.getFullYear() - 1);

  try {
    // Aggregate user statistics by month
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

module.exports = router;
