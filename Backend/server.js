const express = require("express");
const http = require("http");
const cors = require("cors");
const { socket_connection } = require("./socket");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

// create http server
const server = http.createServer(app);
socket_connection(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
