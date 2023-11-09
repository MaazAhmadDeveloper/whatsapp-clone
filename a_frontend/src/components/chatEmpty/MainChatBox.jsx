import React, { useContext, useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { Box } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import { getConversation } from "../../service/api.js";

const ChatBox = () => {
  const { person, account, socket , message} = useContext(AccountContext);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetail = async () => {
      let response = await getConversation({
        senderId: person.sub,
        recieverId: account.sub,
      });
      setConversation(response);

    };
    getConversationDetail();
  }, [person.sub]);

  return (
    <div>
      <Box
        style={{
          height: "75%",
        }}
      >
        <ChatHeader />

        <ChatBody person={person} conversation={conversation} />
      </Box>
    </div>
  );
};

export default ChatBox;
