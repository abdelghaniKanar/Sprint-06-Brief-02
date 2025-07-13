const mongoose = require("mongoose");

// Sub-competence embedded schema
const SubCompetenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  validated: { type: Boolean, default: false },
  importance: {
    type: String,
    enum: ["High", "Normal", "Low"],
    required: true,
  },
});

// Main competence schema
const CompetenceSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subCompetences: [SubCompetenceSchema],
  validated: { type: Boolean, default: false }, // computed field
});

module.exports = mongoose.model("Competence", CompetenceSchema);
