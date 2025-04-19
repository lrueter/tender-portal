import { Container, Paper, Typography, Button, Stack, Alert } from '@mui/material';
import { auth } from '../firebase/config';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useState } from 'react';
import { 
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (provider: any) => {
    try {
      setError(null);
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
      console.error('Authentication error:', error);
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
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={() => handleSignIn(new GoogleAuthProvider())}
            startIcon={<GoogleIcon />}
            fullWidth
          >
            Sign in with Google
          </Button>

          <Button
            variant="contained"
            onClick={() => handleSignIn(new GithubAuthProvider())}
            startIcon={<GitHubIcon />}
            fullWidth
            sx={{ bgcolor: '#24292e', '&:hover': { bgcolor: '#2f363d' } }}
          >
            Sign in with GitHub
          </Button>

          <Button
            variant="contained"
            onClick={() => handleSignIn(new TwitterAuthProvider())}
            startIcon={<TwitterIcon />}
            fullWidth
            sx={{ bgcolor: '#1DA1F2', '&:hover': { bgcolor: '#1a8cd8' } }}
          >
            Sign in with Twitter
          </Button>

          <Button
            variant="contained"
            onClick={() => handleSignIn(new FacebookAuthProvider())}
            startIcon={<FacebookIcon />}
            fullWidth
            sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}
          >
            Sign in with Facebook
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage; 