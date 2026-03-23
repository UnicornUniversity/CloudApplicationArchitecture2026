const express = require("express");
const dml = require("../data/dataManagementLayer");
const gradesHelper = require("../helpers/gradesHelper");
const converionHelper = require("../helpers/convertionHelper");
const mathjs = require("mathjs");

const router = express.Router();

router.get("/performance", async (req, res, next) => {
    const classesData = await dml.readClasses();
    const subjectsData = await dml.readSubjects();
    const studentsData = await dml.readStudents();
    const gradesData = await dml.readGrades();

    const classesDict = converionHelper.listToDict(classesData);
    const subjectsDict = converionHelper.listToDict(subjectsData);

    console.log(studentsData)

    const output = studentsData.map((student) => {
        const idStudent = parseInt(student.id);
        const idClass = parseInt(student.class);
        // grades per subject per student
        const subjectStats = [];

        for(let i= 0 ; i < subjectsData.length; i++){
            const idSubject = parseInt(subjectsData[i].id);
            const gradesForStudent = gradesHelper.getMarksForStudentPerSubject(gradesData, idStudent, idSubject);

            subjectStats.push({
                idSubject: idSubject,
                nameSubject: subjectsDict.get(idSubject),
                value: mathjs.mean(gradesForStudent)
            });
        }

        return {
            idStudent: idStudent,
            nameStudent: student.name,
            dob: student.dob,
            idClass: idClass,
            nameClass: classesDict.get(idClass),
            subjectStats : subjectStats
        };
    });

    res.json(output);
});

module.exports = router;