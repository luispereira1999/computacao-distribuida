const http = require("http");
const app = require(".");
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port);