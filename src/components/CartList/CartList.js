/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, TableBody, TableCell, TableRow, ImageListItem, Typography } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// Carrito x dentro parte2 : body que tiene los valores de cada articulo de firebase y remover carrito
const CartList = ({ product, removeItem }) => {
  const { id, name, img, price, quantity } = product;
  // Para poner imagenes en las listas usamos ImageListItem
  // para q aparezca el boton de paypal cuando clickeamos buy now
  const [show, setShow] = useState(false);
  // mensaje para cuando compremos diciendo q ya lo compramo
  const [success, setSuccess] = useState(false);
  /* esto ponemos para el mensaje. { success ? (
 <Typography>you payment has been done sucessfull, please check your email</Typography>
          ) : (
            <Typography>payment is pending</Typography>
          )} */
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setOrderId] = useState(false);
  // Con esto creamos la orden,
  const createOrder = (data, actions) =>
    actions.order
      .create({
        purchase_units: [
          {
            description: 'Pizzeria',
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
        applicattion_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  const onApprove = (data, actions) =>
    actions.order.capture().then((details) => {
      const { payer } = details;
      setSuccess();
    });

  const onError = (data, actions) => {
    setErrorMessage('an error ocured with yout payments');
  };
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
        <PayPalScriptProvider // Provider de paypal con el id de la cuenta donde nos va a llegar el dinero.
          options={{
            'client-id': 'AczdczodQoUsW76oHSG-_Mk-4dVQLZLwSi_n_neLj70uJiWchzu-pfxZJGqQ4xMI8Dwy0vUX9kEo2Q0C',
          }}
        >
          <TableCell align="center">
            <Button onClick={() => setShow(true)} variant="contained" type="submit">
              Buy Now
            </Button>
          </TableCell>
          {show ? (
            <TableCell align="center">
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            </TableCell>
          ) : null}
        </PayPalScriptProvider>
      </TableRow>
    </TableBody>
  );
};

export default CartList;
