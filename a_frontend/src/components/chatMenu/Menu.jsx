import React, { useState } from "react";
import MenuHeading from "./MenuHeading";
import Search from "./Search";
import Coversation from "./conversation";
import { Box } from "@mui/material";

const Menu = ()=>{

    const [text , setText] = useState("");

    return <div>
        <MenuHeading />

            <Search setText={setText} />

            <Box>
                <Coversation text={text} />
            </Box>
    </div>
}

export default Menu;