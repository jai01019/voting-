// const express = require("express");
// const Router = express.Router();
// const Candidate = require("../models/candidate");
// const User = require("../models/user");
// const { generateToken, jwtAuthMiddleware } = require("../jwt");

// const isAdmin = async (userId) => {
//   try {
//     const foundUser = await User.findById(userId);
//     if (foundUser.role === "admin") return true;
//   } catch (err) {
//     return false;
//   }
// };

// Router.get("/", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const allCandidates = await Candidate.find({});

//     if (allCandidates.length === 0) {
//       return res.status(404).json({ message: "No candidates found" });
//     }

//     res.status(200).json(allCandidates);
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Internal server Error" });
//   }
// });

// Router.post("/create", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!(await isAdmin(req.user.id)))
//       return res.status(403).json({ message: "user has not a admin role" });
//     const data = req.body;
//     const newCandidate = new Candidate(data);
//     const response = await newCandidate.save();
//     console.log(" Candidate Data saved");

//     res.status(200).json({ response: response });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Router.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!(await isAdmin(req.user.id)))
//       return res.status(403).json({ message: "user has not a admin role" });

//     const candidateID = req.params.candidateID;
//     const candidate = req.body;
//     const updatedCandidate = await Candidate.findByIdAndUpdate(
//       candidateID,
//       candidate,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedCandidate) {
//       return res.status(404).json({ error: "Candidate is not found" });
//     }
//     return res.status(200).json(updatedCandidate);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message || "Internal Server error" });
//   }
// });
// /////////////////////////////////////
// Router.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
//   try {
//     if (!(await isAdmin(req.user.id)))
//       return res.status(403).json({ message: "user has not a admin role" });

//     const candidateID = req.params.candidateID;

//     const updatedDelete = await Candidate.findByIdAndDelete(candidateID);

//     if (!updatedDelete) {
//       res.status(404).json({ error: "Candidate is not found" });
//     }

//     res.status(200).json({ message: "Candidate deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server error " });
//   }
// });

// // lets start voting
// Router.post("/vote/:CandidateID", jwtAuthMiddleware, async (req, res) => {
//   const candidateId = req.params.CandidateID;
//   console.log("consoling the value of candidate Id of checking:", candidateId);

//   const userId = req.user.id;
//   try {
//     const candidate = await Candidate.findById(candidateId);

//     if (!candidate) {
//       return res.status(400).json("Candidate not found");
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json("user not found");
//     }

//     if (user.isVoted) {
//       return res.status(400).json("user is already voted");
//     }
//     if (user.role == "admin") {
//       console.log(`${user.role}`);
//       return res
//         .status(400)
//         .json("user is admin role, nd admin is not allowed");
//     }

//     candidate.votes.push({ user: userId });
//     candidate.voteCount++;
//     await candidate.save();

//     //update the user document

//     user.isVoted = true;

//     await user.save();
//     res.status(200).json({ message: "Vote recorded successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });

// //vote count

// Router.get("/vote/count", async (req, res) => {
//   try {
//     const candidate = await Candidate.find().sort({ voteCount: "desc" });

//     const voteRecord = candidate.map((data) => {
//       return {
//         name: data.name,
//         count: data.voteCount,
//       };
//     });

//     return res.status(200).json(voteRecord);
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });

// module.exports = Router;
///////////////////////////////////////////////////////////////
//routes//candidateRoutes.js
const express = require("express");
const Router = express.Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const { jwtAuthMiddleware } = require("../jwt");

// Utility: check admin
const isAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.role === "admin";
  } catch (err) {
    return false;
  }
};

// GET /candidate - all candidates (sorted by votes)
Router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    if (!candidates.length) {
      return res.status(404).json({ message: "No candidates found" });
    }
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// POST /candidate - create new candidate (admin only)
Router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.id))) {
      return res.status(403).json({ error: "Admin privileges required" });
    }

    const { name, party, age } = req.body;

    // check duplicate
    const existing = await Candidate.findOne({ $or: [{ name }, { party }] });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Candidate with this name or party already exists" });
    }

    const newCandidate = new Candidate({ name, party, age });
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// PUT /candidate/:id - update candidate (admin only)
Router.put("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.id))) {
      return res.status(403).json({ error: "Admin privileges required" });
    }

    const candidateId = req.params.id;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// DELETE /candidate/:id - delete candidate (admin only, if no votes)
Router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.id))) {
      return res.status(403).json({ error: "Admin privileges required" });
    }

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    if (candidate.voteCount > 0) {
      return res
        .status(400)
        .json({ error: "Cannot delete candidate with votes" });
    }

    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// // POST /candidate/vote/:id - voting
// Router.post("/vote/:id", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const candidateId = req.params.id;
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (user.role !== "voter") {
//       return res.status(403).json({ error: "Only voters can vote" });
//     }
//     if (user.isVoted) {
//       return res.status(400).json({ error: "User has already voted" });
//     }

//     const candidate = await Candidate.findById(candidateId);
//     if (!candidate) {
//       return res.status(404).json({ error: "Candidate not found" });
//     }

//     // check if already voted for same candidate
//     const alreadyVoted = candidate.votes.find(
//       (vote) => vote.user.toString() === userId
//     );
//     if (alreadyVoted) {
//       return res
//         .status(400)
//         .json({ error: "You already voted this candidate" });
//     }

//     candidate.votes.push({ user: userId });
//     candidate.voteCount++;
//     await candidate.save();

//     user.isVoted = true;
//     await user.save();

//     res.status(200).json({
//       message: "Vote recorded successfully",
//       candidate: candidate.name,
//       voteCount: candidate.voteCount,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Internal Server Error" });
//   }
// });

// POST /candidate/vote/:id
Router.post("/vote/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const candidateId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role !== "voter") {
      return res.status(403).json({ error: "Only voters can vote" });
    }
    if (user.isVoted) {
      return res.status(400).json({ error: "User has already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Add vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Update user
    user.isVoted = true;
    await user.save();

    // ✅ Return both updated candidate & user
    res.status(200).json({
      message: "Vote recorded successfully",
      candidate: {
        id: candidate._id,
        name: candidate.name,
        voteCount: candidate.voteCount,
      },
      user: {
        id: user._id,
        name: user.name,
        isVoted: user.isVoted,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// GET /candidate/vote/count - simple count summary
Router.get("/vote/count", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    const summary = candidates.map((c) => ({
      name: c.name,
      count: c.voteCount,
    }));
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// GET /candidate/results - detailed results
Router.get("/results", async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .sort({ voteCount: -1 })
      .populate("votes.user", "name");
    const results = candidates.map((c) => ({
      _id: c._id,
      name: c.name,
      party: c.party,
      age: c.age,
      voteCount: c.voteCount,
      votes: c.votes,
    }));
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = Router;
