const fs = require("fs").promises;
let files = Array(HOW_MANY_FILES_OF_LIKES).fill(0).map( (v,i) => `./data/${i}.json` ).map( file => require(file) ).reduce((prev,curr) => prev.concat(curr), []);
fs.writeFile("./data/parsed0.json", JSON.stringify(files, null, 2)).then(console.log).catch(console.error);