const fs = require('fs');

// read data from json file which will return buffer data
const bufferData = fs.readFileSync('./1-json.json');

// convert buffer data to string
const stringData = bufferData.toString();

// convert json string to javascript obj
const dataObj = JSON.parse(stringData);

// alter the content of dataObj
dataObj.name = "sourabh";
dataObj.age = "22";

// convert back to json string
const dataJsonString = JSON.stringify(dataObj);

// overwirte data to the same file
fs.writeFileSync('./1-json.json', dataJsonString);
