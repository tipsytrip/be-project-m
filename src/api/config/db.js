const mongoose = require("mongoose");
const db_url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db_url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Unable connect to MongoDB:`, error);
  }
};

module.exports = connectDB;
