const fs = require("fs").promises;
let files = Array(HOW_MANY_FILES_OF_TWEETS).fill(0).map( (v,i) => `./data/tw_${i}.json` ).map( file => require(file) ).reduce((prev,curr) => prev.concat(curr), []);
fs.writeFile("./data/parsed1.json", JSON.stringify(files, null, 2)).then(console.log).catch(console.error);