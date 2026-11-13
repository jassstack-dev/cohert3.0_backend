const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vneeclasses_db_user:fw235KzqcKZrrn8j@cluster0.mwjv1ik.mongodb.net/",
    );
    console.log("db connected successfully");
  } catch (error) {
    console.log("error in db connection", error);
  }
};

module.exports = connectDB