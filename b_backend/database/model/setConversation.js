import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    message: {
        type: String
    }}
,{
    timestamps: true
});

export const conversationdb = mongoose.model("conversation" , conversationSchema);

