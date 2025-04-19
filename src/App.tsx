import { useState } from 'react';
import { Box, Container, Paper, Typography, ThemeProvider } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { theme } from './theme/theme';
import { TabPanel } from './components/layout/TabPanel';
import { AppHeader } from './components/layout/AppHeader';
import { LoadingState } from './components/layout/LoadingState';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import LoginPage from './components/LoginPage';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading || error) {
    return <LoadingState isLoading={loading} error={error} />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppHeader tabValue={tabValue} onTabChange={handleTabChange} />

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