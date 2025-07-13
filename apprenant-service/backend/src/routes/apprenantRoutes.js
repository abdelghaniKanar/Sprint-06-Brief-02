const express = require("express");
const router = express.Router();
const controller = require("../controllers/apprenantController");

router.post("/", controller.createApprenant);
router.get("/", controller.getAllApprenants);
router.get("/:id", controller.getApprenantById);
router.put("/:id", controller.updateApprenant);
router.delete("/:id", controller.deleteApprenant);

module.exports = router;
