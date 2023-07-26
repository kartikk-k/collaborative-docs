import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';



console.log("Starting wss")

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

        socket.on("join-document", delta => {
            socket.join('1')
            socket.emit("join-document", "joined document")
        })

        socket.on("send-changes", delta => {
            console.log("delta", delta)
            socket.broadcast.to('1').emit("receive-changes", delta)
        })
    })


    return io;
};


export default initSocketIO;
