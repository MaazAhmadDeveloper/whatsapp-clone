import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, colors, styled } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import { AccountContext } from "../context/AccountProvider";
import { defaultProfilePicture } from "../../constants/data.js";

const Header = styled(Box)`
  height: 44px;
  background-color: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;
const Image = styled("img")({
  borderRadius: "50%",
  height: 40,
  width: 40,
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;
const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;
const Icons = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;
  }
`;

const ChatHeader = () => {
  const [typerData, setTyper] = useState();
  const [typerFlag, setTyperFlag] = useState(false);
  const { activeUsers, message, account, socket, person } = useContext(AccountContext);

useEffect(() => {
    if (message !== "") {
        socket.current.emit("userTyping", {
            account:account,
            person:person
        });
}
}, [message]);

useEffect(()=>{

    socket.current.on("getUserTyping", (data) => {
        setTyper(data);
    });
},[socket]) 

useEffect(() => {
    setTyperFlag(true);
  
    // Clear existing timeout if it exists
    const timeoutId = setTimeout(() => {
      setTyperFlag(false);
    }, 5000);
  
    // Cleanup the existing timeout when the effect is re-run (typerData changes)
    return () => {
      clearTimeout(timeoutId);
    };
}, [typerData]);

 
return (
    <div>
      <Header>
        <Image src={person.picture} alt="dp" /> 

        <Box>
          <Name>{person.name}</Name> 
          <Status>
            {activeUsers?.find((user) => user.sub === person.sub)? typerFlag && typerData?.whoseType.sub === account.sub && typerData.typer.sub === person.sub ? <Typing /> : "Online" : "Offline"}
            </Status>
        </Box>

        <Icons>
          <Search />
          <MoreVert />
        </Icons>
      </Header>
    </div>
  );
};


const Typing = ()=>{
    return <p style={{color:"green", margin : 0, }}> typing... </p>
}

export default ChatHeader;


