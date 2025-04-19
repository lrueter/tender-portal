import { Container, Paper, Typography } from '@mui/material';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider 
} from 'firebase/auth';

const LoginPage = () => {
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ],
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      tosUrl: '/terms-of-service', // Add your terms of service URL
      privacyPolicyUrl: '/privacy-policy' // Add your privacy policy URL
    };

    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      ui.delete();
    };
  }, []);

  return (
    <Container sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Trade Tender Portal
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please sign in to continue
        </Typography>
        <div id="firebaseui-auth-container" />
      </Paper>
    </Container>
  );
};

export default LoginPage; 