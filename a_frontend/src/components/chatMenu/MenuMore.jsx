import React, { useState } from "react";
import { MoreVert as More } from "@mui/icons-material";
import { Menu, MenuItem , styled} from "@mui/material";

const MenuOption = styled(MenuItem)`
    color:#4A4A4A;
    padding:15px 60px 5px 24px;
    font-size:14px;
`
const MenuMore = ({drawerOpen}) => {

    const [open, setOpen] = useState(null);
    const boleanOpen = Boolean(open);

    const handleClose = () => {
        setOpen(null);
        drawerOpen(true);
    };
    const handleClick = (e) => {
        setOpen(e.currentTarget)
    }


    return <div>
        <More onClick={handleClick} />
        <Menu
            anchorEl={open}
            keepMounted
            open={boleanOpen}
            onClose={handleClose}
            getContentAnchorE1={null}
            anchorOrigin={{
                vertical:"bottom",
                horizontal:"left"
            }}
            transformOrigin={{
                vertical:"top",
                horizontal:"right"
            }}
        >
            <MenuOption onClick={handleClose}>Profile</MenuOption>
        </Menu>

    </div>

}

export default MenuMore;