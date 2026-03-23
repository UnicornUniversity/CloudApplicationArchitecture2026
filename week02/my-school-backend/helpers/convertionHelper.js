function listToDict(list) {
    const dict = new Map();
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        dict.set(item.id, item.name);
    }
    return dict;
}

module.exports.listToDict = listToDict;