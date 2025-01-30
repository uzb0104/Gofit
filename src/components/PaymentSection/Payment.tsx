import React, { useState, useEffect } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { supabase } from "../../types/types/supabase";

interface Payment {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  amount: number;
}

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    amount: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewPayment({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      amount: "",
    });
  };

  const handleAddPayment = async () => {
    if (
      newPayment.firstName &&
      newPayment.lastName &&
      newPayment.phoneNumber &&
      parseFloat(newPayment.amount) > 0
    ) {
      const { data, error } = await supabase
        .from("Payments")
        .insert([
          {
            first_name: newPayment.firstName,
            last_name: newPayment.lastName,
            phone_number: newPayment.phoneNumber,
            amount: parseFloat(newPayment.amount),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase Xatosi:", error);
        alert("Xatolik yuz berdi: " + error.message);
      } else {
        console.log("Yangi to'lov qo'shildi:", data);
        setPaymentData((prevData) => [
          ...prevData,
          {
            id: data[0].id,
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            phoneNumber: data[0].phone_number,
            amount: data[0].amount,
          },
        ]);
        setNewPayment({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          amount: "",
        });
        handleDialogClose();
      }
    } else {
      alert("Iltimos, barchasini to'ldiring!");
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Payments").select("*");

    if (error) {
      console.error(error);
      alert("Xatolik yuz berdi!");
    } else {
      const formattedData = data.map((item) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        phoneNumber: item.phone_number,
        amount: item.amount,
      }));

      setPaymentData(formattedData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Box sx={{ padding: 4, height: "calc(100vh - 147px)" }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{ color: "#3516c0", alignItems: "center" }}
      >
        Foydalanuvchilarning To'lovlari
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#3516c0", "&:hover": { bgcolor: "#3516c0fc" } }}
          onClick={handleDialogOpen}
        >
          To'lov Qo'shish
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress sx={{ color: "#3516c0" }} />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="payment table">
            <TableHead sx={{ bgcolor: "#3516c0" }}>
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: "bold",
                    color: "white",
                    padding: "16px 24px",
                    textAlign: "center",
                  },
                }}
              >
                <TableCell>Ism</TableCell>
                <TableCell>Familiya</TableCell>
                <TableCell>Telefon raqami</TableCell>
                <TableCell>To'langan summa (UZS)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentData.map((payment) => (
                <TableRow
                  sx={{
                    "&:hover": {
                      bgcolor: "#2e2e2e1a",
                    },
                  }}
                >
                  <TableCell align="center">{payment.firstName}</TableCell>
                  <TableCell align="center">{payment.lastName}</TableCell>
                  <TableCell align="center">{payment.phoneNumber}</TableCell>
                  <TableCell align="center">{payment.amount} UZS</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <Stack width={400} spacing={2}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              color="#3516c0"
              textAlign={"center"}
            >
              To'lov Qo'shish
            </Typography>
            <TextField
              label="Ism"
              value={newPayment.firstName}
              onChange={(e) =>
                setNewPayment({ ...newPayment, firstName: e.target.value })
              }
            />
            <TextField
              label="Familiya"
              value={newPayment.lastName}
              onChange={(e) =>
                setNewPayment({ ...newPayment, lastName: e.target.value })
              }
            />
            <TextField
              label="Telefon raqami"
              value={newPayment.phoneNumber}
              onChange={(e) =>
                setNewPayment({ ...newPayment, phoneNumber: e.target.value })
              }
            />
            <TextField
              label="To'langan summa (UZS)"
              type="number"
              value={newPayment.amount}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Bekor qilish
          </Button>
          <Button
            onClick={handleAddPayment}
            variant="contained"
            sx={{ bgcolor: "#3516c0", "&:hover": { bgcolor: "#3516c0fc" } }}
          >
            Qo'shish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentList;
