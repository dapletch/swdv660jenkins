const http = require("http");
const https = require("https");

http.createServer(function (request, response) {

    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    let data = '';
    let options = {
        headers: {'Accept': 'application/json'}
    }

    // make API request to Dad Jokes API: https://icanhazdadjoke.com/api
    // more specifically the following endpoint:
    // curl -H "Accept: application/json" https://icanhazdadjoke.com/
    https.get('https://icanhazdadjoke.com/', options, (resp) => {

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let dadJoke = JSON.parse(data)['joke'];
            console.log(dadJoke);
            // Send the response body as "Hello World"
            response.end(dadJoke);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}).listen(3000);

// Console will print the message
console.log('Server running');
