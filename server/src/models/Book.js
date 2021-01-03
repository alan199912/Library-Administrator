const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    required: [true, "Add a title"],
    maxlength: [500, "Title cannot be longer than 500 characters"],
    type: String,
  },
  description: String,
  price: Number,
  date: Date,
  // author: [
  //   {
  //     ref: "Author",
  //     type: mongoose.Schema.Types.ObjectId,
  //   },
  // ],
  author: {
    id: String,
    fullName: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
