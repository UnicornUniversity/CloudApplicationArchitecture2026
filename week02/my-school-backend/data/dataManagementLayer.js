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

async function readClasses() {
    return await readDataRoutines(CLASSES);
}

module.exports.readClasses = readClasses;