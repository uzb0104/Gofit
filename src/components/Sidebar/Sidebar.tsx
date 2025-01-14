import React from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Container,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import TocIcon from "@mui/icons-material/Toc";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Bosh sahifa", icon: <MenuIcon />, link: "/home" },
    { name: "Foydalanuvchilar", icon: <GroupIcon />, link: "/members" },
    { name: "Davomat", icon: <CheckCircleIcon />, link: "/attendance" },
    { name: "To'lovlar", icon: <PaymentIcon />, link: "/payment" },
    { name: "Maxsulotlar", icon: <TocIcon />, link: "/product" },
    { name: "Xarajatlar", icon: <AssuredWorkloadIcon />, link: "/services" },
    { name: "Statistika", icon: <AssessmentIcon />, link: "/gymstats" },
    { name: "Profile", icon: <AccountCircleIcon />, link: "/adminprofile" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",

        width: "240px",
        borderRight: "2px solid #3516c0",

        overflowY: "hidden",
      }}
    >
      <Container>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            pt: 4,
          }}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={index}
                to={item.link}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton
                  sx={{
                    padding: "10px",
                    gap: "8px",
                    borderRadius: "4px",
                    backgroundColor: isActive ? "#e0e0ff" : "transparent",
                    "&:hover": {
                      backgroundColor: "#785cf517",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",

                      color: isActive ? "#3516c0" : "#3516c0",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      color: isActive ? "#3516c0" : "#3516c0",
                    }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Container>
    </Box>
  );
};

export default Sidebar;
