const express = require("express");

const router = express.Router();

// * controllers
const ctr = require("../controllers/book");

// * get all of the books
router.get("", ctr.getBooks);

// * get one book
router.get("/:id", ctr.getBookId);

// * create a book
router.post("", ctr.createBook);

// * update a book
router.put("/:id", ctr.updateBook);

// * delete a book
router.delete("/:id", ctr.deleteBook);

// * pagination
router.post("/pagination", ctr.pagination);

// * export the router
module.exports = router;
