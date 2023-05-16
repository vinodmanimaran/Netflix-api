const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    // Save the new movie
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verify, async (req, res) => {
  try {
    // Find and update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  try {
    // Find and delete the movie
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("The movie has been deleted...");
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// GET RANDOM
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      // Get a random series
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      // Get a random movie
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verify, async (req, res) => {
  try {
    // Get all movies in reverse order
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

module.exports = router;
