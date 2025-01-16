import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Snackbar,
  Box,
  IconButton,
  Avatar,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileAdmin: React.FC = () => {
  const adminInformation = {
    firstName: "Famiya",
    name: "Ism",
    email: "email@example.com",
    phone: "+998994540104",
    startDate: "2025-01-01",
    lastLogin: "2025-01-04",
    role: "Admin",
    avatar: "https://via.placeholder.com/150",
  };

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    firstName: adminInformation.firstName,
    name: adminInformation.name,
    email: adminInformation.email,
    phone: adminInformation.phone,
  });
  const [profileAvatar, setProfileAvatar] = useState(adminInformation.avatar);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [newStatus, setNewStatus] = useState("");

  const handleEdit = () => setEditable(true);
  const handleSave = () => {
    setEditable(false);
    setSnackbarOpen(true);
  };

  const handleCancel = () => {
    setEditable(false);
    setFormData({
      firstName: adminInformation.firstName,
      name: adminInformation.name,
      email: adminInformation.email,
      phone: adminInformation.phone,
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      setStatuses([...statuses, newStatus]);
      setNewStatus("");
    }
  };

  const handleDeleteStatus = (index: number) => {
    const updatedStatuses = statuses.filter((_, i) => i !== index);
    setStatuses(updatedStatuses);
  };

  return (
    <Box sx={{ height: "calc(100vh - 90px)", pt: 5 }}>
      <Paper
        sx={{
          padding: 8,
          maxWidth: 700,

          margin: "0 auto",
          borderRadius: 3,
          mt: 4,
          boxShadow: 5,
          bgcolor: "#f9f9f9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            marginBottom: 3,
          }}
        >
          <label htmlFor="avatar-upload">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <Avatar
              src={profileAvatar}
              sx={{
                width: 80,
                height: 80,
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </label>
          <Box sx={{ color: "#3516c0" }}>
            <Typography variant="h4" fontWeight="bold">
              Admin Profile
            </Typography>
            <Typography variant="subtitle1">{adminInformation.role}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <TextField
            label="Familya"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            fullWidth
            disabled={!editable}
          />

          <TextField
            label="Ismingiz"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            disabled={!editable}
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            fullWidth
            disabled={!editable}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Telefon raqam"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            fullWidth
            disabled={!editable}
            sx={{ mt: 2 }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
          <IconButton
            color="primary"
            onClick={editable ? handleSave : handleEdit}
          >
            {editable ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          {editable && (
            <IconButton color="secondary" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#3516c0" }}
          >
            Xodim darajasi
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="Daraja qo'shish"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleAddStatus}
              sx={{
                bgcolor: "#3516c0",
                "&:hover": { bgcolor: "#3516c0fc" },
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              Qo'shish
            </Button>
          </Box>
          {statuses.map((status, index) => (
            <Card
              key={index}
              sx={{
                mt: 2,
                boxShadow: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                bgcolor: "#ffffff",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1">{status}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteStatus(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Muvaffiqiyatli saqlandi"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          ContentProps={{
            style: {
              backgroundColor: "#82d857",
              textAlign: "center",
              color: "#fff",
              borderRadius: 30,
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ProfileAdmin;
