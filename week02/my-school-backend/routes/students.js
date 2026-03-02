const express = require("express");
const dml = require("../data/dataManagementLayer");
const studentsHelper = require("../helpers/studentsHelper");
const gradesHelper = require("../helpers/gradesHelper");

const router = express.Router();

router.get("/classes/:id", async (req
    , res, next) => {
    const idClass = parseInt(req.params.id);
    const allStudents = await dml.readStudents();
    res.json(studentsHelper.getStudentsForClass(allStudents, idClass));
});

router.get("/get/:id", async (req
    , res, next) => {
    const idStudent = parseInt(req.params.id);
    const student = studentsHelper.getStudentById(await dml.readStudents(), idStudent);
    res.json(student);
});

router.get("/grades/:id", async (req
    , res, next) => {
    const idStudent = parseInt(req.params.id);
    const grades = gradesHelper.getMarksForStudent(await dml.readGrades(), idStudent);
    res.json(grades);
});


module.exports = router;