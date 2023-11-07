import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    iss:{
        type:String
    },
    azp:{
        type:String
    },
    aud:{
        type:String
    },
    sub:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    email_verified:{
        type:Boolean,
        require:true
    },
    nbf:{
        type:Number
    },
    name:{
        type:String,
        require:true
    },
    picture:{
        type:String,
        require:true
    },
    given_name:{
        type:String,
        require:true
    },
    family_name:{
        type:String,
        require:true
    },
    local:{
        type:String
    },
    iat:{
        type:Number,
    },
    exp:{
        type:Number
    },
    jti:{
        type:String
    }
});

export const Users = mongoose.model("user" , userSchema);
