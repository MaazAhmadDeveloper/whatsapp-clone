import React from "react";
import { emptyChatImage } from "../../constants/data";
import { Box , Typography, styled , Divider} from "@mui/material";

const Component =styled(Box)`
    background-color:#f8f9fa;
    padding: 30px 0;
    text-align: center;
    height:100%;
`
const Container =styled(Box)`
    padding: px 200px;
`


const Image =styled("img")({
    width:400,
    marginTop:"100px",
})
const Title = styled(Typography)`
    font-size:32px;
    margin:25px 0px 10px 0px;
    font-weight:300;
    color:#41525d;
`
const SubTitle =styled(Typography)`
    color:#667781;
    font-size:14px;
    font-weight:400;

`
const Horizotal = styled(Divider)`
    margin:40px 0px;
    opacity:0.4;
`

const EmptyChat = ()=>{
    return <div>
        <Component>
            <Container>
                <Image src={emptyChatImage} alt="Chat Image" />
                <Title>Whatsapp Web</Title>
                <SubTitle>Now send and recieve message without keeping your phone online.</SubTitle>
                <SubTitle>Use whastapp on up to 4 linked devices and 1 phone at the same time.</SubTitle>
                <Horizotal />
            </Container>
        </Component>
    </div>
}


export default EmptyChat;