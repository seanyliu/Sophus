var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

/**
 * Load any static files based on the uri.
 * Source:
 * http://net.tutsplus.com/tutorials/javascript-ajax/..
 * learning-serverside-javascript-with-node-js/
 * With bug corrections in response methods
 */
function load_static_file(uri, response) {
  var filename = path.join(process.cwd(), "client", uri); // added "client"
  path.exists(filename, function(exists) {

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });

  });
}

var server = http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  // parse uri for interesting things.
  // e.g. if (uri === "/stream") ...
  load_static_file(uri, response);
});

server.listen(process.env.PORT || 8001);

