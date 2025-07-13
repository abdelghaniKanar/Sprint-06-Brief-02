const express = require("express");
const router = express.Router();
const controller = require("../controllers/briefController");

router.post("/", controller.createBrief);
router.get("/", controller.getAllBriefs);
router.get("/:id", controller.getBriefById);
router.put("/:id", controller.updateBrief);
router.delete("/:id", controller.deleteBrief);

module.exports = router;
