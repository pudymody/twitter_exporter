const fsProm = require("fs").promises;
const data = require("./data/FINAL.json");

data.map( tw => {
	tw.frontMatter = {
		date: tw.created_at,
		layout: "like",
		authorName: tw.user.name,
		authorUrl: "https://twitter.com/" + tw.user.screen_name,
		originalPost: "https://twitter.com/"+ tw.user.screen_name +"/status/" + tw.id_str,
	}

	return tw;
})
.map( tw => {
	if( tw.in_reply_to_status_id_str ){
		tw.frontMatter.inReplyTo = "https://twitter.com/" + tw.in_reply_to_screen_name + "/status/" + tw.in_reply_to_status_id_str;
	}

	return tw;
}).forEach(async function(item){
	let name = "./content/like_" + item.id_str + ".md";

	let content = "---\n";
	for( let entry in item.frontMatter ){
		content += entry + ": ";
		if( Array.isArray(item.frontMatter[entry]) ){
			content += JSON.stringify(item.frontMatter[entry] );
		}else{
			content += "\""+item.frontMatter[entry]+"\"";
		}

		content += "\n";
	}
	content += "---\n";

	await fsProm.writeFile(name, content );
})