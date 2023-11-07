import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv";

dotenv.config();
const userName = process.env.DB_USERNAME;
const password = process.env.DB_USERPASSWORD;


const storage = new GridFsStorage({
    url:"mongodb+srv://"+userName+":"+password+"@whatsapp-clone.ata9akf.mongodb.net/?retryWrites=true&w=majority",
    options:{useUnifiedTopology: true, useNewUrlParser: true},
    file: (request , file)=>{
        const match = ["image/png" , "image/jpg"];

        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-file-${file.originalname}`
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
})


export default multer({ storage });