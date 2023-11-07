import { response } from "express";
import { conversationdb } from "../database/model/setConversation.js"


export const newConversation = async (req , res)=>{
    const senderId = req.body.senderId;
    const recieverId = req.body.recieverId;    

    try {
        const exist = await conversationdb.findOne({members: {$all: [senderId, recieverId]}});

        if (!exist) {
    
            const newConversation = new conversationdb({
                members: [
                    senderId,
                    recieverId
                ],
            })
    
            await newConversation.save();

            return res.status(200).json("conversation seted");
        }else{
            return res.status(200).json("conversation already exist!");
        } 
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


export const getConversation = async (req, res)=>{

    const senderId = req.body.senderId;
    const recieverId = req.body.recieverId;   
    try {
        // console.log(`recieverId: ${recieverId}  ---  senderId: ${senderId}`);
        let conversation = await conversationdb.findOne({members: {$all: [senderId, recieverId]}});

        if (!conversation) {
            return res.status(200).json("Could not find conversation collection from database");
        }else{
            return res.status(200).json(conversation);
        }

        
    } catch (error) {
        return res.status(500).json(error.message);
    }
};