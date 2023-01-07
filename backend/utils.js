const fs = require("fs");

function readJsonFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, fileBuffer) => {
            if (err) {
                reject(err);
            } else {
                const jsonString = fileBuffer.toString();
                const dataObj = JSON.parse(jsonString);
                resolve(dataObj);
            }
        });
    });
}
function writeJsonFile(filename, dataObj) {
    return new Promise((resolve, reject) => {
        const jsonDataString = JSON.stringify(dataObj, null, 2);
        fs.writeFile(filename, jsonDataString, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(dataObj);
            }
        });
    });
}
module.exports = {
    readJsonFile,
    writeJsonFile,
};
