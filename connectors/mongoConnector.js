const mongoose = require("mongoose");

const uri = process.env.MONGO_URL


async function mongoConnect() {
  try {
    mongoose.connect(
      uri,
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
