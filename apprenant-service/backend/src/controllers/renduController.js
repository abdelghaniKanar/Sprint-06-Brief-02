const Rendu = require("../models/Rendu");

// Create
exports.createRendu = async (req, res) => {
  try {
    const rendu = new Rendu(req.body);
    await rendu.save();
    res.status(201).json(rendu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All
exports.getAllRendus = async (req, res) => {
  try {
    const rendus = await Rendu.find().populate("apprenant");
    res.json(rendus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getRenduById = async (req, res) => {
  try {
    const rendu = await Rendu.findById(req.params.id).populate("apprenant");
    if (!rendu) return res.status(404).json({ message: "Not found" });
    res.json(rendu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateRendu = async (req, res) => {
  try {
    const rendu = await Rendu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rendu) return res.status(404).json({ message: "Not found" });
    res.json(rendu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteRendu = async (req, res) => {
  try {
    const rendu = await Rendu.findByIdAndDelete(req.params.id);
    if (!rendu) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Rendu deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
