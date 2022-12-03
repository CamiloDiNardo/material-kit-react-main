/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// Listado de cards con datos de los productos
const Item = ({ product }) => {
  const { id, name, img, price, stock } = product;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'Wrap',
      }}
    >
      <Card
        sx={{
          width: '18.75rem',
          height: '30.375rem',
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
          component ='img'
        />
        <CardContent
          sx={{
            height: '20rem',
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              textAlign: 'center',
              lineHeight: '2rem',
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              textAlign: 'center',
              lineHeight: '2rem',
            }}
          >
            Precio por unidad: $ {price}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              textAlign: 'center',
              lineHeight: '2rem',
            }}
          >
            Stock:{stock}
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              textAlign: 'center',
              lineHeight: '2rem',
            }}
          >
            <Link to={`/dashboard/${id}`}>
              <Button variant="contained" color="warning">
                Detalle del producto
              </Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Item;
