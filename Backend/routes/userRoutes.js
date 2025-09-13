// const express = require("express");
// const Router = express.Router();
// const User = require("../models/user");
// const { generateToken, jwtAuthMiddleware } = require("../jwt");
// const { findOne } = require("../models/candidate");
// Router.post("/signup", async (req, res) => {
//   try {
//     const data = req.body;

//     if (data.role === "admin") {
//       const ExitingAdmin = await User.findOne({ role: "admin" });
//       if (ExitingAdmin) {
//         return res
//           .status(500)
//           .json({ error: "Admin already exists. Only one admin is allowed" });
//       }
//     }
//     const newUser = new User(data);
//     const response = await newUser.save();
//     console.log("Data saved");

//     const payload = {
//       id: response.id,
//     };
//     const token = generateToken(payload);
//     res.status(200).json({ response: response, token: token });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //login route
// Router.post("/login", async (req, res) => {
//   try {
//     const { aadharCardNumber, password } = req.body;
//     const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const payload = {
//       id: user.id,
//     };
//     const token = generateToken(payload);

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Router.get("/profile", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     if (!userId) {
//       return res.status(404).json("User is not found! ");
//     }
//     const user = await User.findById(userId);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// Router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(userId);

//     if (!user || !(await user.comparePassword(currentPassword))) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server error " });
//   }
// });
// module.exports = Router;
//////////////////////////////////////////////////////////////////////////

//routes//userRoutes.js
const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

// Signup route
Router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // Only one admin allowed
    if (data.role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({
          error: "Admin already exists. Only one admin is allowed",
        });
      }
    }

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("User saved:", response);

    const payload = { id: response.id };
    const token = generateToken(payload);

    res.status(201).json({ response, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
Router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;
    const user = await User.findOne({ aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = { id: user.id };
    const token = generateToken(payload);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route
Router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
});

// Update password
Router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Admin only: Get all users
Router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);

    if (!requestingUser || requestingUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Admin privileges required." });
    }

    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Admin only: Update user vote status
Router.put("/vote-status/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);

    if (!requestingUser || requestingUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Admin privileges required." });
    }

    const userId = req.params.id;
    const { isVoted } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isVoted = isVoted;
    await user.save();

    res.status(200).json({
      message: "User vote status updated successfully",
      user: {
        id: user._id,
        name: user.name,
        isVoted: user.isVoted,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = Router;
