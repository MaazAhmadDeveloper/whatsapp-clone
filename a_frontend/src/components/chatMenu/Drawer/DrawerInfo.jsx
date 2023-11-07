import React from "react";
import {Box, Drawer, Typography, styled, } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Profile from "./Profile";

const Heading = styled(Box)`
    background-color:#008069;
    height:107px;
    color:#ffff;
    display:flex;
    & >p, & >svg {
        margin-top:auto;
        padding:15px;
        font-weight:600;
    }
`
const Bellow = styled(Box)`
    background-color:#ededed;
    height:85%;
`

const drawerStyle = {
    left:20,
    top:17,
    height:"95%",
    width:"30%",
    boxShadow:"none",
  }

const DrawerInfo = ({open , setOpen})=>{

    const closeHandle =()=>{
        setOpen(false)
    }

    return <div>
            <Drawer
      anchor={"left"}
      open={open}
      onClose={closeHandle}
      PaperProps={{ sx:drawerStyle}}
      style={{zIndex:1500}}
    >
        <Heading>
            <ArrowBack onClick={()=> setOpen(false)}/>
            <Typography>Profile</Typography>
        </Heading>
        <Bellow>
            <Profile />
        </Bellow>
    </Drawer>
    </div>
}

export default DrawerInfo;