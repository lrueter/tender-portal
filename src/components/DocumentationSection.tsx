import { useState, useEffect } from 'react';
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { 
  CircularProgress, 
  Alert, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Box 
} from '@mui/material';
import { Description as DocumentIcon } from '@mui/icons-material';

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Array<{ name: string; url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        console.log('Fetching documents...');
        const documentsRef = ref(storage, 'documentation');
        console.log('Documentation ref:', documentsRef);
        
        const result = await listAll(documentsRef);
        console.log('List result:', result);
        console.log('Number of items found:', result.items.length);
        
        const docs = await Promise.all(
          result.items.map(async (item) => {
            console.log('Processing item:', item.name);
            const url = await getDownloadURL(item);
            console.log('Got URL for:', item.name, url);
            return {
              name: item.name,
              url: url
            };
          })
        );
        
        console.log('Processed documents:', docs);
        setDocuments(docs);
        setError(null);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '2rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Documentation
      </Typography>
      {documents.length === 0 ? (
        <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography color="text.secondary">
            No documents found in the documentation folder
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <List>
            {documents.map((doc) => (
              <ListItem
                key={doc.name}
                component="a"
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                button
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <ListItemIcon>
                  <DocumentIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={doc.name}
                  primaryTypographyProps={{
                    sx: { 
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default DocumentationSection; 