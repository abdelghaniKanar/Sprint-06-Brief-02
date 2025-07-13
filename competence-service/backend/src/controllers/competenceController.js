const Competence = require("../models/Competence");

// Importance to weight mapping
const importanceWeight = {
  High: 3,
  Normal: 2,
  Low: 1,
};

// Logic to compute validated status
function computeValidationStatus(subCompetences) {
  const validated = subCompetences.filter((sc) => sc.validated);
  const notValidated = subCompetences.filter((sc) => !sc.validated);

  if (validated.length > notValidated.length) return true;
  if (validated.length < notValidated.length) return false;

  // If counts are equal → compare weighted importance
  const validWeight = validated.reduce(
    (sum, sc) => sum + importanceWeight[sc.importance],
    0
  );
  const notValidWeight = notValidated.reduce(
    (sum, sc) => sum + importanceWeight[sc.importance],
    0
  );

  return validWeight >= notValidWeight;
}

// Create Competence
const createCompetence = async (req, res) => {
  try {
    const { code, name, subCompetences } = req.body;

    if (!code || !name || !Array.isArray(subCompetences)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existing = await Competence.findOne({ code });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Competence with this code already exists" });
    }

    const validated = computeValidationStatus(subCompetences);

    const competence = new Competence({
      code,
      name,
      subCompetences,
      validated,
    });

    await competence.save();
    res.status(201).json(competence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Competences (all or one)
const getCompetences = async (req, res) => {
  try {
    if (req.params.id) {
      const competence = await Competence.findById(req.params.id);
      if (!competence) {
        return res.status(404).json({ message: "Competence not found" });
      }
      return res.json(competence);
    }

    const competences = await Competence.find();
    res.json(competences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update full competence
const updateCompetence = async (req, res) => {
  try {
    const competence = await Competence.findById(req.params.id);
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }

    competence.code = req.body.code || competence.code;
    competence.name = req.body.name || competence.name;
    competence.subCompetences =
      req.body.subCompetences || competence.subCompetences;

    competence.validated = computeValidationStatus(competence.subCompetences);

    await competence.save();
    res.json(competence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete competence
const deleteCompetence = async (req, res) => {
  try {
    const deleted = await Competence.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Competence not found" });
    }
    res.json({ message: "Competence deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update a specific sub-competence validation
const updateSubCompetence = async (req, res) => {
  try {
    const { competenceId, subId } = req.params;
    const { validated } = req.body;

    const competence = await Competence.findById(competenceId);
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }

    const sub = competence.subCompetences.id(subId);
    if (!sub) {
      return res.status(404).json({ message: "SubCompetence not found" });
    }

    sub.validated = validated;
    competence.validated = computeValidationStatus(competence.subCompetences);

    await competence.save();
    res.json(competence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompetence,
  getCompetences,
  updateCompetence,
  deleteCompetence,
  updateSubCompetence,
};
