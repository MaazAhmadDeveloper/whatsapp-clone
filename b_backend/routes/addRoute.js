import express  from "express";
import {addUser , getUsers} from "../controller/userController.js";
import { newConversation, getConversation} from "../controller/conversation.js"; 
import { newMessage, getMessage} from "../controller/newMessage.js"
import { uploadMedia, getMedia } from "../controller/media.js"
import upload from "../utiles/upload.js"

const route = express.Router();

route.post("/add" , addUser);
route.get("/users" , getUsers);

route.post("/conversation/add" , newConversation);
route.post("/conversation/get" , getConversation);

route.post("/message/add" , newMessage);
route.get("/message/get/:id" , getMessage);

route.post("/media/upload" , upload.single("file") , uploadMedia);
route.get("/file/:filename" , getMedia);

export default route; 