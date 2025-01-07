import React, { useState, useEffect } from "react";
import ExpenseTable from "../Admin/ServiceForm";
import { Expense } from "../../types/types/Expense";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Modal,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    name: "",
    date: "",
    amount: 0,
    description: "",
  });

  const [editExpenseId, setEditExpenseId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddOrEdit = () => {
    if (newExpense.name && newExpense.date && newExpense.amount > 0) {
      if (editExpenseId) {
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === editExpenseId
              ? { ...expense, ...newExpense }
              : expense
          )
        );
        setEditExpenseId(null);
      } else {
        setExpenses([
          ...expenses,
          {
            id: Date.now(),
            ...newExpense,
          },
        ]);
      }
      setNewExpense({
        name: "",
        date: "",
        amount: 0,
        description: "",
      });
      setIsAddModalOpen(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDelete = () => {
    if (expenseToDelete !== null) {
      setExpenses((prev) =>
        prev.filter((expense) => expense.id !== expenseToDelete)
      );
      setIsDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={"bold"}
          sx={{ color: "#3516c0", textAlign: "center" }}
        >
          Gofit xarajati
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            bgcolor: "#3516c0",
            height: 40,
            marginBottom: "20px",
            ml: 120,
          }}
        >
          Xarajatlar
        </Button>
      </Container>
      <ExpenseTable
        expenses={expenses}
        onEdit={(id) => {
          const expenseToEdit = expenses.find((expense) => expense.id === id);
          if (expenseToEdit) {
            setNewExpense(expenseToEdit);
            setEditExpenseId(id);
            setIsAddModalOpen(true);
          }
        }}
        onDelete={(id) => {
          setExpenseToDelete(id);
          setIsDeleteModalOpen(true);
        }}
      />

      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        aria-labelledby="add-expense-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "16px" }}
          >
            {editExpenseId ? "Edit Expense" : "Add New Expense"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Xarajat nomi"
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Sana"
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Izoh"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="To'lov so'mmasi"
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              fullWidth
            />
          </Stack>
          <Button
            variant="contained"
            onClick={handleAddOrEdit}
            sx={{
              bgcolor: "#3516c0",
              marginTop: "20px",
            }}
            fullWidth
          >
            {editExpenseId ? "Save" : "Qo'shish"}
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="delete-expense-dialog"
      >
        <DialogTitle
          id="delete-expense-dialog"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#3516c0" }}
        >
          Ishonch hosil qildingizmi?
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", paddingBottom: "16px" }}>
          <Typography>Ushbu xarajatni o'chirishni xohlaysizmi?</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: "20px",
              textTransform: "capitalize",
              marginRight: "10px",
            }}
          >
            Yoq
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="contained"
            autoFocus
            sx={{ borderRadius: "20px", textTransform: "capitalize" }}
          >
            Ha
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expenses;
