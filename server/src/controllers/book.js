const Book = require("../models/Book");
const Author = require("../models/Author");

// * error response
const ErrorResponse = require("../helper/errorResponse");

// * GET Book
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.json({
      status: "success",
      body: books,
    });
  } catch (error) {
    next(new ErrorResponse("Error to found all the Books", 500));
  }
};

// * GET Book By ID
const getBookId = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new ErrorResponse("Book doesnt exists"));
    }

    res.json({
      status: "success",
      body: book,
    });
  } catch (error) {
    next(new ErrorResponse("Book not found", 404));
  }
};

// * POST a Book
const createBook = async (req, res, next) => {
  try {
    // const { title, description, price, date, author } = req.body;
    // const newBook = new Book({
    //   title,
    //   description,
    //   price,
    //   date,
    // });

    // if (author) {
    //   const foundAuthor = await Author.find({ fullName: { $in: author } });

    //   if (foundAuthor == [] || foundAuthor == "" || foundAuthor == null) {
    //     return next(
    //       new ErrorResponse("Error to create a Book, author invalid", 500)
    //     );
    //   } else {
    //     newBook.author = foundAuthor.map((author) => author._id);
    //   }
    // }
    // const bookCreated = await newBook.save();

    // res.json({
    //   status: "success",
    //   body: bookCreated,
    // });
    const bookCreated = await Book.create(req.body);
    res.json({
      status: "success",
      body: bookCreated,
    });
  } catch (error) {
    next(new ErrorResponse("Error to create a Book", 500));
  }
};

// * UPDATE Book
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!book) {
      return next(new ErrorResponse("Book doesnt exists", 500));
    }

    res.json({
      status: "success",
      message: "Book updated successfully",
    });
  } catch (error) {
    next(new ErrorResponse("Error to update a Book", 500));
  }
};

// * DELETE Book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return next(new ErrorResponse("Book doesnt exists", 500));
    }

    res.json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(new ErrorResponse("Error to delete a Book", 500));
  }
};

// * PAGINATION
const pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort; // * ordering
    const sortDirection = req.body.sortDirection; // * asc or desc
    const page = parseInt(req.body.page); // * number of page to return
    const pageSize = parseInt(req.body.pageSize); // * size of the page
    let filterValue = ""; // * searching filters
    let filterProperty = ""; // * searching properties
    let books;
    let totalCollections = 0; // * rows of pagination

    // * its a json have a value and property
    if (req.body.filter) {
      filterValue = req.body.filter.value;
      filterProperty = req.body.filter.property;

      // * searching with the filter
      books = await Book.find({
        // * searching by all
        [filterProperty]: new RegExp(filterValue, "i"),
      })
        .sort({ [sort]: sortDirection }) // * ordering
        .skip((page - 1) * pageSize) // * start to read the jsons
        .limit(pageSize);

      // * counting the collections
      totalCollections = await Book.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      }).estimatedDocumentCount();
    } else {
      // * get all of the Books
      books = await Book.find()
        .sort({ [sort]: sortDirection }) // * ordering
        .skip((page - 1) * pageSize) // * start to read the jsons
        .limit(pageSize);

      totalCollections = await Book.find().estimatedDocumentCount(); // * counting the collections
    }

    const pageQuantity = Math.ceil(totalCollections / pageSize);

    res.status(200).json({
      status: "success",
      pageSize,
      page,
      sort,
      sortDirection,
      pageQuantity,
      totalCollections,
      data: books,
    });
  } catch (error) {
    next(new ErrorResponse("Error to pagination a Book", 500));
  }
};

// * export functions
module.exports = {
  getBooks,
  getBookId,
  createBook,
  updateBook,
  deleteBook,
  pagination,
};
