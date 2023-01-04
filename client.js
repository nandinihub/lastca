const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{cors : { origin: "*"}});
var socket = io();


var usersCount = document.getElementById("onlineUser");
var senderMsg  = document.getElementById("senderMessage");
var writeAMessage = document.getElementById("inputMessage");
var sendMessage = document.getElementById("btn");
var sendFile = document.getElementById("uploadFile");
var uploads = document.getElementById("uploadBtn");

// socket.on("usersCount", count =>{
//     usersCount.innerHTML += count; 
// })

socket.on("name", (name, socketId)=>{
    var item = document.createElement('ul');
    usersCount.innerHTML += name + " : " + (socketId);
    console.log(socketId);
    // senderMsg.innerHTML += name + " has joined the chat";
    // senderMsg.appendChild(item);
    usersCount.appendChild(item);
})

socket.on("message", message =>{
    var item = document.createElement('ul');
    for(let i = 0; i < message.length; i++){
        var oldMsgs = message[i].writeAMessage || message[i].sendFile;
        senderMsg.innerHTML += oldMsgs;
        senderMsg.appendChild(item);
    }    
        
    console.log(message);
})

sendMessage.addEventListener("click", e =>{
    e.preventDefault();
    socket.emit("chatMessage",{writeAMessage: writeAMessage.value});
    writeAMessage.value = "";
});

socket.on("chatMessage", data =>{
    var item = document.createElement('ul');
    senderMsg.innerHTML += data.writeAMessage;
    senderMsg.appendChild(item);
});

uploads.addEventListener("click", file =>{
    file.preventDefault();
    socket.emit("renderFile", {sendFile : sendFile.files[0].name});
    sendFile.value = "";
});

socket.on("renderFile", file =>{
    var item = document.createElement('ul');
    senderMsg.innerHTML += file.sendFile;
    senderMsg.appendChild(item);
});

























// socket.on("sendmessage", (amessage, aroom)=>{
    //     if(aroom === ""){
    //         socket.broadcast.emit("recieveMessage", amessage)
    //     }
    //     else{
    //         socket.to(aroom).emit("recieveMessage", amessage)
    //     }
    // })




   // form.addEventListener("submit", e=>{
        //     e.preventDefault();
        //     const amessage = writeAMessage.value;
        //     const aroom = roomMsg.value;
        //     if(amessage === "") return
        //     displayMessage(amessage)
        //     socket.emit("sendmessage", amessage, aroom)
        //     writeAMessage.value = "";
        // })

        // function displayMessage(amessage){
        //     const div =document.createElement("div");
        //     div.textContent =amessage;
        //     senderMsg.append(div);
        // }


        // roomButton.addEventListener("click" , ()=>{
        //     const broom =  roomMsg.value;
        // });


        // socket.on("recieveMessage", amessage =>{
        //     displayMessage(amessage);
        // })











         // sendMessage.addEventListener("click", e =>{
        //     e.preventDefault();
        //     socket.emit("chatMessage",{writeAMessage: writeAMessage.value});
        //     writeAMessage.value = "";
        // });

        // socket.on("chatMessage", data =>{
        //     var item = document.createElement('ul');
        //     senderMsg.innerHTML += data.writeAMessage;
        //     senderMsg.appendChild(item);
        // });





        // uploads.addEventListener("click", file =>{
        //     file.preventDefault();
        //     socket.emit("renderFile", {sendFile : sendFile.files[0].name});
        //     sendFile.value = "";
        // });

        // socket.on("renderFile", file =>{
        //     var item = document.createElement('ul');
        //     senderMsg.innerHTML += file.sendFile;
        //     senderMsg.appendChild(item);
        // });


         // socket.on("chatMessage", (data)=>{
    //     io.sockets.emit("chatMessage", data, ()=>{
    //         array.push(data);
    //         console.log(array);
    //     });
    // })

    // socket.on("renderFile", (file)=>{
    //     io.sockets.emit("renderFile", file , ()=>{
    //         array.push(file);
    //         console.log(array);
    //     });
    // });