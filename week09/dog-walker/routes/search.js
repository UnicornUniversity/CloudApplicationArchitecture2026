const express = require("express");
const router = express.Router();

const searchController = require("../controllers/searchController");

router.get("/form", searchController.getForm);
router.post("/do", searchController.doSearch);

module.exports = router;