const http = require("http");
const url = require("url");
const path = require("path");
const PORT = Number(process.argv[2]) || 8000;

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const timeconvert = val => {
	val = val.replace(/\//g, " ").trim();
	let result = null;
	if(/^[0-9]+$/.test(val)){
		let natural = null;
		let d = new Date(val);
		let date = month[d.getMonth] + " " + d.getDate() + ", " + d.getFullYear();
		result = JSON.stringify({
			"unix": val,
			"natural": date
		});
	}else if(/^[a-zA-Z]+\s[0-9]{2},\s[0-9]{4}$/g.test(val)){
		let unix = null;
		let parsed = Date.parse(val);
		if(isNaN(parsed)){
			result = null;
		}else{
			result = JSON.stringify({
				"unix": parsed,
				"natural": val
			});
		}
	}else{
		console.log(`Parse error: ${val}`);
	}
	return result;
}

const server = http.createServer((req, res) => {
	if(req.method === "GET"){
			let result = timeconvert(decodeURIComponent(req.url));
			if(result){
				res.write(result);
			}else{
				res.writeHead(400);
			}
		res.end();
	}else{
		res.write("Please use GET");
		res.end();
	}
});

server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
});
