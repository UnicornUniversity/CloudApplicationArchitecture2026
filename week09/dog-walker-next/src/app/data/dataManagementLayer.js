import {promises as fs} from "fs";
import path from "path";

const dataPath = "public";
const imagesPath = "images";
const USERS = "users.json";

async function readDataRoutines(entityName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, entityName));
    const users = JSON.parse(rawFileContent);
    for (let i = 0; i < users.length; i++) {
        users[i].id = i;
    }
    return users;
}

async function saveDataRoutines(entityName, items) {
    return await fs.writeFile(path.join(dataPath, entityName), JSON.stringify(items));
}

async function readUsers() {
    return await readDataRoutines(USERS);
}

function getImageUrl(url){
    return imagesPath + "/" + url;
}

async function saveUsers(items) {
    return await saveDataRoutines(USERS, items);
}

async function saveImage(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(path.join(dataPath, imagesPath, file.name), buffer);
}

export {readUsers, getImageUrl, saveUsers, saveImage};
