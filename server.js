var http = require('http'), 
    fs = require('fs'), 
    port = 8080;

var listingData, server;

var serverConnectHandler = function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
}

var requestHandler = function(request, response) {
  console.log(request);
  if (request.method === "GET" && request.url === "/listings") {
      response.setHeader("Content-Type","application/json")
      response.end(JSON.stringify(listingData))
  } else {
      response.writeHead(404)
      response.end("<h1> Bad Gateway Error </h1>" + "Path does not exist: " + request.url)
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err != null) {
        throw(err)
    }
    listingData = JSON.parse(data)

    server = http.createServer(requestHandler);
    server.listen(port, serverConnectHandler);
});
