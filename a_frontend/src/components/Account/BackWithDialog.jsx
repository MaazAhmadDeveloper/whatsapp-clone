import React, { createContext, useContext } from "react";
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import LoginDialog from "./LoginDialog";
import { AccountContext } from "../context/AccountProvider";
import ChatDialog from "../chat/ChatDialog"

const Component = styled(Box)`
height:100vh;
width:100%;
background-color: rgb(240,242,245);
`

const LogingHeader = styled(AppBar)`
height: 225px;
background-color: rgb(0,168,132);
box-shadow: none;
`
const ChatHeader = styled(AppBar)`
height: 125px;
background-color: rgb(3,167,132);
box-shadow: none;
`

const BackWithDialog = () => {

    const { account } = useContext(AccountContext)

    return <div>
        <Component >
            {account ?
                <>
                    <ChatHeader>
                        <Toolbar>

                        </Toolbar>
                    </ChatHeader>
                    <ChatDialog />
                </>
                :
                <>
                    <LogingHeader>
                        <Toolbar>

                        </Toolbar>
                    </LogingHeader>
                    <LoginDialog />
                </>
            }
        </Component>
    </div>
}

export default BackWithDialog;