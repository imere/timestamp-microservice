const http = require("http");
const url = require("url");
const path = require("path");
const PORT = Number(process.argv[2]) || process.env.PORT;
const timeconvert = require("./timeconvert");

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
