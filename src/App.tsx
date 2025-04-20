import { useState } from 'react';
import { Box, Container, Paper, Typography, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { TabPanel } from './components/layout/TabPanel';
import { AppHeader } from './components/layout/AppHeader';
import { LoadingState } from './components/layout/LoadingState';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';
import ProjectSection from './components/ProjectSection';
import PictureGallerySection from './components/PictureGallerySection';
import LoginPage from './components/LoginPage';
import UploadSection from './components/UploadSection';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        pb: isMobile ? '72px' : 0 // Updated padding to match new navigation bar height
      }}>
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
                  Picture Gallery
                </Typography>
                <PictureGallerySection />
              </Paper>
            </Box>
          </Container>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Upload Files
                </Typography>
                <UploadSection />
              </Paper>
            </Box>
          </Container>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
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