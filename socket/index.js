import { Server } from "socket.io"

const io = new Server(9000 , {
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = [];
// setInterval(() => {
//     users = [];
// }, 60000);

const addUser = (userData , userId)=>{
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData , userId})
}

const getUser = (receiverId)=>{
    return users.find( user => user.sub === receiverId);
}

io.on("connection" , (socket)=>{

    console.log("user Connected");

    socket.on("adduser" , userData =>{
        
        addUser(userData , socket.id)
        io.emit("getUser" , users)
    });
    socket.on("sendMessage" , data =>{

        const reciver = getUser(data.receiverId)
        // console.log(reciver);
        if (reciver) {
            io.to(reciver.userId).emit("getmessage" , data)
        }
    })
})