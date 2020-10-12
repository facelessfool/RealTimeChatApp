const express = require('express');
const socketio=require('socket.io');
const http=require('http')

const PORT=process.env.PORT || 5000
const router = require('./router');
const app = express();
const server=http.createServer(app); //calls http.Server() internally and returns the resulting instances
const io = socketio(server)

app.use(router)
server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`));


io.on("connection",(socket)=>{
    console.log("Someone's here!!!");
    socket.on('disconnect',()=>{
        console.log("User left!!");
    })
})


