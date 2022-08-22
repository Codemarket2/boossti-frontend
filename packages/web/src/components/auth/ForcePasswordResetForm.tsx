// MUI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// SHARED
import {
  useForcePasswordReset,
  IuseForcePwdResetHookArgs,
} from '@frontend/shared/hooks/auth/forcePasswordReset';

// OTHERS
import { onAlert } from '../../utils/alert';
import PasswordInput from '../common/PasswordInput';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

export interface IForcePwdResetFormProps {
  username: string;
  oldPassword: string;

  onSuccess?: IuseForcePwdResetHookArgs['onSuccess'];

  /**
   * this callback is fired if user want's to cancel the Force Password Reset operation
   * if not specified then `cancel button` get's hidden
   * */
  onCancel?: () => void;
}

const ForcePwdResetForm = ({
  username,
  oldPassword,
  onSuccess,
  onCancel,
}: IForcePwdResetFormProps) => {
  const [formik] = useForcePasswordReset({
    onAlert,
    oldPassword,
    username,
    onSuccess,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} data-testid="force-password-reset-form">
        <InputGroup>
          <Typography>Force Password Reset</Typography>
        </InputGroup>

        <InputGroup>
          <PasswordInput
            fullWidth
            label="New Password*"
            variant="outlined"
            name="newPassword"
            
            size="small"
            labelWidth={80}
            disabled={formik.isSubmitting}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Confirm New Password*"
            variant="outlined"
            name="confirmNewPassword"
            
            size="small"
            labelWidth={140}
            disabled={formik.isSubmitting}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton fullWidth type="submit" loading={formik.isSubmitting} className="mt-2">
            Change Password
          </LoadingButton>
        </InputGroup>
        {onCancel && (
          <InputGroup>
            <LoadingButton
              fullWidth
              type="button"
              variant="outlined"
              onClick={onCancel}
              loading={formik.isSubmitting}
            >
              Cancel
            </LoadingButton>
          </InputGroup>
        )}
      </form>
    </>
  );
};

export default ForcePwdResetForm;
