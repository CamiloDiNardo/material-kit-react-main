import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Box } from '@mui/material';
import ItemDetail from '../components/ItemDetail/ItemDetail';
import { db } from '../firebaseConfig/firebase';
// Con esto traemos la data de products para mostrarla Antes de añadirla al carrito.
const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const database = db;
    const queryDb = doc(database, 'products', id);
    getDoc(queryDb)
      .then((resp) => setItem({ id: resp.id, ...resp.data() }))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Box>
      <ItemDetail item={item} />
    </Box>
  );
};

export default ItemDetailContainer;
