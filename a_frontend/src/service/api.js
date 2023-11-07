import axios from "axios";

const URL = "http://localhost:8000";

export const addUser = async (data)=>{
    try {
        await axios.post(`${URL}/add` , data);
    } catch (error) {
        console.log("error while addUser API" , error.message);
    };
};

export const getUsers = async ()=>{
    try {
        const response = await axios.get(`${URL}/users`);
        return response.data
    } catch (error) {
        console.log("Error while getUsers call API" , error.message);
    }
}

export const setConversation = async (data)=>{
    try {
        await axios.post(`${URL}/conversation/add`, data)
    } catch (error) {
        console.log("Error while Set Conversation call API" , error.message);
    }
}

export const getConversation = async (data)=>{
    try {
        let response = await axios.post(`${URL}/conversation/get`, data);
        return response.data
    } catch (error) {
        console.log("Error while Get Conversation call API" , error.message);
    }
}

export const newMessage =  async (data )=>{
        try {
            await axios.post(`${URL}/message/add`, data)
        } catch (error) {
            console.log("Error while newMessage call API" , error.message);
        }
}

export const getMessage =  async (id )=>{
        try {
            const response = await axios.get(`${URL}/message/get/${id}`);
            return response.data;
        } catch (error) {
            console.log("Error while getMessage call API" , error.message);
        }
}

export const uploadMedia = async (data)=>{
    try {
        return await axios.post(`${URL}/media/upload`, data);        
    } catch (error) {
        console.log("Error while uploadMedia call API" , error.message);
    }
}