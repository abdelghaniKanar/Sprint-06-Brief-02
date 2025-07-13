const express = require("express");
const router = express.Router();
const controller = require("../controllers/competenceController");

router.post("/", controller.createCompetence);
router.get("/", controller.getCompetences);
router.get("/:id", controller.getCompetences);
router.put("/:id", controller.updateCompetence);
router.delete("/:id", controller.deleteCompetence);
router.put("/:competenceId/sub/:subId", controller.updateSub);

module.exports = router;
