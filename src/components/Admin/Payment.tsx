import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import UserPayTable from "./UserPayTable";
import { User } from "../../types/userpaytab";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", number: "", amount: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.number && newUser.amount > 0) {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          id: prevUsers.length + 1,
          name: newUser.name,
          number: newUser.number,
          amount: newUser.amount,
          paid: false,
          onViewProfile: () => handleViewProfile(prevUsers.length + 1),
          onDeleteUser: () => handleDeleteUser(prevUsers.length + 1),
        },
      ]);
      setNewUser({ name: "", number: "", amount: 0 });
    } else {
      alert("Iltimos, barchasini to'ldiring!");
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePaymentStatusToggle = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, paid: !user.paid } : user
      )
    );
  };

  const handleViewProfile = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setNewUser({
        name: userToEdit.name,
        number: userToEdit.number,
        amount: userToEdit.amount,
      });
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container>
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            fontWeight: "bold",
            color: "#3516c0",
          }}
        >
          Foydalanuvchilarning to'lovlari
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginBottom: 4,
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Foydalanuvchi ismi"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Telefon raqami"
            name="number"
            value={newUser.number}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="To'lov miqdori (UZS)"
            name="amount"
            value={newUser.amount || ""}
            onChange={handleInputChange}
            fullWidth
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            sx={{ width: 400, bgcolor: "#3516c0" }}
          >
            Qo'shish
          </Button>
        </Box>

        <UserPayTable
          users={users}
          onViewProfile={handleViewProfile}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />

        <Modal open={isModalOpen} onClose={closeModal}>
          <Card
            sx={{
              maxWidth: 400,
              margin: "100px auto",
              padding: "20px",
              outline: "none",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Profil Ma'lumotlari
              </Typography>
              {selectedUser && (
                <>
                  <Typography variant="body1">
                    <strong>Ism:</strong> {selectedUser.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Telefon raqami:</strong> {selectedUser.number}
                  </Typography>
                  <Typography variant="body1">
                    <strong>To'lov miqdori:</strong> {selectedUser.amount} UZS
                  </Typography>
                </>
              )}
              <Button
                variant="contained"
                onClick={closeModal}
                sx={{ marginTop: "20px" }}
              >
                Ortga qaytish
              </Button>
            </CardContent>
          </Card>
        </Modal>
      </Box>
    </Container>
  );
};

export default UserManagement;
