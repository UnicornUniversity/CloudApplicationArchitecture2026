const express = require("express");
const dml = require("../data/dataManagementLayer");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/get", searchController.getForm);
router.post("/do", searchController.doSearch);

module.exports = router;