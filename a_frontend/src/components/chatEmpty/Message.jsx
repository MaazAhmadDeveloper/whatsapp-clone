import { Box, styled, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { TimeFormate } from "../../commeon_Utils/commonUtil";
import { AccountContext } from "../context/AccountProvider";
import GetAppIcon from '@mui/icons-material/GetApp';
import { iconPDF } from "../../constants/data"
import { downloadMedia } from "../../commeon_Utils/commonUtil";

const Own = styled(Box)`
    background-color:#dcf8c6;
    max-width:60%;
    margin-left:auto;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:10px;
    word-break:break-word;
`

const Wrapper = styled(Box)`
    background-color:#FFFFFF;
    max-width:60%;
    padding:5px;
    width:fit-content;
    display:flex;
    border-radius:10px;
    word-break:break-word;
`
const Text = styled(Typography)`
    font-size: 14px;
    padding: 0px 25px 0px 5px;
`

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top:6px;
    word-break:keep-all;
    margin-top:auto;
`

const Message = ({ message, scrollRef }) => {

    const { account } = useContext(AccountContext);

    useEffect(()=>{
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    }, [message])

    return <div>
        {
            account.sub === message.senderId ?
                <Own>
                    {
                        message.type === "file" ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
                :
                <Wrapper>
                    {
                        message.type === "file" ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>

        }
    </div>
}

const ImageMessage = ({ message }) => { 

    return <Box style={{ position: "relative" }}>
        {
            message?.text.includes(".pdf") ?
                <Box style={{ display: "flex" }}>
                    <img src={iconPDF} alt="PDF" style={{ width: 80 }} />
                    <Typography style={{ fontSize: 14 }}>{message.text.split("/").pop()}</Typography>
                </Box>
                :
                <img style={{ width: 300, height: "100%", objectFit: "cover" }} src={message.text} alt={message.text} />
        }
        <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
            <GetAppIcon 
                onClick={(e)=>{
                    downloadMedia(e, message.text)
                }}
                style={{ marginRight: 10, border: "1px solid grey", borderRadius: "50%" }} />
            {TimeFormate(message.createdAt)}</Time>
    </Box>
}
const TextMessage = ({ message }) => {

    return <>
        <Text>{message.text}</Text>
        <Time>{TimeFormate(message.createdAt)}</Time>
    </>
}

export default Message;