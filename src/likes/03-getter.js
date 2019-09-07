const got = require("got");
const fs = require("fs").promises;
const srcData = require("./data/difference.json");
const TOKEN = "YOUR TWITTER TOKEN";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const data = chunk(srcData, 100);

async function query(data){
	return got("https://api.twitter.com/1.1/statuses/lookup.json", {
		method: "POST",
		form: true,
		headers: { authorization: "Bearer " + TOKEN },
		body: {
			id: data.join(",")
		}
	}).then( ({body}) => JSON.parse(body) );
}

(async function main(data){
	let i = 0;
	for(let item of data){
		let r = await query(item);
		await fs.writeFile(`tw_${i}.json`, JSON.stringify(r,null,2));
		console.log("Got and wrote: ", i);
		i++;
	}
})(data);