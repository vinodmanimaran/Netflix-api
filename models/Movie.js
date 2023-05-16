const mongoose = require('mongoose');

// Define the Movie schema
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    imgTitle: {
      type: String,
    },
    imgSm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export the Movie model
module.exports = mongoose.model('Movie', MovieSchema);
