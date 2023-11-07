import grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs , gridFsBucket;
const conn = mongoose.connection;

conn.once("open" , ()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db , {
        bucketName: "fs"
    });
    gfs = grid(conn.db , mongoose.mongo);
    gfs.collection("fs");
})

const url = "http://localhost:8000"

export const uploadMedia = (req, res)=>{
    if (!req.file) {
        return res.status(404).json("file not found");
    }

    const imageUrl = `${url}/file/${req.file.filename}`;

    return res.status(200).json(imageUrl);
}

export const getMedia = async (req, res)=>{

    try {
        const file = await gfs.files.findOne({ filename:req.params.filename });

        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
     return res.status(500).json(error.message);   
    }
}