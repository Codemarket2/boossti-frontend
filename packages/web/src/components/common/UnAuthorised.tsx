import { useState } from 'react';
import Button from '@mui/material/Button';
import AuthScreen from '../../screens/AuthScreen';
import Overlay from './Overlay';

export default function UnAuthorised({
  caption = 'Please Sign In to access this page!',
}: {
  caption?: string;
}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <div className="mt-3 py-5">
      <h2 className="text-center">{caption}</h2>
      <div className="d-flex justify-content-center errorPageContentWrap">
        <Button variant="contained" color="primary" onClick={() => setShowAuthModal(true)}>
          SIGN IN
        </Button>
        {showAuthModal && (
          <Overlay onClose={() => setShowAuthModal(false)} open={showAuthModal} minWidth="60vw">
            <div className="container pt-2">
              <AuthScreen />
            </div>
          </Overlay>
        )}
      </div>
    </div>
  );
}
