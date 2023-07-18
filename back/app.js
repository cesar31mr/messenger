var body_parser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 4201;
var express = require("express");

var user_routes = require("./routes/user_route");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send("Hola mundo!!!");
})

io.on("connection", function (socket) {
    console.log(`Usuario conectado ${socket}`);
});

mongoose.connect('mongodb://localhost:18085/messenger').then(res => {
    console.log('Conectado a la bd');
    app.listen(port, () => {
        console.log('Conectado al puerto', port);
    })
}).catch(err => {
    throw err;
});

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use("/api", user_routes);

module.exports = app;
