import React ,{createContext , useContext, useState} from "react";
import { Dialog, List, Box, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import {AccountContext} from "../context/AccountProvider"; 
import { addUser } from "../../service/api.js"

const Component = styled(Box)`
    display: flex;
`
const Container = styled(Box)`
    padding :56px 0 56px 56px;
`
const QRcode = styled(`img`)({
    width: 264,
    height: 264,
    margin: "50px 0px 0px 30px",
})

const Heading = styled(`h2`)({
    fontSize: "26px",
    color: "#525252",
    fontWeight: "200",
    fontFamily: "inherit",
    lineHeight: "normal",
    marginBottom: 25
})

const ListStyling = styled(List)`
    & > li {
        padding:0;
        margin-top:10px;
        line-height:28px;
        font-size:18px;
        color:#4a4a4a;
    }
`

const dialogStyle = {
    width: '60%',
    height: "96%",
    marginTop: "12%",
    maxWidth: "100%",
    maxHight: "100%",
    boxShadow: "none"
}

const Dialogs = () => {

    const {setAccount, socket} = useContext(AccountContext) 

    const loginSuccess = async (res) => {
        const decodedData = jwt_decode(res.credential);
        setAccount(decodedData);
        await addUser(decodedData);
        // socket.current.emit("adduser", decodedData);
    }
    const loginError = (res) => {
        console.log("Login Failed" , res);
    }


    return <div>
        <Dialog open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
        >
            <Component>
                <Container>
                    <Heading>Use WhatsApp on your computer</Heading>
                    <ListStyling>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Or Setting and Select Linked Devices</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the QR code</ListItem>
                    </ListStyling>
                </Container>
                <Box>
                    <QRcode src={qrCodeImage} alt="" />
                    <Box 
                        style={{ position:"relative" , bottom:"40%" , left:"11%" , width:"256px"}}
                    >
                        <GoogleLogin
                            onSuccess={loginSuccess}
                            onError={loginError}
                        />
                    </Box>
                </Box>

            </Component>
        </Dialog>
    </div>
}

export default Dialogs;