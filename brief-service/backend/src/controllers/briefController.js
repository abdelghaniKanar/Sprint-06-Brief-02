const Brief = require("../models/Brief");

// Create
exports.createBrief = async (req, res) => {
  try {
    const { title, description, deadline, competences } = req.body;
    const brief = new Brief({ title, description, deadline, competences });
    await brief.save();
    res.status(201).json(brief);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All
exports.getAllBriefs = async (req, res) => {
  try {
    const briefs = await Brief.find();
    res.json(briefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One
exports.getBriefById = async (req, res) => {
  try {
    const brief = await Brief.findById(req.params.id);
    if (!brief) return res.status(404).json({ message: "Not found" });
    res.json(brief);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateBrief = async (req, res) => {
  try {
    const brief = await Brief.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brief) return res.status(404).json({ message: "Not found" });
    res.json(brief);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteBrief = async (req, res) => {
  try {
    const brief = await Brief.findByIdAndDelete(req.params.id);
    if (!brief) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Brief deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
