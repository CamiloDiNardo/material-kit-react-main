import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useCartContext } from '../context/CartContext';
import CartList from '../components/CartList/CartList';
// Carrito por dentro sin los valores de la tabla ni el remover carrito
// Si Asi no funciona Cambiar la tabla
const Cart = () => {
  const { cartList, removeItem, clearCart, totalPrice } = useCartContext();
  return (
    // si no hay nada en el carrito mostramos "No hay productos en el carrito" si hay mostramos la tabla.
    <TableContainer component={Paper}>
      {cartList.length < 1 ? (
        <>
          <Typography sx={{ textAlign: 'center' }} variant="h3" component="h2">
            No hay productos en el carrito
          </Typography>
          <Link to="/dashboard/items">
            <Button sx={{ textAlign: 'center' }} variant="contained" color="info">
              Seguir comprando
            </Button>
          </Link>
        </>
      ) : (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                Imagen
              </TableCell>
              <TableCell align="center">Nombre del producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">Remover item</TableCell>
            </TableRow>
          </TableHead>
          {cartList.map((product) => (
            <CartList product={product} key={product.id} removeItem={removeItem} />
          ))}
          <Button variant="contained" color="error" onClick={clearCart}>
            Vaciar carrito
          </Button>
          <Typography sx={{ textAlign: 'center' }}> Precio total: ${totalPrice()} </Typography>
        </Table>
      )}
    </TableContainer>
  );
};
export default Cart;
