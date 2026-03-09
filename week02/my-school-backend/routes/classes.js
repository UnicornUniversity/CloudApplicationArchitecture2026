const express = require("express");
const dml = require("../data/dataManagementLayer");

const router = express.Router();

/**
 * @swagger
 * /classes/list:
 *   get:
 *     summary: Get all classes
 *     description: Retrieves a list of all available classes
 *     tags:
 *       - Classes
 *     responses:
 *       200:
 *         description: List of all classes
 */
router.get("/list", async (req, res, next) => {
    const classesData = await dml.readClasses();
    res.json(classesData);
});

module.exports = router;