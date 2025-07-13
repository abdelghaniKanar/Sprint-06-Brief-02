const mongoose = require("mongoose");

const renduSchema = new mongoose.Schema({
  apprenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apprenant",
    required: true,
  },
  brief: {
    type: String, // Later this can be ObjectId referencing Brief-Service
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  feedback: String,
  grade: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rendu", renduSchema);
