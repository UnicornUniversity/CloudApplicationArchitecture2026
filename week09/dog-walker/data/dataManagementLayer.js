const fs = require('node:fs/promises');
const path = require("path");

const rootPath = path.dirname(require.main.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath=" + rootPath);
console.log("dataPath=" + dataPath);

const USERS = "users.json";

async function readDataRoutines(entityName) {
    try {
        const rawFileContent = await fs.readFile(path.join(dataPath, entityName));
        return JSON.parse(rawFileContent);
    } catch (error) {
        console.error(`Error reading ${entityName}:`, error.message);
        throw new Error(`Failed to read data from ${entityName}`);
    }
}

async function saveDataRoutines(entityName, items) {
    try {
        return await fs.writeFile(path.join(dataPath, entityName), JSON.stringify(items, null, 2), {encoding: "utf-8"});
    } catch (error) {
        console.error(`Error saving ${entityName}:`, error.message);
        throw new Error(`Failed to save data to ${entityName}`);
    }
}

async function readProfiles() {
    return await readDataRoutines(USERS);
}

async function saveProfiles(items){
    return await saveDataRoutines(USERS, items);
}

// Export with better naming - these are dog profiles, not users
module.exports.readProfiles = readProfiles;
module.exports.saveProfiles = saveProfiles;
// Keep old names for backwards compatibility during refactoring
module.exports.readUsers = readProfiles;
module.exports.saveUsers = saveProfiles;