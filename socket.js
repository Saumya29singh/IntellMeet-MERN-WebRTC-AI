const socketIO = require("socket.io");

const initializeSocket = (server) => {

    const io = socketIO(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log("User Connected");

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });

    });

};

module.exports = initializeSocket;
