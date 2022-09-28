import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Box } from '@mui/material';
import ItemList from '../components/ItemList/ItemList';
import { db } from '../firebaseConfig/firebase';
// De aca salen los datos de firebase
const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { idCategory } = useParams();
  // where sirve para traer una coleccion o documento especifico, en este caso usamos el == pero se pueden usar muchos mas.
  useEffect(() => {
    const database = db;
    const queryCollection = idCategory
      ? query(collection(database, 'products'), where('category', '==', idCategory))
      : collection(database, 'products');
    getDocs(queryCollection)
      .then((resp) => setProducts(resp.docs.map((prod) => ({ id: prod.id, ...prod.data() }))))
      .catch((err) => console.log(err));
  }, [idCategory]);

  return (
    <Box>
      <ItemList products={products} />
    </Box>
  );
};

export default ItemListContainer;
