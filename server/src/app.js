// * Imports
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// * middlewares
const errorHandler = require("./middleware/error");

// * Routes
const routerBook = require("./routes/book");
const routerAuthor = require("./routes/author");

// * Mongo DB
const connectionDB = require("./config/db");

// * File .env
dotenv.config();

// * Connection to BD
connectionDB();

// * Create the server
const app = express();
app.use(express.json());
app.use(cors());

// * Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // * intercepts all requests sent by the client
}

const PORT = process.env.PORT || 5000; //* setting the port

// * Inicializate the server
const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT} in ${process.env.NODE_ENV}`);
});

// * Stops operations
process.on("unhandledRejection", (err, promise) => {
  console.log("Errors", err.message);
  server.close(() => process.exit(1));
});

// * Endpoints
app.use("/api/book", routerBook);
app.use("/api/author", routerAuthor);

// * setting the middleware
app.use(errorHandler);
