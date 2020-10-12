const express = require('express');
const socketio=require('socket.io');
const http=require('http')

const PORT=process.env.PORT || 5000
const router = require('./router');
const app = express();
const server=http.createServer(app); //calls http.Server() internally and returns the resulting instances
const io = socketio(server)

const {addUser, removeUser, getUser, getUsersInRoom }=require('./users')

app.use(router)
server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`));


io.on("connect",(socket)=>{


    console.log("Someone's here!!!");

    
    
        socket.on('join', ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room });
            // console.log(`user room : ${user.room}`)
            if(error) return callback(error);
        
            socket.join(user.room);
        
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        
            callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user =getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name, text:message});

        callback();
    });

    socket.on('disconnect',()=>{
        console.log("User left!!");
    })
})


