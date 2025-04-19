import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { OpenInNew as OpenIcon } from '@mui/icons-material';

interface Project {
  id: string;
  title: string;
  description: string;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description for Project 1'
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description for Project 2'
  },
  {
    id: '3',
    title: 'Project 3',
    description: 'Description for Project 3'
  }
];

const ProjectsSection = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {SAMPLE_PROJECTS.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<OpenIcon />}
                  onClick={() => console.log(`Open project ${project.id}`)}
                >
                  Open Project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectsSection; 