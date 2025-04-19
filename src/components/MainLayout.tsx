import { useState } from 'react';
import { Tabs, Tab, Box, AppBar } from '@mui/material';
import { Description, Assignment, Folder } from '@mui/icons-material';
import DocumentationSection from './DocumentationSection';
import QuoteSection from './QuoteSection';
import ProjectsSection from './ProjectsSection';

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
      id={`tabpanel-${index}`}
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

const MainLayout = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<Folder />} label="Projects" />
          <Tab icon={<Description />} label="Documentation" />
          <Tab icon={<Assignment />} label="Quote Submission" />
        </Tabs>
      </AppBar>

      <TabPanel value={selectedTab} index={0}>
        <ProjectsSection />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <DocumentationSection />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <QuoteSection />
      </TabPanel>
    </Box>
  );
};

export default MainLayout; 