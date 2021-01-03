const express = require("express");

// * Router
const router = express.Router();

// * Controllers
const crt = require("../controllers/author");

router.get("", crt.getAuthors);
router.get("/:id", crt.getAuthorID);
router.post("", crt.createAuthor);
router.put("/:id", crt.updateAuthor);
router.delete("/:id", crt.deleteAuthor);

// * Export the router
module.exports = router;
