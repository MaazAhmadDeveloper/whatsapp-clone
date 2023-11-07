import { Users } from "../database/model/users.js"

export const addUser = async (req , res)=>{
        try {
            let exist = await Users.findOne({sub : req.body.sub});

            if (exist) {
                return res.status(200).json({msg : "User already exists"});
            }else{
                const newUser = new Users(req.body);
                await newUser.save();
                return res.status(200).json(newUser);
            };

        } catch (error) {
            return res.status(500).json(error.message);
        }
}

export const getUsers = async (req , res)=>{
        try {
            const users = await Users.find({}); 
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error.message);
        }
}