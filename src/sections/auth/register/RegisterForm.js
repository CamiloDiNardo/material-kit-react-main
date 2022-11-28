import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from '../../../components/hook-form';
// auth
import { useAuthContext } from '../../../context/AuthContext';

export default function RegisterForm() {
  const { registrerEmailandPassword } = useAuthContext();
  const defaultValues = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
  });
  // resetear el form
  const onResetFormData = () => {
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(registrerEmailandPassword)}>
      <RHFTextField control={control} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Register
      </LoadingButton>
      <LoadingButton fullWidth size="large" type="submit" variant="outlined" onClick={onResetFormData}>
        Reset
      </LoadingButton>
    </form>
  );
}
