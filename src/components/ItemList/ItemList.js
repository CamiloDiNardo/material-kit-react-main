/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import React, { memo } from 'react';
import Item from '../Item/Item';
// memo permite guardar componentes en memoria y lo va a cambiar solo si sus propiedades cambian. se usa en aplicaciones grandes para optimizarlas y que no se renderize todo
// se suele usar con useCallBack que guarda funciones en memoria y asi hace lo mismo que el memo pero para funciones.
// ej: const aumentar1 = useCallback(() => {
//    cambiarContador1(contador 1 + 1);
//    }, [contador1]); contador1 es el usestate que cuando cambia, hace que esta funcion se renderize. tenemos que ponerle eso ahi para q esta funcion se renderize solo cuando cambia el estado contador1
// Cuando actualizamos un estado, se renderizan todos los estados, para que eso no pase usamos el memo.
// Esto es el mapeo de los productos para mostrarlos en las cards
const ItemList = memo(({ products }) => (
  <Box sx={{ display: 'flex', flexWrap: 'Wrap', justifyContent: 'space-evenly' }}>
    {products.map((product) => (
      <Item product={product} key={product.id} />
    ))}
  </Box>
));

export default ItemList;
