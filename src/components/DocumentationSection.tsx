import { useState, useEffect } from 'react';
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
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

interface Document {
  name: string;
  url: string;
}

// Styles object to keep JSX clean
const styles = {
  container: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto'
  },
  loadingBox: {
    textAlign: 'center',
    padding: '2rem'
  },
  emptyPaper: {
    p: 3,
    bgcolor: 'background.default'
  },
  listItem: {
    '&:hover': {
      bgcolor: 'action.hover',
    },
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 1, // Add rounded corners to individual items
    mb: 1 // Add margin between items
  },
  documentName: {
    color: 'primary.main',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const documentsRef = ref(storage, 'documentation');
      const result = await listAll(documentsRef);
      
      const docs = await Promise.all(
        result.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item)
        }))
      );
      
      setDocuments(docs);
      setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyState = () => (
    <Paper sx={styles.emptyPaper}>
      <Typography color="text.secondary">
        No documents found in the documentation folder
      </Typography>
    </Paper>
  );

  const renderDocumentList = () => (
    <List>
      {documents.map((doc) => (
        <ListItem
          key={doc.name}
          component="a"
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          button
          sx={styles.listItem}
        >
          <ListItemIcon>
            <DocumentIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={doc.name}
            primaryTypographyProps={{
              sx: styles.documentName
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={styles.container}>
      {documents.length === 0 ? renderEmptyState() : renderDocumentList()}
    </Box>
  );
};

export default DocumentationSection; 