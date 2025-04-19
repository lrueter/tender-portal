import { Container, Paper, Typography } from '@mui/material';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { auth } from '../firebase/config';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider 
} from 'firebase/auth';

const LoginPage = () => {
  // Configure FirebaseUI.
  const uiConfig = {
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
    callbacks: {
      signInSuccessWithAuthResult: () => false // Don't redirect after sign in
    }
  };

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
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Paper>
    </Container>
  );
};

export default LoginPage; 