const Competence = require("../models/Competence");

// Create new competence
exports.createCompetence = async (req, res) => {
  try {
    const { code, name, subCompetences } = req.body;

    if (!code || !name || !Array.isArray(subCompetences)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existing = await Competence.findOne({ code });
    if (existing)
      return res.status(409).json({ message: "Code already exists" });

    const validatedCount = subCompetences.filter((sc) => sc.validated).length;
    const notValidatedCount = subCompetences.length - validatedCount;

    const competence = new Competence({
      code,
      name,
      subCompetences,
      validated: validatedCount >= notValidatedCount,
    });

    await competence.save();
    res.status(201).json(competence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all or one
exports.getCompetences = async (req, res) => {
  try {
    if (req.params.id) {
      const competence = await Competence.findById(req.params.id);
      if (!competence) return res.status(404).json({ message: "Not found" });
      return res.json(competence);
    }

    const competences = await Competence.find();
    res.json(competences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update competence
exports.updateCompetence = async (req, res) => {
  try {
    const competence = await Competence.findById(req.params.id);
    if (!competence) return res.status(404).json({ message: "Not found" });

    competence.code = req.body.code || competence.code;
    competence.name = req.body.name || competence.name;
    competence.subCompetences =
      req.body.subCompetences || competence.subCompetences;

    const validatedCount = competence.subCompetences.filter(
      (sc) => sc.validated
    ).length;
    const notValidatedCount = competence.subCompetences.length - validatedCount;
    competence.validated = validatedCount >= notValidatedCount;

    await competence.save();
    res.json(competence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteCompetence = async (req, res) => {
  try {
    const deleted = await Competence.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update sub-competence
exports.updateSub = async (req, res) => {
  try {
    const { competenceId, subId } = req.params;
    const { validated } = req.body;

    const competence = await Competence.findById(competenceId);
    if (!competence) return res.status(404).json({ message: "Not found" });

    const sub = competence.subCompetences.id(subId);
    if (!sub) return res.status(404).json({ message: "Sub not found" });

    sub.validated = validated;

    const validatedCount = competence.subCompetences.filter(
      (sc) => sc.validated
    ).length;
    const notValidatedCount = competence.subCompetences.length - validatedCount;
    competence.validated = validatedCount >= notValidatedCount;

    await competence.save();
    res.json(competence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
