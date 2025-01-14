import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container
      sx={{
        textAlign: "center",
        padding: "90px",
        height: "calc(100vh - 82px)",
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3516c0",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          GoFit platformasiga xush kelibsiz !!
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", fontSize: "16px" }}>
          Fitnes markazlariga menejerlik uchun yo'naltirilgan platforma.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "40px" }}>
        <Typography
          variant="body2"
          sx={{ color: "#555", fontSize: "14px", lineHeight: 1.6 }}
        >
          GoFit sizga o'zingizning fitnes markazingizni boshqarish,
          buyurtmalarni kuzatish, a'zolarni boshqarish va boshqa ko'plab
          qulayliklarni taqdim etadi.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            Foydalanuvchilarni Boshqarish
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            A'zolarni qo'shish, tahrirlash va boshqarish imkoniyatiga ega
            bo'ling.
          </Typography>
        </Box>

        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            To'lovlarni Boshqarish
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            To'lovlar va hisob-kitoblarni osongina boshqarish imkoniyati.
          </Typography>
        </Box>

        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            Statistikalar va Hisobotlar
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            Foydalanuvchi faoliyatining statistikalarini ko'rish va tahlil
            qilish.
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            Maxsulotlarni boshqarish
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            To'lovlar va hisob-kitoblarni osongina boshqarish imkoniyati.
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            Xarajatlarni tizimli boshqarish
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            To'lovlar va hisob-kitoblarni osongina boshqarish imkoniyati.
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "45%", md: "22%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#3516c0", marginBottom: "8px", fontSize: "16px" }}
          >
            Tizimli boshqarish
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: "14px" }}>
            To'lovlar va hisob-kitoblarni osongina boshqarish imkoniyati.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
