const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router.get("/form", profileController.getForm);
router.post("/save", profileController.saveProfile);

module.exports = router;