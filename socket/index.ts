import { Server } from "socket.io";

interface ActiveUser {
  userId: string;
  socketId: string;
}

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers: ActiveUser[] = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("new-user-add", (newUserId: string) => {
    // If user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("connected users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("disconnected user", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // Send message to a specific user
  socket.on("send-message", (data) => {
    const { userId } = data;
    const user = activeUsers.find((user) => user.userId === userId);
    console.log("Sending from socket to :", userId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});

