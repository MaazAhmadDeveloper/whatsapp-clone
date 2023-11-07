import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    }
    ,receiverId:{
        type:String
    }
    ,senderId:{
        type:String
    }
    ,text:{
        type:String
    }
    ,type:{
        type:String
    }
    
},
{
    timestamps:true
}
);

const newMessage = mongoose.model("Messages" , messageSchema);

export default newMessage;