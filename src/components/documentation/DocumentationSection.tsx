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
import { fetchDocumentsFromFolder } from '../../services/storage';
import { Document } from '../../types';
import { styles } from './styles';

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await fetchDocumentsFromFolder('documentation');
      setDocuments(docs);
      setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={styles.loadingBox}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={styles.container}>
      {documents.length === 0 ? (
        <Paper sx={styles.emptyPaper}>
          <Typography color="text.secondary">
            No documents found
          </Typography>
        </Paper>
      ) : (
        <List sx={styles.list}>
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
      )}
    </Box>
  );
};

export default DocumentationSection; 