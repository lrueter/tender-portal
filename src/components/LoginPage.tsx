import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Container, Paper, Typography, Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const LoginPage = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
        <Button
          variant="contained"
          onClick={signInWithGoogle}
          startIcon={<GoogleIcon />}
          fullWidth
        >
          Sign in with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage; 