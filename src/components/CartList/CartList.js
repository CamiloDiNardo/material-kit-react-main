/* eslint-disable react/prop-types */
import React from 'react';
import { Button, TableBody, TableCell, TableRow, ImageListItem } from '@mui/material';
// Carrito x dentro parte2 : body que tiene los valores de cada articulo de firebase y remover carrito
const CartList = ({ product, removeItem }) => {
  const { id, name, img, price, quantity } = product;
  // Para poner imagenes en las listas usamos ImageListItem
  return (
    <TableBody>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <ImageListItem>
            <img src={img} alt={name} />
          </ImageListItem>
        </TableCell>
        <TableCell align="center"> {name} </TableCell>
        <TableCell align="center"> {quantity} </TableCell>
        <TableCell align="center"> ${price} </TableCell>
        <TableCell align="center"> ${price * quantity} </TableCell>
        <TableCell align="center">
          <Button onClick={() => removeItem(id)} data-testid="remover" variant="contained">
            Remover del carrito
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CartList;
