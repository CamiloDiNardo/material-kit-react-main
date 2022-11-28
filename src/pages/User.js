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
  TablePagination,
  Checkbox,
} from '@mui/material';
import swal from 'sweetalert';
import { collection, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { UserListToolbar } from '../sections/@dashboard/user';
import AddUsers from '../layouts/dashboard/AddUsers';
import { db } from '../firebaseConfig/firebase';
import Label from '../components/Label';

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
const User = () => {
  // datos firebase
  const [data, setData] = useState([]);
  // campos firebase
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [verified, setVerified] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  // abrir y cerrar botones
  const [open, setOpen] = useState(false);
  // Cambiar la pagina de la tabla.
  const [page, setPage] = useState(0);

  // Numero de resultados minimos por pagina
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // cerrar la x del modal sweat
  const close = () => {
    setOpen(false);
  };
  // conectamos con la coleccion
  const userscollection = collection(db, 'users');

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
        const docRef = doc(userscollection, id);
        deleteDoc(docRef);
      } else {
        swal('Your data row is safe!');
      }
    });
  };
  // Mostrar los datos en tiempo real, y usamos value que va a tener esta caracteristica.
  useEffect(() => {
    const snap = onSnapshot(userscollection, (snapshot) => {
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
    const editRef = doc(db, 'users', id);
    updateDoc(editRef, { name, company, role, verified, status });
    setOpen(false);
    swal('Your data row file has been Updated!', {
      icon: 'success',
    });
  };
  // cambiar de pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Para cambiar las columnas segun que boton usemos.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <UserListToolbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <AddUsers />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Verified</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value) => (
              <TableRow key={value.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {value.value.name}
                </TableCell>
                <TableCell align="center"> {value.value.company} </TableCell>
                <TableCell align="center"> {value.value.role} </TableCell>
                <TableCell align="center"> {value.value.verified} </TableCell>
                <TableCell align="center">
                  <Label // Este Label sirve para poner un ghost que tenga color rojo si dice Banned y sino color verde. lo usamos como valor el label. (siguen saliendo de la base de datos los valores Banned y Active.)
                    sx={{ minWidth: 50 }}
                    variant="ghost"
                    color={(value.value.status === 'Banned' && 'error') || 'success'}
                  >
                    {value.value.status}
                  </Label>
                </TableCell>
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
              </TableRow> /* count={value.value.length} */
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} /* Opciones de cuantas filas queremos mostrar */
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
            Edit Users
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
              type="text"
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Company"
              variant="outlined"
              required
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              type="text"
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Role"
              variant="outlined"
              required
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
              type="text"
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Verified"
              variant="outlined"
              required
              onChange={(e) => setVerified(e.target.value)}
            />
            <TextField
              type="text"
              style={{ width: '80%', margin: '0.9375rem', backgroundColor: '#fff' }}
              label="Status"
              variant="outlined"
              required
              onChange={(e) => setStatus(e.target.value)}
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

export default User;
