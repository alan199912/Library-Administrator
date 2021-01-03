const mongoose = require("mongoose");

const connectionDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  if (connection) {
    console.log(`MongoDB Server Atlas Connected ${connection.connection.host}`);
  } else {
    console.log("MongoDB is not Connected");
  }
};

module.exports = connectionDB;
