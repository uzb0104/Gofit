import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { supabase } from "../../types/types/supabase";

interface Attendance {
  id: number;
  fullname: string;
  attendance: boolean[];
}

const AttendanceTable = () => {
  const [students, setStudents] = useState<Attendance[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Attendance").select("*");
    if (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      return;
    }

    const formattedData = data?.map((record: any) => ({
      id: record.id,
      fullname: record.fullname,
      attendance: Array.isArray(record.attendance)
        ? record.attendance
        : Array(31).fill(false),
    }));

    setStudents(formattedData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAttendanceChange = async (
    studentIndex: number,
    dayIndex: number
  ) => {
    const updatedStudents = [...students];
    const student = { ...updatedStudents[studentIndex] };
    student.attendance = [...student.attendance];
    student.attendance[dayIndex] = !student.attendance[dayIndex];

    const { error } = await supabase
      .from("Attendance")
      .update({ attendance: student.attendance })
      .eq("id", student.id);

    if (error) {
      console.error("Error updating attendance:", error);
      return;
    }

    updatedStudents[studentIndex] = student;
    setStudents(updatedStudents);
  };

  const handleAddStudent = async () => {
    if (newStudentName.trim() !== "") {
      const currentDate = new Date().toISOString().split("T")[0];

      // Supabase'ga yangi foydalanuvchini qo'shish
      const { data, error } = await supabase
        .from("Attendance")
        .insert([
          {
            fullname: newStudentName,
            attendance: Array(31).fill(false), // 31 kunlik attendace massivini bo'sh qilib yuborish
            date: currentDate,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding student:", error);
        return;
      }

      if (!data || data.length === 0) {
        console.error("No data returned after inserting a new student.");
        return;
      }

      setStudents([
        ...students,
        {
          id: data[0].id,
          fullname: newStudentName,
          attendance: Array(31).fill(false),
        },
      ]);
      setNewStudentName("");
    }
  };

  const calculateDaysMissed = (attendance: boolean[]) => {
    return attendance.filter((attended) => !attended).length;
  };

  return (
    <Container sx={{ mt: 2, height: "calc(100vh - 98px)" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight={"bold"}
        color="#3516c0"
      >
        Davomat
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 200px)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
            <Table sx={{ width: "100%" }}>
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
                    }}
                  >
                    O'tkazib yuborilgan kunlar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, studentIndex) => (
                  <TableRow key={student.id}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {student.fullname}
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
        </>
      )}
    </Container>
  );
};

export default AttendanceTable;
