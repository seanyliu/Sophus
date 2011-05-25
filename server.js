var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

function load_static_file(uri, response) {
	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if(!exists) {
			response.sendHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.close();
			return;
		}

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.sendHeader(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.close();
				return;
			}

			response.sendHeader(200);
			response.write(file, "binary");
			response.close();
		});
	});
}

var server = http.createServer(function(request, response) {

	response.sendHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.close();


    var uri = url.parse(request.url).pathname;
    if(uri === "/stream") {

      // http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/	

    }
    else {
    	load_static_file(uri, response);
    }
});

server.listen(process.env.PORT || 8001);

