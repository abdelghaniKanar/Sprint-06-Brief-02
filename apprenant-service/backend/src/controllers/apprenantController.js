const Apprenant = require("../models/Apprenant");

// Create
exports.createApprenant = async (req, res) => {
  try {
    const apprenant = new Apprenant(req.body);
    await apprenant.save();
    res.status(201).json(apprenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All
exports.getAllApprenants = async (req, res) => {
  try {
    const list = await Apprenant.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One
exports.getApprenantById = async (req, res) => {
  try {
    const apprenant = await Apprenant.findById(req.params.id);
    if (!apprenant) return res.status(404).json({ message: "Not found" });
    res.json(apprenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateApprenant = async (req, res) => {
  try {
    const apprenant = await Apprenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!apprenant) return res.status(404).json({ message: "Not found" });
    res.json(apprenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteApprenant = async (req, res) => {
  try {
    const apprenant = await Apprenant.findByIdAndDelete(req.params.id);
    if (!apprenant) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Apprenant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
