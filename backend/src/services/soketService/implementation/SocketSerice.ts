
import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import ISocketService from "../interface/ISocketService";
import { INotiData } from "../../../repositories/notification/implementation/notificationRepository";
import { IOrderResForStaffDto } from "../../../dtos/order/orderResforstaffDto";

export default class SocketService implements ISocketService {
    private io: Server | null = null;

    public initSocket(httpServer: HttpServer): void {
        this.io = new Server(httpServer, {
            cors: {
                origin: true,
                credentials: true,
            },
        });

        this.io.on("connection", (socket: Socket) => {
            console.log(`Client Connected: ${socket.id}`);

            socket.on("joinHotelRoom", ({ hotelId }) => {
                const room = `hotel:${hotelId}`;
                socket.join(room);
                console.log(`Staff joined room: ${room}`);
            });

            socket.on("joinUserRoom", ({ userId }) => {
                const room = `user:${userId}`;
                socket.join(room);
                console.log(`User joined room: ${room}`);
            });
            socket.on("leaveHotelRoom", ({ hotelId }) => {
                socket.leave(`hotel:${hotelId}`);
                console.log(`Staff left hotel room: hotel:${hotelId}`);
            });

            socket.on("disconnect", () => {
                console.log(`Client Disconnected: ${socket.id}`);
            });
        });
    }

    private getIO(): Server {
        if (!this.io) {
            throw new Error("Socket.IO not initialized!");
        }
        return this.io;
    }

  //user function

    public sendNotificationToUser(userId: string, data:INotiData): void {
        const io = this.getIO();
        io.to(`user:${userId}`).emit("userNotification", {
            type: "NOTIFICATION",
            data,
            timestamp: new Date()
        });
    }

    public updateCardItemForUser(hotelId: string, orderId:string,
        data:{_id: string, status:string}): void {
        const io = this.getIO();

        io.to(`hotel:${hotelId}`).emit(`updateOrderCardUser${orderId}`, {
            type: "CARD_UPDATE",
            data,
            timestamp: new Date()
        });
    }


    public sendNotificationToChef(hotelId: string, data:INotiData): void {
        const io = this.getIO();
        io.to(`hotel:${hotelId}`).emit("chefNotification", {
            type: "NOTIFICATION",
            data,
            timestamp: new Date()
        });
    }
    public sendNotificationToWaiter(hotelId: string, data:INotiData): void {

        const io = this.getIO();
        io.to(`hotel:${hotelId}`).emit("waiterNotification", {
            type: "NOTIFICATION",
            data,
            timestamp: new Date()
        });
    }

    public updateCardForWaiter(hotelId: string, cardData: IOrderResForStaffDto[]): void {
        const io = this.io ? this.getIO() : null; // secure check
        if (io) {
            io.to(`hotel:${hotelId}`).emit('updateCardForWaiter', {
                type: "CARD_UPDATE",
                data: cardData,
                timestamp: new Date()
            });
        }
    }
    public updateCardForChef(hotelId: string, cardData: IOrderResForStaffDto): void {
        const io = this.io ? this.getIO() : null; // secure check
        if (io) {
            io.to(`hotel:${hotelId}`).emit('updateCardForChef', {
                type: "CARD_UPDATE",
                data: cardData,
                timestamp: new Date()
            });
        }
    }
}


