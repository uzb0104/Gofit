import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const statsData = {
  attendance: [
    { month: "Yan", members: 80 },
    { month: "Fev", members: 95 },
    { month: "Mar", members: 90 },
    { month: "Apr", members: 110 },
    { month: "May", members: 100 },
  ],
  revenue: [
    { month: "Yan", revenue: 4000 },
    { month: "Fev", revenue: 4500 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 7500 },
  ],
  membershipTypes: [
    { type: "Asosiy", value: 50 },
    { type: "Standart", value: 70 },
    { type: "Premium", value: 30 },
  ],
  equipmentUpdates: [
    { type: "Yangi trenajerlar", value: 25 },
    { type: "Yangi gilamlar", value: 15 },
    { type: "Og'irliklar", value: 10 },
    { type: "Dastgohlar", value: 5 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GymStats = () => {
  return (
    <Box
      sx={{
        padding: 3,
   
  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        mb={4}
        align="center"
        fontWeight="bold"
        sx={{ color: "#3516c0" }}
      >
        Gofit Statistikasi
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
    
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography
            variant="h6"
            align="center"
            mb={2}
            fontWeight="bold"
            color="#504edf"
          >
            Oylik Tashriflar
          </Typography>
          <Typography variant="body1" align="center" color="#000000" mb={2}>
            Bu diagramma oylar davomida zalga tashrif buyurgan a'zolar sonini
            ko'rsatadi.
          </Typography>
          <LineChart
            width={400}
            height={300}
            data={statsData.attendance}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="members"
              stroke="#42a5f5"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </Paper>

        {/* A'zolik Turlari */}
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography
            variant="h6"
            align="center"
            mb={2}
            fontWeight="bold"
            color="#504edf"
          >
            A'zolik Turlari
          </Typography>
          <Typography variant="body1" align="center" color="#000000" mb={2}>
            Bu diagramma gymda mavjud bo'lgan a'zolik turlarini va ularning
            foizlarini ko'rsatadi.
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={statsData.membershipTypes}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {statsData.membershipTypes.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Paper>

        {/* Oylik Daromad */}
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography
            variant="h6"
            align="center"
            mb={2}
            fontWeight="bold"
            color="#504edf"
          >
            Oylik Daromad
          </Typography>
          <Typography variant="body1" align="center" color="#000000" mb={2}>
            Bu diagramma gymning har oyda olingan daromadlarini ko'rsatadi.
          </Typography>
          <BarChart
            width={400}
            height={300}
            data={statsData.revenue}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#ff7f50" />
          </BarChart>
        </Paper>

        {/* Sport Anjomlari */}
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography
            variant="h6"
            align="center"
            mb={2}
            fontWeight="bold"
            color="#504edf"
          >
            Sport Anjomlari
          </Typography>
          <Typography variant="body1" align="center" color="#000000" mb={2}>
            Bu diagramma gymga kiritilgan yangi sport anjomlarini ko'rsatadi.
          </Typography>
          <BarChart
            width={400}
            height={300}
            data={statsData.equipmentUpdates}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </Paper>
      </Box>
    </Box>
  );
};

export default GymStats;
