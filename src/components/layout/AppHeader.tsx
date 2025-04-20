import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Box,
  alpha,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { auth } from '../../firebase/config';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface AppHeaderProps {
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export function AppHeader({ tabValue, onTabChange }: AppHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="static" sx={{ 
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none',
        borderBottom: `1px solid ${alpha('#fff', 0.1)}`
      }}>
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { xs: '56px', sm: '64px' }
        }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              letterSpacing: '0.5px',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Trade Tender Portal
          </Typography>

          {!isMobile && (
            <Tabs 
              value={tabValue} 
              onChange={onTabChange}
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#fff',
                  height: 3,
                  transition: theme => theme.transitions.create(['width', 'left'], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                },
                '& .MuiTab-root': {
                  color: alpha('#fff', 0.7),
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minHeight: '56px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: { xs: 2, sm: 4 },
                  transition: theme => theme.transitions.create(
                    ['color', 'background-color', 'padding'],
                    { duration: theme.transitions.duration.shorter }
                  ),
                  '&.Mui-selected': {
                    color: '#fff',
                  },
                  '&:hover': {
                    color: '#fff',
                    opacity: 1,
                    backgroundColor: alpha('#fff', 0.1),
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
                label="Picture Gallery" 
                icon={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', mb: 0.5 }} />}
                iconPosition="start"
              />
              <Tab 
                label="Upload Files" 
                icon={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', mb: 0.5 }} />}
                iconPosition="start"
              />
              <Tab 
                label="Quote Submission" 
                icon={<Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', mb: 0.5 }} />}
                iconPosition="start"
              />
            </Tabs>
          )}

          <Button 
            color="inherit" 
            onClick={() => auth.signOut()}
            sx={{ 
              ml: 2,
              '&:hover': {
                backgroundColor: alpha('#fff', 0.1),
              }
            }}
          >
            Sign Out
          </Button>
        </Toolbar>

        {isMobile && (
          <BottomNavigation
            value={tabValue}
            onChange={(_, newValue) => onTabChange(_, newValue)}
            showLabels
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.appBar,
              boxShadow: 3,
              backgroundColor: theme.palette.primary.main,
              height: '72px',
              '& .MuiBottomNavigationAction-root': {
                color: alpha('#fff', 0.7),
                minWidth: '80px',
                padding: '8px 0',
                '&.Mui-selected': {
                  color: '#fff',
                },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.875rem',
                  '&.Mui-selected': {
                    fontSize: '0.875rem',
                  }
                }
              },
            }}
          >
            <BottomNavigationAction 
              label="Project" 
              icon={<DescriptionIcon />} 
            />
            <BottomNavigationAction 
              label="Gallery" 
              icon={<PhotoLibraryIcon />} 
            />
            <BottomNavigationAction 
              label="Upload" 
              icon={<CloudUploadIcon />} 
            />
            <BottomNavigationAction 
              label="Quote" 
              icon={<AttachMoneyIcon />} 
            />
          </BottomNavigation>
        )}
      </AppBar>
    </>
  );
} 