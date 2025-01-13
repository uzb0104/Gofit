import React from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

const attendanceData = [
  { name: "Abbos", date: "2021-11-10", time: "10:00 AM", status: "Bor" },
  { name: "Abbos", date: "2021-11-11", time: "10:00 AM", status: "Yo'q" },
];

const AttendanceHistory = () => {
  return (
    <Container>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Attendance History
      </Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.time}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AttendanceHistory;
