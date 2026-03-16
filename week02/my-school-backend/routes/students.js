const express = require("express");
const dml = require("../data/dataManagementLayer");
const studentsHelper = require("../helpers/studentsHelper");
const gradesHelper = require("../helpers/gradesHelper");

const router = express.Router();

/**
 * @swagger
 * /students/classes/{id}:
 *   get:
 *     summary: Get all students in a class
 *     description: Retrieves all students enrolled in a specific class
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The class ID
 *     responses:
 *       200:
 *         description: List of students in the class
 */
router.get("/class/:id", async (req, res, next) => {
    const idClass = parseInt(req.params.id);
    const allStudents = await dml.readStudents();
    res.json(studentsHelper.getStudentsForClass(allStudents, idClass));
});

/**
 * @swagger
 * /students/get/{id}:
 *   get:
 *     summary: Get a specific student
 *     description: Retrieves details of a single student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student details
 */
router.get("/get/:id", async (req, res, next) => {
    const idStudent = parseInt(req.params.id);
    const student = studentsHelper.getStudentById(await dml.readStudents(), idStudent);
    res.json(student);
});

/**
 * @swagger
 * /students/grades/{id}:
 *   get:
 *     summary: Get all grades for a student
 *     description: Retrieves all grades for a specific student
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     responses:
 *       200:
 *         description: List of student grades
 */
router.get("/grades/:id", async (req, res, next) => {
    const idStudent = parseInt(req.params.id);
    const grades = gradesHelper.getMarksForStudent(await dml.readGrades(), idStudent);
    res.json(grades);
});


module.exports = router;