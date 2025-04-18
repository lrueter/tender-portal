import { Container, Paper, Typography, Box } from '@mui/material';
import DocumentationSection from './components/DocumentationSection';
import QuoteUploadSection from './components/QuoteUploadSection';

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Trade Tender Portal
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
  );
}

export default App; 