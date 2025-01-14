import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PersonalInfoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    picture: "/path/to/default-picture.jpg",
  });

  const [originalData] = useState(formData);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modalni birlamchi ochilgan holatda o'rnatamiz

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPicture = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, picture: newPicture });
    }
  };

  const handleDeletePicture = () => {
    setFormData({ ...formData, picture: "" });
  };

  const handleReset = () => {
    setFormData(originalData);
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    setIsModalOpen(false); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleModalClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Personal Information
        <IconButton onClick={handleModalClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        sx={{
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Grid alignItems="center">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Grid item xs={4}>
              <Avatar
                src={formData.picture}
                alt="Profile"
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  mr: 1,
                  backgroundColor: "#1BA98F",
                  borderRadius: "100px",
                }}
              >
                Upload new picture
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePictureUpload}
                />
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeletePicture}
                style={{
                  borderRadius: "100px",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                Delete Picture
              </Button>
            </Grid>
          </div>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
          </div>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Personal Address
        </Typography>
        <Box>
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                },
              }}
            />
          </div>
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: "20px" }}>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleReset}
            style={{
              paddingLeft: "80px",
              paddingRight: "80px",
              maxWidth: "430px",
              width: "100%",
              borderRadius: "100px",
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{
              backgroundColor: "#1BA98F",
              paddingLeft: "80px",
              paddingRight: "80px",
              maxWidth: "430px",
              width: "100%",
              borderRadius: "100px",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PersonalInfoForm;
