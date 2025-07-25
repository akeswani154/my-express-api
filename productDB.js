require("dotenv").config();

const connectDb = require("./db/connect.js");
const Product  = require("./models/products.js");
const productJson = require("./products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany(); // Clear existing products
    await Product.create(productJson);
    console.log("Products added successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

start();
