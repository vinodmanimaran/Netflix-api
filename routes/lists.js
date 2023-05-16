const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
  const newList = new List(req.body);
  try {
    // Save the new list
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  try {
    // Find and delete the list
    await List.findByIdAndDelete(req.params.id);
    res.status(201).json("The list has been deleted...");
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

// GET
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        // Get a list with specified type and genre
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        // Get a list with specified type
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      // Get a random list
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json(err);
  }
});

module.exports = router;
