import { Box, InputBase, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InsertEmoticonOutlined, AttachFileOutlined, KeyboardVoiceOutlined } from '@mui/icons-material';
import { uploadMedia } from "../../service/api";

const Container = styled(Box)`
    height:55px;
    display: flex;
    background-color: #ededed;
    align-items: center;
    padding: 0 15px;
    & > *{
        margin: 5px;
        color: #919191;
    };
`
const Search = styled(Box)`
    background-color: #ffff;
    border-radius:18px;
    width: calc(94% - 100px)
`
const InputField =styled(InputBase)`
    width:100%;
    padding:20px;
    height:20px;
    padding-left:25px;
    font-size:13px;
`
const ClipIcon = styled(AttachFileOutlined)`
    transform: rotate(45deg);
`
const ChatFooter =({sendText, setMessage, message, setFile, file , setImage})=>{

    useEffect(()=>{
        const getMedia = async ()=>{
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await uploadMedia(data);
                setImage(response.data);
            }
        } 
        getMedia();
    }, [file])

const onFileChange = (e)=>{
    setFile(e.target.files[0]);
    setMessage("loading...");

    setTimeout(() => {
        setMessage(e.target.files[0].name);
    }, 6000);

};

    return <div>
        <Container>
                <InsertEmoticonOutlined />

                <label htmlFor="fileSelect">
                    <ClipIcon />
                </label>
                
                <input 
                    type="file" 
                    id="fileSelect"
                    style={{display: "none",}}
                    onChange={(e)=> onFileChange(e) }
                />
                <Search>
                    <InputField 
                        placeholder="Type a message"
                        onChange={(e)=> setMessage(e.target.value)}
                        onKeyDown={(e)=> {sendText(e)}}
                        value={message}
                    ></InputField>
                </Search>
                <KeyboardVoiceOutlined />
        </Container>
    </div>
}

export default ChatFooter;