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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { supabase } from "../../types/types/supabase";

interface Attendance {
  id: number;
  fullname: string;
  attendance: boolean[];
  year: number;
  month: number;
}

const AttendanceTable = () => {
  const [students, setStudents] = useState<Attendance[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Attendance")
      .select("*")
      .eq("year", selectedYear)
      .eq("month", selectedMonth);

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
      year: record.year,
      month: record.month,
    }));

    setStudents(formattedData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedMonth]);

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
      const { data, error } = await supabase
        .from("Attendance")
        .insert([
          {
            fullname: newStudentName,
            attendance: Array(31).fill(false),
            year: selectedYear,
            month: selectedMonth,
          },
        ])
        .select();

      if (error) {
        console.error("Xatolik foydalanuvchi qo'sha olmisiz:", error);
        return;
      }

      if (!data || data.length === 0) {
        console.error("Serverdagi xatolik birozdan so'ng urinib ko'ring.");
        return;
      }
      setStudents([
        ...students,
        {
          id: data[0].id,
          fullname: newStudentName,
          attendance: Array(31).fill(false),
          year: selectedYear,
          month: selectedMonth,
        },
      ]);
      setNewStudentName("");
    }
  };

  const calculateDaysMissed = (attendance: boolean[]) => {
    return attendance.filter((attended) => !attended).length;
  };

  const handleMonthChange = (increment: boolean) => {
    if (increment) {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear((prev) => prev + 1);
      } else {
        setSelectedMonth((prev) => prev + 1);
      }
    } else {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear((prev) => prev - 1);
      } else {
        setSelectedMonth((prev) => prev - 1);
      }
    }
  };

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  return (
    <Container sx={{ mt: 3, height: "calc(100vh - 100px)" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight={"bold"}
        color="#3516c0"
        sx={{ mb: 4 }}
      >
        Davomat
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button onClick={() => handleMonthChange(false)} variant="text">
          <ChevronLeftIcon />
        </Button>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mx: 2, color: "#3516c0" }}
        >
          {months[selectedMonth - 1]} {selectedYear}
        </Typography>
        <Button onClick={() => handleMonthChange(true)} variant="text">
          <ChevronRightIcon />
        </Button>
      </Box>

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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                label="Foydalanuvchi to'liq ismi"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  width: 950,
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#3516c0",
                height: 55,
                width: "150px",
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleAddStudent}
            >
              Qo'shish
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
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
                        minWidth: "30px",
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
