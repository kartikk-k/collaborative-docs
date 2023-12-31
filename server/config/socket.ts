import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';


// Initialize Socket.IO with the HTTP server
const initSocketIO = (server: HttpServer): Server => {

    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    // Socket.IO event handling
    io.on("connection", socket => {
        console.log("new user connected", socket.id)

        socket.on("join-document", payload => {
            socket.join('1')
            socket.emit("join-document", "joined document")
        })

        socket.on("send-changes", payload => {
            console.log("delta", payload)
            socket.broadcast.to('1').emit("receive-changes", payload)
        })
    })


    return io;
};


export default initSocketIO;
