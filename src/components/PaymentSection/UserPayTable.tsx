import React from "react";
import { User } from "../../types/userpaytab";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface UserTableProps {
  users: User[];
  onViewProfile: (id: number) => void;
  onDeleteUser: (id: number) => void;
}

const UserPayTable: React.FC<UserTableProps> = ({
  users,
  onViewProfile,
  onDeleteUser,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 3, borderRadius: 2, mt: 3 }}
    >
      <Table sx={{ minWidth: 650, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#4A90E2",
              "& th": {
                fontWeight: "bold",
                color: "white",
                padding: "16px 24px",
              },
            }}
          >
            <TableCell>Ism</TableCell>
            <TableCell>Telefon raqami</TableCell>
            <TableCell>To'lov miqdori</TableCell>
            <TableCell>Sozlamalar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                  cursor: "pointer",
                },
                borderBottom: "1px solid #e0e0e0",
                "& td": {
                  padding: "12px 24px",
                },
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell>{user.amount} UZS</TableCell>
              <TableCell>
                <IconButton
                  onClick={(e) => handleOpenMenu(e, user.id)}
                  color="primary"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedId === user.id)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() => {
                      onViewProfile(user.id);
                      handleCloseMenu();
                    }}
                  >
                    Ko'rish
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onDeleteUser(user.id);
                      handleCloseMenu();
                    }}
                    sx={{ color: "red" }}
                  >
                    O'chirish
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserPayTable;
