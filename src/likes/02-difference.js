const fs = require("fs").promises;

const parse = require("./data/parsed.json").map( i => i.id_str );
const archive = require("./data/archive.json").map( i => i.like.tweetId );

const b = new Set(parse);
const a = new Set(archive);

const difference = new Set([...a].filter(x => !b.has(x)));

fs.writeFile("./data/difference.json", JSON.stringify([...difference], null, 2) ).then(console.log).catch(console.error);