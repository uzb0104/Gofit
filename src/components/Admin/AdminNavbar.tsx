import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Stack,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import Sidebar from "./Sidebar";

const AdminNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#fff",
          height: 50,
          borderBottom: "1px solid  #3516c0",
          zIndex: 1,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SportsMartialArtsIcon
              fontSize="medium"
              sx={{ color: "#3516c0", mb: 1.5 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#3516c0", mb: 1.5 }}
            >
              Gofit
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography sx={{ fontSize: "20px", color: "#3516c0", mb: 2 }}>
              Sport zal menejeri
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Admin"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "#3516c0",
                  mb: 1.5,
                  mr: 5,
                }}
              />
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <LogoutIcon sx={{ mr: 1 }} /> Chiqish
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default AdminNavbar;
