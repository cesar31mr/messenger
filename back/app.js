const body_parser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4201;
const express = require("express");
const cors = require("cors");

const user_routes = require("./routes/user_route");
const message_routes = require('./routes/message_route');

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
  });

app.use(cors());

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

// app.use((req,res,next)=>{
//     res.header('Content-Type: application/json');
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
//     next();
// });

app.use("/api", user_routes);
app.use("/api", message_routes);

module.exports = app;
