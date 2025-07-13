const mongoose = require("mongoose");

const briefSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    deadline: Date,
    competences: [
      {
        type: String, // example: "C1", "C2", etc. coming from Competence-Service
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brief", briefSchema);
