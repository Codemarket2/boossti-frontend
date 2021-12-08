import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AuthScreen from '../../screens/AuthScreen';

export default function UnAuthorised() {
  const [showAuthModal, setshowAuthModal] = useState(false);
  return (
    <div className="mt-3 py-5">
      <h2 className="text-center">Please Sign In to access this page!</h2>
      <div className="d-flex justify-content-center errorPageContentWrap">
        <Button variant="contained" color="primary" onClick={() => setshowAuthModal(true)}>
          SIGN IN
        </Button>
        {showAuthModal && (
          <Dialog fullScreen open={showAuthModal}>
            <div className="container pt-2">
              <AuthScreen />
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
