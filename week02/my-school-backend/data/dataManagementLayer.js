const fs = require("fs/promises");
const path = require("path");

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath = " + rootPath);
console.log("dataPath = " + dataPath);

const CLASSES = "classes.json";
const GRADES = "grades.json";
const PERSONS = "persons.json";
const SUBJECT = "subjects.json";

async function readDataRoutines(entityName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, entityName));
    return JSON.parse(rawFileContent);
}

async function saveDataRoutines(entityName, items) {
    return await fs.writeFile(path.join(dataPath, entityName), JSON.stringify(items));
}

async function readClasses() {
    return await readDataRoutines(CLASSES);
}

async function readStudents() {
    return await readDataRoutines(PERSONS);
}

async function readSubjects() {
    return await readDataRoutines(SUBJECT);
}

async function readGrades() {
    return await readDataRoutines(GRADES);
}

async function saveGrades(items) {
    return await saveDataRoutines(GRADES, items);
}


module.exports.readClasses = readClasses;
module.exports.readStudents = readStudents;
module.exports.readSubjects = readSubjects;
module.exports.readGrades = readGrades;
module.exports.saveGrades = saveGrades;