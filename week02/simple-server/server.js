const http = require("http");
//const url = require("url");

const server =
    http.createServer((req, res) => {
        console.log(req.url);
        console.log(req.method);

        if (req.url === "/health" && req.method === "GET") {
            res.write("<html>");
            res.write("<b>I am OK!</b>");
            res.write("</html>");
        }

        if (req.url === "/health" && req.method === "POST") {
            res.write("<html>");
            res.write("<b>This is a POST method</b>");
            res.write("</html>");
        }

        return res.end();
    });

server.listen(3000);

