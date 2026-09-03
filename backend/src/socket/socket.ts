    import { Server } from "socket.io";
    import { Server as HttpServer } from "http";

    let io: Server;

    export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
        origin: true,
        credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinUserRoom", ({ userId,hotelId }) => { 
        const room = `user:${userId}:hotel${hotelId}`; 
        socket.join(room); 
        console.log(`Joined room: ${room}`); 
        }); 

        socket.on("leaveUserRoom", ({ userId,hotelId }) => { 
        const room = `user:${userId}:hotel:${hotelId}`;
        socket.leave(room); 
        console.log(`Left room: ${room}`); 
        }); 
        socket.on("joinHotelRoom", ({ hotelId }) => { 
        const room = `hotel:${hotelId}`; 
        socket.join(room); 
        console.log(`Joined room: ${room}`); 
        }); 

        socket.on("leaveHotelRoom", ({ hotelId }) => { 
        const room = `hotel:${hotelId}`;
        socket.leave(room); 
        console.log(`Left room: ${room}`); 
        }); 
        socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        });
    });

    return io;
    };

    export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
    };