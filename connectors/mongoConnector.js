const mongoose = require("mongoose");

async function mongoConnect() {
  try {
    mongoose.connect(
      "mongodb+srv://dbUser:3A0YO1fKLDkVmhcz@cluster0-bi5e4.mongodb.net/dbUsers?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", console.log.bind(console, "Mongo ready"));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  mongoConnect: mongoConnect,
};
