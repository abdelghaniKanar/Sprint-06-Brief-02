const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dbConfig");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const apprenantRoutes = require("./src/routes/apprenantRoutes");
app.use("/api/apprenants", apprenantRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Apprenant microservice is running!" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
