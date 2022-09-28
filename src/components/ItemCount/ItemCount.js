/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
// funciones para aumentar o disminuir el stock que queremos comprar antes de ponerlo en el carrito
const ItemCount = ({ stock, initial, onAdd }) => {
  const [counter, setCounter] = useState(initial);
  // mejoramos la funcion para no ponerla en una sola linea sin usar el return
  const handleAdd = () => (counter < stock ? setCounter((prev) => prev + 1) : setCounter(stock));

  const handleSubtract = () => (counter > initial ? setCounter((prev) => prev - 1) : setCounter(initial));
  // botones + - con el contador que aumenta cada ves que clickeamos. y el agregar producto con el onclick para agregarlo al carrito
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            color: 'red',
          }}
          onClick={handleSubtract}
        >
          -
        </Button>
        <Typography>{counter}</Typography>
        <Button onClick={handleAdd}>+</Button>
      </Box>

      <Typography
        sx={{
          lineHeight: '2.5rem',
        }}
      >
        Stock disponible: {stock}
      </Typography>

      <Button
        sx={{
          lineHeight: '2.5rem',
          marginBottom: '1rem',
        }}
        onClick={() => onAdd(counter)}
        variant="contained"
        color="warning"
      >
        Agregar al carrito
      </Button>
    </Box>
  );
};

export default ItemCount;
