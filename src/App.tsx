import { Container, Paper, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';

// Create a separate component for the authenticated content
const AuthenticatedApp = () => {
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Trade Tender Portal
          </Typography>
          <Button color="inherit" onClick={signOut}>
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
  const { user, signIn } = useAuth();

  if (!user) {
    return (
      <Container sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Trade Tender Portal
          </Typography>
          <Button 
            variant="contained" 
            onClick={signIn}
            startIcon={<img src="/google-icon.svg" alt="" width="18" height="18" />}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    );
  }

  return <AuthenticatedApp />;
}

export default App; 