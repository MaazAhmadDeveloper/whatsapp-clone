import mongoose from "mongoose";
import dotenv from "dotenv";

// zaccyname1125

dotenv.config();
const userName = process.env.DB_USERNAME;
const password = process.env.DB_USERPASSWORD;

const URL = `mongodb+srv://${userName}:${password}@whatsapp-clone.ata9akf.mongodb.net/?retryWrites=true&w=majority`; 
// const URL = "mongodb://0.0.0.0:27017/whatsapp";
const connection = async ()=>{
    try {
        await mongoose.connect(URL, {useUnifiedTopology: true});
        console.log("Database connected successfuly");
    } catch (error) {
        console.log("error while database" , error.message);
    };
};

export default connection; 