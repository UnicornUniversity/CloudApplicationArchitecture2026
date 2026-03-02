function getStudentsForClass(allStudents, idClass) {
    const studentsByClass = allStudents.filter((student) => parseInt(student.class) === idClass);
    return studentsByClass.map((student) => {
            return {
                id: student.id,
                name: student.name,
                dob: student.dob,
                dobStr: getDobStr(student.dob)
            }
        }
    );
}

function getStudentById(allStudents, id) {
    const students = allStudents.filter((student) => parseInt(student.id) === id);
    return students.length > 0 ? {...students[0], dobStr: getDobStr(students[0].dob)} : {};
}

function getDobStr(dob) {
    return new Date(dob).toLocaleDateString("en-GB");
}

module.exports.getStudentsForClass = getStudentsForClass;
module.exports.getStudentById = getStudentById;

