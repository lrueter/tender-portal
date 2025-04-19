import { Container, Paper, Typography, Button, Stack, Alert, TextField, Box } from '@mui/material';
import { auth } from '../firebase/config';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react';
import { 
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async () => {
    try {
      setError(null);
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
      console.error('Authentication error:', error);
    }
  };

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
          {/* Email/Password Section */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleEmailAuth}
              startIcon={<EmailIcon />}
              fullWidth
            >
              {isSignUp ? 'Sign Up' : 'Sign In'} with Email
            </Button>
            <Button
              variant="text"
              onClick={() => setIsSignUp(!isSignUp)}
              size="small"
              sx={{ mt: 1 }}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Or continue with
          </Typography>

          {/* OAuth Providers */}
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