import express, { Express, Request, Response } from 'express';
import { createServer, Server as HttpServer } from 'http';
require('dotenv').config()
// import initSocketIO from './config/socket';
import { Server } from 'socket.io';
import initSocketIO from './config/socket';


const app: Express = express();
const server: HttpServer = createServer(app);


/* The line `const PORT = process.env.PORT || 8080;` is setting the value of the `PORT` constant. It is
using the `process.env.PORT` environment variable if it exists, otherwise it defaults to `8080`. */
const PORT = process.env.PORT || 8080;


// Initialize Socket.IO and pass the HTTP server object to it
const io = initSocketIO(server);


app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
})


// const io: Server = require("socket.io")(server, {
//     cors: {
//         origin: '*',
//     }
// })

// Socket.IO event handling
// const documentNamespace = io.of("/document");


// io.of("/document").on("connection", (socket) => {


//     // joining room with roomId
//     socket.on("document", (fileId: string) => {
//         socket.join('1');
//         console.log(`Socket ${socket.id} connected for file-id:  ${fileId}`);
//     });

//     // receives document changes from client
//     socket.on("document_changes", (payload: {
//         id: string,
//         content: []
//     }) => {
//         console.log("chnages received: ", payload)

//         io.of('/document').to('1').emit('document_changes', payload)
//         // documentNamespace.to('1').emit("document_changes", payload); // Sending the message back to the room
//     })

//     socket.on("disconnect", (socket) => {
//         console.log("user disconnected")
//     })
// })



/* `server.listen(PORT, () => { console.log(`Server listening on port `); });` is starting the
server and listening for incoming requests on the specified port. When the server starts
successfully, it will log a message to the console indicating that it is listening on the specified
port. */
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
