import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Container, Paper, Typography } from '@mui/material';

// Configure FirebaseUI
const uiConfig = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    // You can add more providers here:
    // EmailAuthProvider.PROVIDER_ID,
    // PhoneAuthProvider.PROVIDER_ID,
    // GithubAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup', // Or 'redirect'
  callbacks: {
    signInSuccessWithAuthResult: () => false, // Don't redirect after sign in
  },
};

const LoginPage = () => {
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