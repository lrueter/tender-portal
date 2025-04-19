import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Button, 
  Tabs, 
  Tab, 
  ThemeProvider, 
  createTheme,
  CircularProgress 
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import LoginPage from './components/LoginPage';

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
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
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
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar 
          position="static" 
          sx={{ 
            boxShadow: 3,
            background: 'linear-gradient(to right, #1976d2, #1565c0)'
          }}
        >
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: '72px',
              px: { xs: 2, sm: 4 }
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: { xs: '1.1rem', sm: '1.3rem' }
              }}
            >
              Trade Tender Portal
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => auth.signOut()}
              sx={{
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Logout
            </Button>
          </Toolbar>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#fff',
                height: 3,
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                minHeight: '56px',
                textTransform: 'none',
                fontWeight: 500,
                px: { xs: 2, sm: 4 },
                '&.Mui-selected': {
                  color: '#fff',
                },
                '&:hover': {
                  color: '#fff',
                  opacity: 1,
                },
              },
              mb: 1
            }}
          >
            <Tab 
              label="Project & Documentation" 
              icon={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', mb: 0.5 }} />}
              iconPosition="start"
            />
            <Tab 
              label="Quote Submission" 
              icon={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', mb: 0.5 }} />}
              iconPosition="start"
            />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
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
            </Box>
          </Container>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Quote Submission
                </Typography>
                <QuoteUploadSection />
              </Paper>
            </Box>
          </Container>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App; 