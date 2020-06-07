import socketIO from "socket.io";

export const global = (io: socketIO.Server) => {
  io.on("connection", (socket: socketIO.Server) => {
    socket.on("refresh", () => {
      io.emit("refreshPage", {});
    });
  });
};
