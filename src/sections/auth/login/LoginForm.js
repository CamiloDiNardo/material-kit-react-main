// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { RHFCheckbox } from '../../../components/hook-form';
import { useAuthContext } from '../../../context/AuthContext';

export default function LoginForm() {
  const { loginEmailandPassword } = useAuthContext();

  const defaultValues = {
    email: '',
    password: '',
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
  });
  // resetear form
  const onResetFormData = () => {
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(loginEmailandPassword)}>
      <RHFCheckbox control={control} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ marginTop: '2rem' }}>
        Login
      </LoadingButton>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="outlined"
        onClick={onResetFormData}
        sx={{ marginTop: '2rem' }}
      >
        Reset
      </LoadingButton>
    </form>
  );
}
