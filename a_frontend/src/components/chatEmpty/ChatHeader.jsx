import React ,{useContext, useEffect, useState} from "react";
import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert } from '@mui/icons-material';
import { AccountContext } from "../context/AccountProvider";
import { defaultProfilePicture } from "../../constants/data.js"


const Header = styled(Box)`
    height:44px;
    background-color: #ededed;
    padding: 8px 16px;
    display:flex;
    align-items: center;
`
const Image = styled("img")({
    borderRadius:"50%",
    height:40,
    width:40
});

const Name = styled(Typography)`
    margin-left: 12px !important;
`
const Status = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6)
`
const Icons = styled(Box)`
    margin-left: auto;
    & > svg{
        padding: 8px;
        font-size: 24px;
        color: #000;
    }
`

const ChatHeader = ({person})=>{

    const { account , socket , activeUsers} = useContext(AccountContext);


    return <div>
        <Header>
                <Image src={person.picture} alt="dp" />

            <Box>
            <Name>{person.name}</Name>
            <Status> { activeUsers?.find((user) => user.sub === person.sub) ? "Online" : "Offline" } </Status>
            </Box>

            <Icons>
                <Search />
                <MoreVert />
            </Icons>

        </Header>

    </div>
}

export default ChatHeader;