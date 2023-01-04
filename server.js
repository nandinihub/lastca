const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
var array = [];


app.use("/form.css", express.static(__dirname + "/form.css"));
app.use("/chatApp.css", express.static(__dirname + "/chatApp.css"));

// app.get("/chatbox", (req, res) => {
//     res.sendFile("chatbox.html", { root: __dirname });
// });

app.get("/", (req, res) => {
    res.sendFile("registration.html", { root: __dirname })
});

app.post("/chatbox", (req, res) => {
    // console.log(req.body);
    const jsonData = JSON.parse(JSON.stringify(req.body));
    const name = jsonData.name;
    console.log(name);
    io.on("connection", (socket) => {
        let socketId = socket.id;
        console.log(socketId);
        socket.emit("name", name, socketId);
    })
    // res.redirect("/chatbox");
    res.sendFile("chatbox.html", { root: __dirname });
});


io.on('connection', (socket) => {
    var count = console.count();

    // socket.emit("usersCount" , count);

    socket.emit("message", array);

    socket.on("sendmessage", (msgValue, roomValue) => {
        if (roomValue === "") {
            socket.broadcast.emit("recieveMessage", msgValue, () => {
                array.push(msgValue);
                console.log(array);
            })
        }
        else {
            socket.to(roomValue).emit("recieveMessage", msgValue)
        }
    })



    socket.on("sendfile", (fileValue, roomValue) => {
        if (roomValue === "") {
            socket.broadcast.emit("recieveFile", fileValue, () => {
                array.push(fileValue);
                console.log(array);
            })
        }
        else {
            socket.to(roomValue).emit("recieveFile", fileValue)
        }
    })
});


http.listen(2000, () => {
    console.log("Server is listening at " + 3000);
});

