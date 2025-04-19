import { Box, Fade, Grow, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ 
        transition: theme.transitions.create('opacity'),
        position: 'relative'
      }}
    >
      <Fade in={value === index} timeout={450}>
        <Box sx={{ p: 3 }}>
          <Grow 
            in={value === index} 
            timeout={450}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div>{children}</div>
          </Grow>
        </Box>
      </Fade>
    </div>
  );
} 