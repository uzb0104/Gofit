import React, { useState } from "react";
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
  Container,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { supabase } from "../../types/types/supabase";
import { Expense } from "../../types/types/Expense";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) {
        console.error("Error deleting expense:", error);
        alert("Serverda Xatolik. Iltimos keyinroq urinib ko'ring !!");
      } else {
        onDelete(id);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      handleCloseMenu();
    }
  };

  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, mt: 3 }}
      >
        <Table sx={{ minWidth: 550, borderCollapse: "collapse" }}>
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
              <TableCell>Xarajat nomi</TableCell>
              <TableCell>Sana</TableCell>
              <TableCell>Izoh</TableCell>
              <TableCell>To'lov</TableCell>
              <TableCell>Sozlamalar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
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
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.payment}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleOpenMenu(e, expense.id)}
                    color="primary"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedId === expense.id)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => onEdit(expense.id)}>
                      Tahrirlash
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(expense.id)}>
                      O'chirish
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExpenseTable;
