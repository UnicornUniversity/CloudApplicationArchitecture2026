const express = require("express");
const dml = require("../data/dataManagementLayer");

const router = express.Router();

/**
 * @swagger
 * /subjects/list:
 *   get:
 *     summary: Get all subjects
 *     description: Retrieves a list of all available subjects
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: List of all subjects
 */
router.get("/list", async (req, res, next) => {
    // TODO uncomment to see an easter egg
    //res.status(418);
    res.json(await dml.readSubjects());
});

module.exports = router;