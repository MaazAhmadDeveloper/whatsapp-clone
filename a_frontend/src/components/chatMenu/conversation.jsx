import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../service/api";
import { Box, styled, Divider } from "@mui/material";
import ConversationList from "./conversationList";
import { AccountContext } from "../context/AccountProvider";

const Component = styled(Box)`
    height:69vh;
    overflow: scroll;
`
const Line = styled(Divider)`
    margin: 0 0 0 70px;
    background-color:#e9edef;
    opacity:0.6;
`
const Coversation = ({ text }) => {

    const { account, person , socket , setActiveUsers} = useContext(AccountContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await getUsers();
            const filteredResponse = response.filter(element => {
                return element.name.toLowerCase().includes(text.toLowerCase());
            })
            setUsers(filteredResponse);
        }
        fetchData();
    }, [text])

    useEffect(()=>{
        socket.current.emit("adduser" , account);

        socket.current.on("getUser" , users => {
            setActiveUsers(users)
        })

    }, [account])

    return <div>
        <Component>
            {
                users.map(objectValue => {
                    return objectValue.sub !== account.sub &&
                        <>
                            <ConversationList user={objectValue} />
                            <Line />
                        </>
                })
            }
        </Component>
    </div>
}

export default Coversation;