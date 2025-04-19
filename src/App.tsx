import { Container, Paper, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import LoginPage from './components/LoginPage';
import { CircularProgress } from '@mui/material';

// Create a separate component for the authenticated content
const AuthenticatedApp = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Trade Tender Portal
          </Typography>
          <Button color="inherit" onClick={() => auth.signOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Project
            </Typography>
            <ProjectSection />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Documentation
            </Typography>
            <DocumentationSection />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Quote Submission
            </Typography>
            <QuoteUploadSection />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

// Main App component with login screen
function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Container sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <AuthenticatedApp />;
}

export default App; 