import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TableContainer,
  Paper,
  Tooltip,
} from "@mui/material";
import { Member } from "../../types/types/Member";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface MemberTableProps {
  members: Member[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#1976d2",
              "& th": {
                fontWeight: "bold",
                color: "white",
                padding: "16px 24px",
              },
            }}
          >
             <TableCell>Familiya</TableCell>
            <TableCell>Ism</TableCell>
            <TableCell>Kontakt</TableCell>
            <TableCell>Holat</TableCell>
            <TableCell>Harakatlar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow
              key={member.id}
              sx={{
                "&:hover": {
                  backgroundColor: " #4a7caf",
                  cursor: "pointer",
                },
                borderBottom: "1px solid #3587d9",
                "& td": {
                  padding: "12px 24px",
                },
              }}
            >
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.contact}</TableCell>
            
                
              <TableCell>
                <Tooltip title="Tahrirlash">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(member.id)}
                    startIcon={<EditIcon />}
                    sx={{ marginRight: 1 }}
                  >
                    Tahrirlash
                  </Button>
                </Tooltip>
                <Tooltip title="O'chirish">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDelete(member.id)}
                    startIcon={<DeleteIcon />}
                  >
                    O'chirish
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberTable;
