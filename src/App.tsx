import { Container, Paper, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useClerk } from '@clerk/clerk-react';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import AuthWrapper from './components/AuthWrapper';

// Create a separate component for the authenticated content
const AuthenticatedApp = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Trade Tender Portal
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
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

// Main App component
function App() {
  return (
    <AuthWrapper>
      <AuthenticatedApp />
    </AuthWrapper>
  );
}

export default App; 