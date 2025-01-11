import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Container,
  MenuItem,
  Menu,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { supabase } from "../../types/types/supabase";

interface Products {
  id: number;
  name: string;
  category: string;
  price: string;
  date: number;
  stock: number;
}

const ProductList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [getData, setData] = useState<Products[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    date: "",
  });

  const fetchData = async () => {
    const { data, error } = await supabase.from("Products").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      date: "",
    });
  };

  const handleAddProduct = async () => {
    const { data, error } = await supabase.from("Products").insert({
      ...newProduct,
    });

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    fetchData();
    handleDialogClose();
  };

  const handleDeleteProduct = (id: number) => {
    setDeleteModalOpen(false);
  };

  const handleEditProduct = (id: number) => {
    // const productToEdit = products.find((product) => product.id === id);
    // if (productToEdit) {
    //   setNewProduct({
    //     name: productToEdit.name,
    //     category: productToEdit.category,
    //     price: productToEdit.price,
    //     stock: productToEdit.stock,
    //     data: productToEdit.data,
    //   });
    //   setDialogOpen(true);
    // }
  };

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);

  return (
    <Container>
      <Stack spacing={3} padding={2}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#3516c0", textAlign: "center" }}
          >
            Mahsulotlar Jadvali
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ bgcolor: "#3516c0", "&:hover": { bgcolor: "#3516c0fc" } }}
            onClick={handleDialogOpen}
          >
            Qo'shish
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="product table">
            <TableHead sx={{ bgcolor: "#3516c0" }}>
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: "bold",
                    color: "white",
                    padding: "16px 24px",
                    textAlign: "center",
                  },
                }}
              >
                <TableCell>Mahsulot Nomi</TableCell>
                <TableCell align="center">Kategoriya</TableCell>
                <TableCell align="center">Narxi</TableCell>
                <TableCell align="center">Muddati</TableCell>
                <TableCell align="center">Soni</TableCell>
                <TableCell align="center">Sozlamalar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "#2e2e2e1a",
                    },
                  }}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.date}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleOpenMenu(e, product.id)}
                      color="primary"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedId === product.id)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => {
                          handleEditProduct(product.id);
                          handleCloseMenu();
                        }}
                      >
                        Tahrirlash
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setSelectedId(product.id);
                          handleOpenDeleteModal();
                          handleCloseMenu();
                        }}
                      >
                        O'chirish
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogContent>
            <Stack width={400} spacing={2}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                color="#3516c0"
                textAlign={"center"}
              >
                Mahsulot Qo'shish
              </Typography>
              <TextField
                label="Mahsulot Nomi"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <TextField
                label="Kategoriya"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
              <TextField
                label="Narxi"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <TextField
                label="Soni"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
              <TextField
                label="Muddati"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newProduct.date}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, date: e.target.value })
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Bekor qilish
            </Button>
            <Button
              onClick={handleAddProduct}
              variant="contained"
              sx={{ bgcolor: "#3516c0", "&:hover": { bgcolor: "#3516c0fc" } }}
            >
              Qo'shish
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          aria-labelledby="delete-member-dialog"
        >
          <DialogTitle
            id="delete-member-dialog"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#3516c0" }}
          >
            Ishonch hosil qildingizmi?
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center", paddingBottom: "16px" }}>
            <Typography>Ushbu mahsulot o'chirilishini xohlaysizmi?</Typography>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "center", paddingBottom: "16px" }}
          >
            <Button
              onClick={() => setDeleteModalOpen(false)}
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
              onClick={() => handleDeleteProduct(selectedId!)}
              color="secondary"
              variant="contained"
              autoFocus
              sx={{ borderRadius: "20px", textTransform: "capitalize" }}
            >
              Ha
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
};

export default ProductList;
