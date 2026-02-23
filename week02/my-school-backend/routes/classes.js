const express = require("express");
const dml = require("../data/dataManagementLayer");

const router = express.Router();

router.get("/list", async (req
    , res, next) => {
    const classesData = await dml.readClasses();
    res.json({items: classesData});
});

module.exports = router;