import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  TextField,
  Button,
} from "@mui/material";

const AttendanceTable = () => {
  const [students, setStudents] = useState([
    {
      name: "Omonov Abbosbek",
      attendance: [
        true,
        true,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
  ]);

  const [newStudentName, setNewStudentName] = useState("");

  const handleAttendanceChange = (studentIndex: number, dayIndex: number) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].attendance[dayIndex] =
      !updatedStudents[studentIndex].attendance[dayIndex];
    setStudents(updatedStudents);
  };

  const calculateDaysMissed = (attendance: boolean[]) => {
    return attendance.filter((attended) => !attended).length;
  };

  const handleAddStudent = () => {
    if (newStudentName.trim() !== "") {
      const updatedStudents = [
        ...students,
        { name: newStudentName, attendance: Array(31).fill(false) },
      ];
      setStudents(updatedStudents);
      setNewStudentName("");
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight={"bold"}
        color="#3516c0"
      >
        Davomat
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          label="Foydalanuvchi to'liq ismi"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "#3516c0", height: 55 }}
          onClick={handleAddStudent}
        >
          Qo'shish
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ width: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3516c0",
                  color: "#fff",
                }}
              >
                Foydalanuvchi
              </TableCell>
              {Array.from({ length: 31 }, (_, i) => (
                <TableCell
                  key={i}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3516c0",
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#DC2626",
                  color: "#fff",
                  width: "50",
                }}
              >
                O'tkazib yuborilgan kunlar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, studentIndex) => (
              <TableRow key={studentIndex}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {student.name}
                </TableCell>
                {student.attendance.map((attended, dayIndex) => (
                  <TableCell key={dayIndex} align="center">
                    <Checkbox
                      checked={attended}
                      onChange={() =>
                        handleAttendanceChange(studentIndex, dayIndex)
                      }
                      color="primary"
                    />
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", backgroundColor: "#FEE2E2" }}
                >
                  {calculateDaysMissed(student.attendance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AttendanceTable;
