const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  academicDegree: String,
  fullName: String,
});

module.exports = mongoose.model("Author", AuthorSchema);
