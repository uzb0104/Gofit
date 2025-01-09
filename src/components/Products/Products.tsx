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
  name: string;
  category: string;
  price: string;
  date: number;
  stock: string;
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
    stock: 0,
    expiryDate: "",
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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Whey Protein",
      category: "Protein",
      price: "200,000 UZS",
      stock: 50,
      expiryDate: "2025-05-01",
    },
    {
      id: 2,
      name: "BCAA",
      category: "Amino Acids",
      price: "120,000 UZS",
      stock: 100,
      expiryDate: "2024-11-20",
    },
    {
      id: 3,
      name: "Creatine",
      category: "Supplement",
      price: "150,000 UZS",
      stock: 30,
      expiryDate: "2025-02-14",
    },
    {
      id: 4,
      name: "Pre-Workout",
      category: "Energy Booster",
      price: "180,000 UZS",
      stock: 70,
      expiryDate: "2024-10-05",
    },
  ]);

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
      stock: 0,
      expiryDate: "",
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    handleDialogClose();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    setDeleteModalOpen(false);
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setNewProduct({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        stock: productToEdit.stock,
        expiryDate: productToEdit.expiryDate,
      });
      setDialogOpen(true);
    }
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
                <TableCell align="center">Sozlamalar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
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
                  <TableCell align="center">{product.expiryDate}</TableCell>
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
                label="To'langan"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newProduct.expiryDate}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, expiryDate: e.target.value })
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
              onClick={() => handleDeleteProduct(selectedId!)} // Delete the selected product
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
