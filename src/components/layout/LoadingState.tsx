import { Container, Typography, CircularProgress } from '@mui/material';

interface LoadingStateProps {
  isLoading: boolean;
  error?: Error | null;
}

export function LoadingState({ isLoading, error }: LoadingStateProps) {
  if (isLoading) {
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

  return null;
} 