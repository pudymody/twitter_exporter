const fs = require("fs").promises;
const got = require("got");
const TOKEN = "YOUR TWITTER TOKEN";
const URL = "https://api.twitter.com/1.1/favorites/list.json?screen_name={{YOUR TWITTER NAME}}&count=200";

let i = 0;
async function get(id){
	let thisUrl = URL;
	if( id !== undefined ){
		thisUrl += "&max_id=" + id;
	}

	let request = await got(thisUrl, { json: true, headers: { authorization: "Bearer " + TOKEN}})
	.then( ({body}) => body );
	console.log("Got page: " + id, i);

	await fs.writeFile("./data/" + i + ".json", JSON.stringify(request,null,2));
	console.log("Wrote page: " + id, i);
	let nextId = Math.min( ...request.map( i => i.id ) );
	if( nextId != Infinity ){
		i++;
		await get(nextId);
	}
}

get();
