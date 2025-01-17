import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Member } from "../../types/types/Member";

interface MemberTableProps {
  members: Member[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewProfile: (id: number) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onEdit,
  onDelete,
  onViewProfile,
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
              backgroundColor: "#3516c0",
              "& th": {
                fontWeight: "bold",
                color: "white",
                padding: "16px 24px",
              },
            }}
          >
            <TableCell> Familiya</TableCell>
            <TableCell>Ism</TableCell>
            <TableCell>Telfon raqam</TableCell>
            <TableCell>Yosh</TableCell>
            <TableCell>Manzil</TableCell>
            <TableCell>Ro'yxatdan o'tgan sana</TableCell>
            <TableCell>Sozlamalar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow
              key={member.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#1976d219",
                  cursor: "pointer",
                },
                borderBottom: "1px solid #4a7caf",
                "& td": {
                  padding: "12px 24px",
                },
              }}
            >
              <TableCell>{member.firstName}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>{member.contact}</TableCell>
              <TableCell>{member.age}</TableCell>
              <TableCell>{member.location}</TableCell>
              <TableCell>{member.register}</TableCell>

              <TableCell>
                <IconButton
                  onClick={(e) => handleOpenMenu(e, member.id)}
                  color="primary"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedId === member.id)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() => {
                      onViewProfile(member.id);
                      handleCloseMenu();
                    }}
                  >
                    Profilni ko'rish
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onEdit(member.id);
                      handleCloseMenu();
                    }}
                  >
                    Tahrirlash
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onDelete(member.id);
                      handleCloseMenu();
                    }}
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

export default MemberTable;
