const fsProm = require("fs").promises;
const data = require("./data.json");

data.map( tw => {
	tw.frontMatter = {
		date: tw.created_at,
		layout: "post",
		syndicateUrl: ["https://twitter.com/pudymody/status/" + tw.id_str],
		media: tw.media || []
	}

	tw.frontMatter.media = tw.frontMatter.media.map(url => "/static/stream/" + url.substr( url.lastIndexOf("/") + 1 ));

	return tw;
}).map( tw => {
	if( tw.retweeted ){
		tw.frontMatter.authorName = tw.user.name;
		tw.frontMatter.authorUrl = "https://twitter.com/" + tw.user.screen_name;
		tw.frontMatter.originalPost = "https://twitter.com/"+ tw.user.screen_name +"/status/" + tw.retweeted_status_id_str;
	}

	return tw;
})
.map( tw => {
	if( tw.in_reply_to_status_id_str ){
		tw.frontMatter.inReplyTo = "https://twitter.com/" + tw.in_reply_to_screen_name + "/status/" + tw.in_reply_to_status_id_str;
	}

	return tw;
}).forEach(async function(item){
	let name = item.id_str + ".md";
	if( item.retweeted ){
		name = "rt_" + name;
	}

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
	content += item.full_text;

	await fsProm.writeFile(name, content );
})