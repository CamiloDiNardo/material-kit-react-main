import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, getDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const DashboardApp = () => {
  const [products, setProducts] = useState({ bebidas: [] });
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await getDocs(collection(db, 'products'));
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(arrayData);
        setProducts({ bebidas: arrayData[1].bebidas });
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
    console.log(products);
  }, []);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  // METHODS
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e);
  };
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button color="primary" component="label">
          CUALQUIER ICONO
        </Button>
      ),
    },
    {
      field: 'precio',
      headerName: 'Precio',
      minWidth: 100,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: 200,
    },
  ];
  const rows =
    products.bebidas.lenght > 0
      ? products.bebidas.map((process, i) => ({
          actions: i,
          id: i,
          precio: process.precio,
          nombre: process.nombre,
        }))
      : [];
  return (
    <DataGrid
      showColumnRightBorder
      disableSelectionOnClick
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      onPageSizeChange={handleChangeRowsPerPage}
      rows={rows || []}
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
