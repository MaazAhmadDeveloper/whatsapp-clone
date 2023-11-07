import React, {useContext, useEffect, useState} from "react";
import { Box, Typography, styled } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import { setConversation , getConversation} from "../../service/api";
import { TimeFormate } from "../../commeon_Utils/commonUtil";

const Component = styled(Box)`
    display: flex;
    height: 45px;
    padding: 13px 0px;
    cursor : pointer;
`
const Image = styled("img")({
    width:50,
    height:50,
    borderRadius:"50%",
    padding:"0px 14px"
})

const Name = styled(Typography)`
    margin-top:10px;
`
const Container = styled(Box)`
    display:flex;
`
const Timestamp = styled(Typography)`
    font-size:12px;
    margin-left:auto;
    color:#00000099;
    margin-right:20px;
`
const Text =styled(Typography)`
    font-size:14px;
    color:rgbs(0, 0, 0, 0.6);
    margin-right:20px;
`

const ConversationList = ({ user }) => {

    const [message , setMessage] = useState({});
    
    const {setPerson, account, messageFlag } = useContext(AccountContext);
    const clickHandle = async ()=>{
        setPerson(user)
        await setConversation({senderId: account.sub , recieverId: user.sub })
    }
    useEffect(()=>{
        const getConversationDetail = async ()=>{
            const response = await getConversation({senderId : account.sub , recieverId : user.sub }) ;
            setMessage({text: response?.message , timeStamp: response?.updatedAt});
        }
        getConversationDetail();
    },[messageFlag]);


    return <div>
        <Component onClick={ ()=>{
            clickHandle()
        }}>
            <Box>
                <Image src={user.picture} alt="Menu dps" />
            </Box>
            <Box style={{width:"100%"}} >
                <Container>
                    <Name>{user.name}</Name>
                    {
                        message?.text && 
                        <Timestamp>{TimeFormate(message?.timeStamp)}</Timestamp>
                    }
                </Container>
                <Text>
                    {message?.text?.includes("localhost") ? "media" : message.text }
                </Text>
            </Box>
        </Component>
    </div>
}

export default ConversationList;