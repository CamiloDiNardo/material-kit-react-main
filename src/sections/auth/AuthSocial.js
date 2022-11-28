// Aca tenemos los botones para registrarnos con google, fb, tw
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
// para redireccionarnos  a home si sale bien el auth.
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const navigate = useNavigate('/dashboard/app');
  const { loginGoogle, loginFacebook, loginTwitter } = useAuthContext();

  const HandleAuthGoogle = async () => {
    // Login with Google
    await loginGoogle();
    navigate('/dashboard/app', { replace: true });
  };
  // Login with Facebook
  const HandleAuthFacebook = async () => {
    await loginFacebook();
    navigate('/dashboard/app', { replace: true });
  };
  // Login with twitter
  const HandleAuthTwitter = async () => {
    await loginTwitter();
    navigate('/dashboard/app', { replace: true });
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={HandleAuthGoogle}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={HandleAuthFacebook}>
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={HandleAuthTwitter}>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
