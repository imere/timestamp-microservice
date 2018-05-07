const http = require("http")
const url = require("url")
const fs = require("fs")
const net = require("net")
const map = require("through2-map")
const port = Number(process.argv[2])
try{
	if(isNaN(port)){
		throw new Error("Error: Port error\n")
	}
	const server = http.createServer((request, response) => {
		if(request.method === "GET"){
			let tp = url.parse(request.url, true)
			let date = new Date(Date.parse(tp.query.iso))
			let rt = null
			if(/^\/api\/parsetime/.test(tp.path)){
				rt = JSON.stringify({
					"hour": date.getHours(),
					"minute": date.getMinutes(),
					"second": date.getSeconds(),
				})
			}else if(/^\/api\/unixtime/.test(tp.path)){
				rt = JSON.stringify({
					"unixtime": Date.parse(tp.query.iso)
				})
			}
			if(rt){
				response.writeHead(200, {"Content-Type": "application/json"})
				response.write(rt)
				response.end()
			}else{
				response.writeHead(404)
				response.end()
			}
		}
	})
	server.listen(port)
}catch(e){
	console.error(e.message)
}
