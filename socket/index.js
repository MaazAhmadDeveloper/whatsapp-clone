import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userData, userId) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, userId });
};

const getUser = (receiverId) => {
  return users.find((user) => user.sub === receiverId);
};

io.on("connection", (socket) => {
  socket.on("adduser", (userData) => {

    addUser(userData, socket.id);
    io.emit("getUser", users);
  });

  socket.on("sendMessage", (data) => {
    const reciver = getUser(data.receiverId);
    // console.log(reciver);
    if (reciver) {
      io.to(reciver.userId).emit("getmessage", data);
    }
  });
  socket.on("userTyping", (typerData) => {

    const reciver = getUser(typerData.person.sub);
    if (reciver) {

      io.to(reciver.userId).emit("getUserTyping", {
        typer:typerData.account,
        whoseType:typerData.person
      });
    }
  });

  socket.on("disconnect", () => {

    // delete user from "users" array who disconnected
    for (let i = users.length - 1; i >= 0; i--) {
      if (users[i].userId === socket.id) {
        users.splice(i, 1);
      }
    }
    io.emit("getUser", users);
  });

});
