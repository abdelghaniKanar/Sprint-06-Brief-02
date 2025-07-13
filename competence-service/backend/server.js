const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dbConfig");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Init Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes placeholder
app.get("/", (req, res) => {
  res.json({ message: "Competence microservice is running!" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
