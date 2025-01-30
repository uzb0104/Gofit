import React, { useState, useEffect } from "react";
import MemberTable from "./MemberTable";
import { Member } from "../../types/types/Member";
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
import { supabase } from "../../types/types/supabase";

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem("members");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    firstName: "",
    lastName: "",
    contact: "",
    age: 0,
    location: "",
    register: "",
  });

  const [editMemberId, setEditMemberId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [getDataBaseMember, setDateBaseMember] = useState<Member[]>([]);
  const [viewProfileMember, setViewProfileMember] = useState<Member | null>(
    null
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("Members").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setDateBaseMember(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrEdit = () => {
    if (
      newMember.firstName &&
      newMember.lastName &&
      newMember.contact &&
      newMember.age > 0 &&
      newMember.location
    ) {
      if (editMemberId) {
        setMembers((prev) =>
          prev.map((member) =>
            member.id === editMemberId ? { ...member, ...newMember } : member
          )
        );
        setEditMemberId(null);
      } else {
        setMembers([
          ...members,
          {
            id: Date.now(),
            ...newMember,
            register: new Date().toISOString(),
          },
        ]);
      }
      setNewMember({
        lastName: "",
        firstName: "",
        contact: "",
        age: 0,
        location: "",
        register: "",
      });
      setIsAddModalOpen(false);
    } else {
      setAlertMessage("Iltimos, barcha qatorlarni to'ldiring.");
      setIsAlertOpen(true);
    }
  };

  const handleDelete = () => {
    if (memberToDelete !== null) {
      setMembers((prev) =>
        prev.filter((member) => member.id !== memberToDelete)
      );
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(true);
  };

  return (
    <Box sx={{ padding: "20px", height: "calc(100vh - 82px)" }}>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={"bold"}
          sx={{ color: "#3516c0", textAlign: "center" }}
        >
          Foydalanuvchilar
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            bgcolor: "#3516c0",
            height: 40,
            width: 150,
            marginBottom: "20px",
            ml: 127,
          }}
        >
          A'zo qo'shish
        </Button>
      </Container>
      <MemberTable
        members={members}
        onEdit={(id) => {
          const memberToEdit = members.find((member) => member.id === id);
          if (memberToEdit) {
            setNewMember(memberToEdit);
            setEditMemberId(id);
            setIsAddModalOpen(true);
          }
        }}
        onDelete={(id) => {
          setMemberToDelete(id);
          setIsDeleteModalOpen(true);
        }}
        onViewProfile={(id) => {
          const member = members.find((member) => member.id === id);
          if (member) setViewProfileMember(member);
        }}
      />

      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        aria-labelledby="add-member-modal"
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
            {editMemberId ? "A'zoni tahrirlash" : "Yangi foydalanuchi qo'shish"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Familiya"
              value={newMember.firstName}
              onChange={(e) =>
                setNewMember({ ...newMember, firstName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Ism"
              value={newMember.lastName}
              onChange={(e) =>
                setNewMember({ ...newMember, lastName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Telfon Raqam"
              value={newMember.contact}
              onChange={(e) =>
                setNewMember({ ...newMember, contact: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Yosh"
              type="number"
              value={newMember.age}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  age: parseInt(e.target.value) || 0,
                })
              }
              fullWidth
            />
            <TextField
              label="Manzil"
              value={newMember.location}
              onChange={(e) =>
                setNewMember({ ...newMember, location: e.target.value })
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
            {editMemberId ? "Saqlash" : "Qo'shish"}
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="delete-member-dialog"
      >
        <DialogTitle
          id="delete-member-dialog"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#3516c0" }}
        >
          Ishonch hosil qildingizmi?
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", paddingBottom: "16px" }}>
          <Typography>
            Ushbu foydalanuvchini o'chirilishini xohlaysizmi?
          </Typography>
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
            variant="contained"
            autoFocus
            sx={{
              borderRadius: "20px",
              textTransform: "capitalize",
              bgcolor: "#3516c0",
            }}
          >
            Ha
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isAlertOpen}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog"
      >
        <DialogTitle
          id="alert-dialog"
          sx={{ textAlign: "center", color: "#d32f2f" }}
        >
          Xato
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseAlert}
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "20px",
              textTransform: "capitalize",
              bgcolor: "#3516c0",
            }}
          >
            Yopish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Members;
