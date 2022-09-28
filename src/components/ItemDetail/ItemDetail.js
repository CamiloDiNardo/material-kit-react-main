/* eslint-disable react/prop-types */
import { Button, Typography, Box, CardContent, Card, CardMedia } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

// detalle de el producto despues de ponerlo en el carrito, pero antes de ir al mismo.
const ItemDetail = ({ item }) => {
  const [cart, setCart] = useState(true);

  const { addItem } = useCartContext();

  const { id, name, img, price, stock } = item;

  const onAdd = (count) => {
    setCart(false);
    addItem({ ...item, quantity: count });
  };

  return (
    <Box
      key={id}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          width: '18.75rem',
          height: '38.375rem',
          marginTop: '5.625rem',
        }}
      >
        <CardMedia
          sx={{
            component: 'img',
            height: '18.75rem',
            width: '100%',
          }}
          image={img}
          alt={name}
        />
        <CardContent
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              lineHeight: '2.5rem',
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              lineHeight: '2.5rem',
            }}
          >
            Precio por unidad: $ {price}
          </Typography>
          {cart ? (
            <ItemCount stock={stock} initial={1} onAdd={onAdd} /> // initial es para iniciar en 1 el contador
          ) : (
            <Link to="/dashboard/cart">
              <Button
                sx={{
                  textDecoration: 'none',
                }}
                variant="contained"
                color="warning"
              >
                Ir al carrito
              </Button>
            </Link>
          )}
          <Link to="/dashboard/items">
            <Button
              sx={{
                textDecoration: 'none',
              }}
              variant="contained"
              color="info"
            >
              Volver al Listado
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ItemDetail;
