const Author = require("../models/Author");

// * helper
const ErrorResponse = require("../helper/errorResponse");

// * GET authors
getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();

    // res.status(200).json({
    //   status: "success",
    //   body: authors,
    // });
    res.json(authors);
  } catch (error) {
    next(new ErrorResponse("Error to found all the Authors", 500));
  }
};

// * GET by ID author
getAuthorID = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return next(new ErrorResponse("Author doesnt exists", 500));
    }

    res.status(200).json({
      status: "success",
      body: author,
    });
  } catch (error) {
    next(new ErrorResponse("Author not found", 404));
  }
};

// * POST author
createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);

    res.status(200).json({
      status: "success",
      body: author,
    });
  } catch (error) {
    next(new ErrorResponse("Error to create an Author", 500));
  }
};

// * UPDATE author
updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body);

    if (!author) {
      return next(new ErrorResponse("Author doesnt exists", 500));
    }

    res.status(200).json({
      status: "success",
      body: "Author update successfully",
    });
  } catch (error) {
    next(new ErrorResponse("Error to update an Author", 500));
  }
};

// * DELETE author
deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return next(new ErrorResponse("Author doesnt exists", 500));
    }

    res.status(200).json({
      status: "success",
      body: "Author deleted",
    });
  } catch (error) {
    next(new ErrorResponse("Error to delete an Author", 500));
  }
};

module.exports = {
  getAuthors,
  getAuthorID,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
