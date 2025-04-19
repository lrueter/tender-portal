import { 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  EmailAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Alert,
  Stack,
  Divider,
  TextField
} from '@mui/material';
import { 
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon 
} from '@mui/icons-material';
import { useState } from 'react';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithGoogle = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithGithub = async () => {
    setError(null);
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleEmailAuth = async () => {
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    console.error('Authentication error:', error);
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An error occurred during authentication');
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
          {/* Email/Password Auth */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>

          <Divider>or</Divider>

          {/* OAuth Providers */}
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            startIcon={<GoogleIcon />}
            fullWidth
          >
            Sign in with Google
          </Button>
          
          <Button
            variant="contained"
            onClick={signInWithGithub}
            startIcon={<GitHubIcon />}
            fullWidth
            sx={{ bgcolor: '#24292e', '&:hover': { bgcolor: '#2f363d' } }}
          >
            Sign in with GitHub
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage; 