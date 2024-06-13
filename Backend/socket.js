const { Server } = require("socket.io");

exports.socket_connection = (http_server) => {
    let io = new Server(http_server, {
        cors: {
            origin: "*",
            methods: ["GET", "PATCH", "POST", "HEAD", "OPTIONS"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected ${socket.id}`);

        // this event is used to group join event
        socket.on("JOIN_ROOM", (payload) => {
            console.log("Room Join", payload?.id);
            socket.join(payload?.id);
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected ${socket.id}`);
        });

        // send message event
        socket.on("SEND_MESSAGE", (payload) => {
            io.to("cloudstakes").emit("MESSAGE", payload);
        });
    });
};
