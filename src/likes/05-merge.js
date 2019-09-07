const fs = require("fs").promises;
let files = Array(2).fill(0).map( (v,i) => `./data/parsed${i}.json` ).map( file => require(file) ).reduce((prev,curr) => prev.concat(curr), []);
fs.writeFile("./data/FINAL.json", JSON.stringify(files, null, 2)).then(console.log).catch(console.error);