const express = require("express");
const dml = require("../data/dataManagementLayer");

const router = express.Router();

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_CANT_CREATE = 400;

/**
 * @swagger
 * /grades/add:
 *   post:
 *     summary: Add a new grade
 *     description: Creates a new grade record for a student in a subject
 *     tags:
 *       - Grades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idStudent:
 *                 type: integer
 *                 description: The student ID
 *               idSubject:
 *                 type: integer
 *                 description: The subject ID
 *               date:
 *                 type: string
 *                 description: The date of the grade
 *               mark:
 *                 type: integer
 *                 description: The grade mark (1-5)
 *             required:
 *               - idStudent
 *               - idSubject
 *               - date
 *               - mark
 *     responses:
 *       201:
 *         description: Grade created successfully
 *       400:
 *         description: Invalid mark value (must be between 1-5)
 */
router.post("/add", async (req, res, next) => {

    // for debug
    // console.log(req.body);

    const output = {
        idStudent: req.body.idStudent,
        idSubject: req.body.idSubject,
        date: req.body.date,
        mark: req.body.mark
    };

    let status = HTTP_STATUS_CREATED;

    let errorStr = "";
    const mark = parseInt(output.mark);
    if (mark < 1 || mark > 5) {
        errorStr = "Wrong mark value";
        status = HTTP_STATUS_CANT_CREATE;
    }

    if (errorStr.length === 0){
        const gradesExisted = await dml.readGrades();
        const gradesAll = [output, ...gradesExisted];
        await dml.saveGrades(gradesAll);
    }

    res.status(status);
    res.json({...output, errorStr: errorStr});
});

module.exports = router;