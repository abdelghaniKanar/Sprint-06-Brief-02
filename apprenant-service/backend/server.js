const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dbConfig");
const apprenantRoutes = require("./src/routes/apprenantRoutes");
const renduRoutes = require("./src/routes/renduRoutes");
const briefIntegrationRoutes = require("./src/routes/briefIntegrationRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Apprenant microservice is running!" });
});

app.use("/api/apprenants", apprenantRoutes);
app.use("/api/rendus", renduRoutes);
app.use("/api/briefs-with-competences", briefIntegrationRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
