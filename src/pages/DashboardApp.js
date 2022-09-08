import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, getDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const DashboardApp = () => {
  // hacemos un usestate y le declaramos los array vacios dentro
  const [products, setProducts] = useState({ pizzas: [], bebidas: [], ingredientes: [], papas: [] });
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(collection(db, 'products'));
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(arrayData);
        setProducts({
          pizzas: arrayData[1].pizzas,
          bebidas: arrayData[1].bebidas,
          ingredientes: arrayData[1].ingredientes,
          papas: arrayData[1].papas,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(products);
  }, []);
  // DataGrid
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e);
  };
  // Valores de las columnas DataGrid
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button color="primary" component="label">
          ICONO
        </Button>
      ),
    },
    {
      field: 'pizzas', // este field es lo que esta en el map.
      headerName: 'Pizzas', // titulo de la tabla
      minWidth: 100,
    },
    {
      field: 'preciopizzas',
      headerName: '$',
      minWidth: 100,
    },
    {
      field: 'bebidas',
      headerName: 'Bebidas',
      minWidth: 100,
    },
    {
      field: 'preciobebidas',
      headerName: '$',
      minWidth: 100,
    },
    {
      field: 'ingredientes',
      headerName: 'Ingredientes',
      minWidth: 100,
    },
    {
      field: 'precioingredientes',
      headerName: '$',
      minWidth: 100,
    },
    {
      field: 'papas',
      headerName: 'Papas',
      minWidth: 100,
    },
    {
      field: 'preciopapas',
      headerName: '$',
      minWidth: 100,
    },
  ];
  const rows = products.bebidas?.map((process, i) => ({
    actions: i,
    id: i,
    bebidas: process.nombre,
    preciobebidas: process.precio,
    /* preciopizzas: process.precio,
    precioingredientes: process.precio,
    preciopapas: process.precio,
    pizzas: process.nombre,
    ingredientes: process.nombre,
    papas: process.nombre, */
  }));
  products.pizzas?.map((process, i) => ({
    actions: i,
    id: i,
    pizzas: process.nombre,
    preciopizzas: process.precio,
  }));
  return (
    <DataGrid
      showColumnRightBorder
      disableSelectionOnClick
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      onPageSizeChange={handleChangeRowsPerPage}
      rows={rows}
      columns={columns}
      pageSize={rowsPerPage}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          color: ' #676767',
          backgroundColor: '#f7f7f7',
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'left',
        },
        '& .MuiDataGrid-menuIconButton': { marginRight: '.5rem' },
        '& .MuiDataGrid-menuIconButton:hover': {
          backgroundColor: 'primary.main',
          color: 'primary.white',
        },
        '& .MuiDataGrid-cell': { width: '100%' },
      }}
    />
  );
};
export default DashboardApp;
