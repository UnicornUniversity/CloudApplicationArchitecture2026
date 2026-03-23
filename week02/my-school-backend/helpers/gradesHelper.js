const {parse} = require("mathjs");

function getMarksForStudent(allGrades, idStudent) {
    return allGrades.filter((grade) => parseInt(grade.idStudent) === parseInt(idStudent));
}

function getMarksForStudentPerSubject(allGrades, idStudent, idSubject) {
    const grades = getMarksForStudent(allGrades, idStudent);
    const results = [];
    for (let i = 0; i < grades.length; i++) {
        const grade = grades[i];
        if (parseInt(grade.idSubject) !== parseInt(idSubject)) continue;
        results.push(grade.mark);
    }
    return results;
}

module.exports.getMarksForStudent = getMarksForStudent;
module.exports.getMarksForStudentPerSubject = getMarksForStudentPerSubject;