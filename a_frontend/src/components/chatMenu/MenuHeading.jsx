import React ,{ useContext , useState} from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import {AccountContext} from "../context/AccountProvider"
import {Chat as MessageIcon} from '@mui/icons-material';
import MenuMore from "./MenuMore";
import DrawerInfo from "./Drawer/DrawerInfo";

const HeadingComponent = styled(Box)`
    height:44px;
    background-color:rgb(239,243,245);
    padding:8px 16px;
    display:flex;
    align-items:center;
`
const WrappingComponet = styled(Box)`
    margin-left:auto;
    display :flex;
    & > *{
        margin-left:2px;
        padding:8px;
    };
    & :first-child{
        font-size:22px;
        margin-right:8px;
        margin-top:3px;
    }

`
const Image = styled("img")({
    height:40,
    width:40,
    borderRadius:"50%"
})

const MenuHeading = ()=>{

    const [openDrawer , setOpenDrawer] = useState(false);
    const {account} = useContext(AccountContext);

    const clickHandler =()=>{
        setOpenDrawer(true);
    };

    return <>
        <HeadingComponent>
            <Image src={account.picture} alt="DP" onClick={clickHandler}/>
            <WrappingComponet>
                <MessageIcon />
                <MenuMore drawerOpen={setOpenDrawer}/>
            </WrappingComponet>
        </HeadingComponent>
        <DrawerInfo 
            open={openDrawer}
            setOpen={setOpenDrawer}
        />
    </>
}

export default MenuHeading;