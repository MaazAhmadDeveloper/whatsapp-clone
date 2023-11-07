import { Dialog, styled, Box } from "@mui/material";
import React , {useContext} from "react";
import Menu from "../chatMenu/Menu";
import EmptyChat from "../chatEmpty/EmptyChat";
import ChatBox from "../chatEmpty/MainChatBox";
import { AccountContext } from "../context/AccountProvider";

const Component = styled(Box)`
    display:flex;
`
const LeftComponent = styled(Box)`
    width:450px;
`
const RightComponent = styled(Box)`
    width:75%;
    height: 50%;
`

const dialogStyle = {
    width: '100%',
    maxWidth: "96%",
    height: "96%",
    maxHight: "100%",
    boxShadow: "none",
    borderRadius: "none"
}

const ChatDialog = () => {

    const {person} = useContext(AccountContext);

    return <Dialog open={true}
        PaperProps={{ sx: dialogStyle }}
        hideBackdrop={true}
    >
        <Component>

            <LeftComponent>
                    <Menu />
            </LeftComponent>

            <RightComponent>
                {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
                    
            </RightComponent>

        </Component>

    </Dialog>
}

export default ChatDialog;