import { useInstallApp } from '@frontend/shared/hooks/app/installApp';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { onAlert } from '../../utils/alert';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';

interface AppWrapper {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapper) {
  const setting = useSelector((state: any) => state.setting);
  const { handleInstall, installLoading } = useInstallApp({ onAlert });

  if (!setting?.isApp) {
    return <NotFound />;
  }

  if (!setting?.appResponse?._id || setting?.appError) {
    return <ErrorLoading error={setting?.appError && { message: setting?.appError }} />;
  }

  if (!setting?.isInstalled) {
    return (
      <div className="mt-5 pt-5 container d-flex flex-column justify-content-center align-items-center">
        <Typography variant="h5">You have not installed the App!</Typography>
        <LoadingButton
          variant="contained"
          className="mt-4"
          onClick={handleInstall}
          loading={installLoading}
        >
          Install Now
        </LoadingButton>
      </div>
    );
  }

  return <>{children}</>;
}
