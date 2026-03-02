function getMarksForStudent(allGrades, idStudent) {
    return allGrades.filter((grade) => parseInt(grade.idStudent) === parseInt(idStudent));
}

module.exports.getMarksForStudent = getMarksForStudent;