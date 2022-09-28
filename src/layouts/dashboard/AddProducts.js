import { useState } from 'react';
import { Grid, Typography, Button, Modal, Box, TextField } from '@mui/material';
import swal from 'sweetalert';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';

const style = {
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

const AddProducts = () => {
  // campos firebase
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const productscollection = collection(db, 'products');

  const addProducts = (e) => {
    e.preventDefault();
    addDoc(productscollection, { name, price })
      .then(swal('Good job!', 'Product has been added !', 'success'))
      .catch((err) => swal(err.message));
    setOpen(false);
  };
  return (
    <>
      <Grid
        style={{
          height: '20vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      />
      <Button onClick={handleOpen} variant="contained">
        Add
      </Button>
      <Modal
        style={{ padding: '40px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            item
          >
            <Button variant="contained" onClick={handleClose}>
              X
            </Button>
          </Grid>
          <Typography style={{ textAlign: 'center', color: '#fff' }} id="modal-modal-title" variant="h3" component="h2">
            Add Product
          </Typography>
          <form
            onSubmit={addProducts}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              style={{ width: '80%', margin: '15px', backgroundColor: '#fff' }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              type="number"
              style={{ width: '80%', margin: '15px', backgroundColor: '#fff' }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              required
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              style={{
                margin: '10px',
                padding: '15px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                width: '40%',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              type="submit"
              value="Add"
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddProducts;
