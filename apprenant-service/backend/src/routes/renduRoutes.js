const express = require("express");
const router = express.Router();
const controller = require("../controllers/renduController");

router.post("/", controller.createRendu);
router.get("/", controller.getAllRendus);
router.get("/:id", controller.getRenduById);
router.put("/:id", controller.updateRendu);
router.delete("/:id", controller.deleteRendu);

module.exports = router;
