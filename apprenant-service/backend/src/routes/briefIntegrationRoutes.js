const express = require("express");
const router = express.Router();
const Rendu = require("../models/Rendu");
const { getCompetencesByCodes } = require("../utils/fetchCompetences");
const axios = require("axios");

// GET /api/briefs-with-competences/:apprenantId
router.get("/:apprenantId", async (req, res) => {
  try {
    const rendus = await Rendu.find({ apprenant: req.params.apprenantId });

    const briefs = [];

    for (const rendu of rendus) {
      // 1. Get brief from Brief-Service
      const briefRes = await axios.get(
        `http://localhost:5003/api/briefs/${rendu.brief}`
      );
      const brief = briefRes.data;

      // 2. Get full competence data from Competence-Service
      const competences = await getCompetencesByCodes(brief.competences || []);

      // 3. Merge data
      briefs.push({
        briefId: brief._id,
        title: brief.title,
        description: brief.description,
        deadline: brief.deadline,
        competences,
      });
    }

    res.json(briefs);
  } catch (err) {
    console.error("Error in integration route:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
