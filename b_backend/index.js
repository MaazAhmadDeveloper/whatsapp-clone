import express from "express";
import dbConnection from "./database/db.js"
import route from "./routes/addRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

dbConnection();

app.use("/" , route)







app.listen(PORT,()=>{
    console.log("Server is running on port " +PORT);
})