const express = require("express");
const dml = require("../data/dataManagementLayer");

const router = express.Router();

router.get("/list", async (req
    , res, next) => {
    // TODO uncomment to see an easter egg
    //res.status(418);
    res.json(await dml.readSubjects());
});

module.exports = router;