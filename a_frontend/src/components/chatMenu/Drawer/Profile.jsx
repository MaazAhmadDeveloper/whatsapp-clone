import React, { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { Box ,styled,Typography } from "@mui/material";

const ImageContainr = styled(Box)`
    display:flex;
    justify-content:center;    
`
const Image = styled("img")({
    width:200,
    height:200,
    borderRadius:"50%",
})
const Wrapper = styled(Box)`
    background-color:#ffff;
    padding:12px 30px 2px;
    box-shadow:0px 1px 3px rgba(0, 0, 0, 0.08);
    & :first-child {
        font-size:13px;
        color:#009688;
        font-weight:200;
    }
`
const DescriptionContainer = styled(Box)`
    padding:15px 20px 28px 30px;
    & > p{
        font-size:13px;
        color:#8696a0
    }
`

const Profile= ()=>{

    const {account} = useContext(AccountContext);

    return <div>
        <ImageContainr>
            <Image src={account.picture} />
        </ImageContainr>
        <Wrapper>
            <Typography>Your Name</Typography>
            <Typography>{account.name}</Typography>
        </Wrapper>
        <DescriptionContainer>
            <Typography>
                This is not your username or Pin. This name will be visible to your whatsapp contacts.
            </Typography>
        </DescriptionContainer>
        <Wrapper>
            <Typography>About</Typography>
            <Typography>Hey there! I am using Whatsapp.</Typography>
        </Wrapper>
    </div>
}


export default Profile;