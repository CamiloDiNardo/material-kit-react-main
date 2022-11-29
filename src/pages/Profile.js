import React from 'react';
import { Card, CardContent, Box, Button, Typography, Divider, CardActions } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
  const { cerrarSesion, user } = useAuthContext();
  return (
    // falta poder mostrar usuarios sin foto de google
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img alt="GooglePhoto" src={user.photoURL} />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.displayName} {user.photoURL}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text" onClick={cerrarSesion}>
          Cerrar Sesion
        </Button>
      </CardActions>
    </Card>
  );
};
export default Profile;
