import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import { collection, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import Iconify from '../../components/Iconify';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  // estado del filtrado
  const [search, setSearch] = useState('');
  // funcion de busqueda
  const searcher = (e) => {
    // con esto capturamos cada letra que tipea el usuario
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  // metodo de filtrado (si el usuario no escribe nada mostramos la tabla x defecto, si escribe algo)
  /* let results = [];
   if (!search) {
   results = products;
   } else {
   results = products.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()));
   } */
  // metodo 2 con operadores ternarios:

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input // al input le ponemos el valor del search y un onChange para que al escribir se cambien los valores que devuele
              type="text"
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              onChange={searcher}
              value={search}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
