const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dbConfig");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const briefRoutes = require("./src/routes/briefRoutes");
app.use("/api/briefs", briefRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Brief microservice is running!" });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
