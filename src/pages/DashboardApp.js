/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TextField,
  Modal,
  Box,
} from '@mui/material';
import swal from 'sweetalert';
import { collection, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import AddProducts from '../layouts/dashboard/AddProducts';
import { db } from '../firebaseConfig/firebase';
// css modal
const modalSweet = {
  width: '80%',
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 700,
  backgroundColor: 'black',
  padding: 4,
};

const DashboardApp = () => {
  // datos firebase
  const [data, setData] = useState([]);
  // campos firebase
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [id, setId] = useState('');
  // abrir y cerrar botones
  const [open, setOpen] = useState(false);

  // cerrar la x del modal sweat
  const close = () => {
    setOpen(false);
  };
  // conectamos con la coleccion
  const productscollection = collection(db, 'products');

  // Boton eliminar funcionalidad con swal
  const deleteButton = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'want to delete this data row permanently?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((Delete) => {
      if (Delete) {
        swal('Your data row has been deleted.', {
          icon: 'success',
        });
        // si se clickea en OK  eliminamos el documento, x cada documento hay una fila. asi que eliminariamos la fila tmb
        const docRef = doc(productscollection, id);
        deleteDoc(docRef);
      } else {
        swal('Your data row is safe!');
      }
    });
  };
  // Mostrar los datos en tiempo real con OnSnapshot, y usamos value que va a tener esta caracteristica.
  useEffect(() => {
    const snap = onSnapshot(productscollection, (snapshot) => {
      setData(
        snapshot.docs.map((value) => ({
          id: value.id,
          value: value.data(),
        }))
      );
    });
    return () => {
      snap();
    };
  }, []);

  // Boton editar
  const editButton = (id) => {
    setOpen(true);
    setId(id);
  };
  // actualizar data de firebase en los forms.del swal
  const updateData = (id) => {
    const editRef = doc(db, 'products', id);
    updateDoc(editRef, { name, price });
    setOpen(false);
    swal('Your data row file has been Updated!', {
      icon: 'success',
    });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <AddProducts />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value) => (
              <TableRow key={value.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {value.value.name}
                </TableCell>
                <TableCell align="center"> {value.value.price} </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      editButton(value.id);
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      deleteButton(value.id);
                    }}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal // Modal edit mui con sweet alert
        style={{ padding: '2.5rem' }}
        open={open}
        onClose={close}
      >
        <Box sx={modalSweet}>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'flex-end  ',
            }}
            item
          >
            <Button variant="contained" onClick={close}>
              X
            </Button>
          </Grid>
          <Typography style={{ textAlign: 'center', color: '#fff' }} variant="h3" component="h2">
            Edit Product
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateData(id);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <input type="text" value={id} readOnly hidden />
            <TextField
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Name"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              type="number"
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Price"
              variant="outlined"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              style={{
                margin: '0.625rem',
                padding: '0.9375rem',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                width: '40%',
                borderRadius: '0rem',
                cursor: 'pointer',
              }}
              type="submit"
              value="Edit"
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default DashboardApp;
