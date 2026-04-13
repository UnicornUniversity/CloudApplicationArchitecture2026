const fs = require("fs/promises");
const path = require("path");

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath = " + rootPath);
console.log("dataPath = " + dataPath);

const USERS = "users.json";

async function readDataRoutines(entityName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, entityName));
    return JSON.parse(rawFileContent);
}

async function saveDataRoutines(entityName, items) {
    return await fs.writeFile(path.join(dataPath, entityName), JSON.stringify(items));
}

async function readUsers() {
    return await readDataRoutines(USERS);
}

module.exports.readUsers = readUsers;
