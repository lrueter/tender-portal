import { useState } from 'react';
import { Container, Paper, Typography, Box, AppBar, Toolbar, Button, Tabs, Tab, ThemeProvider, createTheme } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import LoginPage from './components/LoginPage';
import { CircularProgress } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

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
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', height: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            centered
          >
            <Tab label="Tab One" />
            <Tab label="Tab Two" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Container maxWidth="lg">
            <Paper sx={{ p: 3, minHeight: '500px' }}>
              {/* Content for Tab One */}
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Tab One Content
              </Box>
            </Paper>
          </Container>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Container maxWidth="lg">
            <Paper sx={{ p: 3, minHeight: '500px' }}>
              {/* Content for Tab Two */}
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Tab Two Content
              </Box>
            </Paper>
          </Container>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App; 