import { Box, InputBase, styled } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import ChatFooter from "./ChatFooter";
import Message from "./Message";
import { AccountContext } from "../context/AccountProvider";
import { newMessage , getMessage } from "../../service/api";

const Wrapper = styled(Box)`
    background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
    background-size:50%;
`
const Component = styled(Box)`
    height:73vh;
    overflow-y: scroll;
`
const Container = styled(Box)`
    padding: 1px 80px
`

const ChatBody = ({person, conversation})=>{

        const [ image , setImage ] = useState();
        const [messageFromDb , setMessageFromDb] = useState([]);   
        const [file , setFile]  = useState(""); 
        const [socketMessage , setSocketMessage] = useState(null);

        const { account , socket, setMessageFlag, messageFlag, setMessage, message } = useContext(AccountContext);

    useEffect(()=>{
        socket.current.on("getmessage" , data=> {
            setSocketMessage( {
                    ...data , 
                    createdAt : Date.now()
                } );
        })
    },[]);
    
    useEffect(()=>{
        socketMessage && conversation?.members?.includes(socketMessage.senderId)&&
        setMessageFromDb(prev => [...prev , socketMessage])
    },[socketMessage , conversation])

    useEffect(()=>{
        const getUserDetail = async()=>{
            const response = await getMessage(conversation._id);
            setMessageFromDb(response);
        }
        conversation._id && getUserDetail()
    },[person._id, conversation._id, messageFlag])

    const sendText = async (e)=>{
        const keyboardKeys = e.which;
        if (keyboardKeys === 13 && message !== "" && message !== "loading..." ) {

            let messageObject = {};
            if (!image) {
                messageObject = {
                    receiverId: person.sub ,
                    senderId: account.sub,
                    conversationId :conversation._id,
                    type:"text",
                    text:message,
                }
            }else{
                messageObject = {
                    receiverId: person.sub ,
                    senderId: account.sub,
                    conversationId :conversation._id,
                    type:"file",
                    text:image,
                }
            }

            setMessage("");
            socket.current.emit("sendMessage" , messageObject)

            await newMessage(messageObject);
  
            setImage("");
            setFile("");
            setMessageFlag(prev => !prev)
        } 
          
    }

    const scrollRef = useRef();
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transition:"smooth"});
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    }, [message])

    return <div>
        <Wrapper>
            <Component ref={scrollRef}>
            {
                messageFromDb.map( objectFormDB =>{
                return <Container>
                    <Message 
                        message={objectFormDB}
                        scrollRef={scrollRef}
                        />
                </Container>
                })
            }
            </Component>
            <ChatFooter 
                sendText={sendText}
                message={message}
                setMessage={setMessage}
                file={file}
                setFile={setFile}   
                setImage={setImage}         
            /> 

        </Wrapper>
    </div>
}

export default ChatBody;