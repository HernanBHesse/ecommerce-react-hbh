import * as React from "react";
import { useContext } from "react";
import CartContext from "../componentes/context/CartContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "10vw",
  maxHeight: "100%",
});

const Cart = () => {
  const {
    cartListItems,
    setCartListItems,
    setItemsCartCount,
    removeCartItem,
    setPrecioTotal,
    precioTotal,
    itemsCartCount,
  } = useContext(CartContext);

  return (
    <>
      {itemsCartCount ? (
        <Paper
          sx={{
            width: "80vw",
            mx: "auto",
            my: 1,
          }}
        >
          <Table sx={{}} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Producto
                </TableCell>
                <TableCell colSpan={1} align="center">
                  Cantidad
                </TableCell>
                <TableCell colSpan={1} align="center">
                  Precio
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cartListItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Img src={`/${item.imagen}`} alt={item.altImagen} />
                    </TableCell>
                    <TableCell align="center">{item.titulo}</TableCell>
                    <TableCell align="center">{item.count}</TableCell>
                    <TableCell align="center">
                      {item.precio * item.count}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setPrecioTotal(
                            precioTotal - item.precio * item.count
                          );
                          setItemsCartCount(itemsCartCount - item.count);
                          removeCartItem(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell align="center">{precioTotal}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: "20vw", ml: 1, my: 1 }}
            onClick={() => {
              setCartListItems([]);
              setItemsCartCount(0);
              setPrecioTotal(0);
            }}
          >
            Vaciar
          </Button>
          <Button
            component={Link}
            to="/compraFinalizada"
            variant="contained"
            color="success"
            sx={{ mr: 1, ml: "20vw", my: 1 }}
            onClick={() => {
              setCartListItems([]);
              setItemsCartCount(0);
              setPrecioTotal(0);
            }}
          >
            Terminar mi compra
          </Button>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "80vw",
            Height: "40vh",
            mx: "auto",
            my: "auto",
          }}
        >
          <h1>Tu carrito est?? vac??o</h1>
          <h2>??No sab??s qu?? comprar ??Miles de productos te esperan!</h2>
          <Button sx={{ flexGrow: 0 }} color="inherit" component={Link} to="/">
            Volver al inicio
          </Button>
        </Paper>
      )}
    </>
  );
};

export default Cart;
