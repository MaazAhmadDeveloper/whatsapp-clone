import Messagedb from "../database/model/message.js";
import { conversationdb } from "../database/model/setConversation.js";


export const newMessage = async (req , res)=>{

    try {
        const message = new Messagedb(req.body);
        await message.save(); 
        await conversationdb.findByIdAndUpdate(req.body.conversationId, {message:req.body.text})

        return res.status(200).json("Message has send successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

export const getMessage = async (req, res)=>{
    try {
        const message = await Messagedb.find({conversationId: req.params.id});
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}