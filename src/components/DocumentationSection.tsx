import { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Link,
  Alert,
  Typography 
} from '@mui/material';
import { Description as DocumentIcon } from '@mui/icons-material';
import { fetchDocumentsFromFolder } from '../services/storage';
import { Document } from '../types';

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const docs = await fetchDocumentsFromFolder('documentation');
        setDocuments(docs);
        setError(null);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (loading) {
    return <Typography>Loading documents...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (documents.length === 0) {
    return <Typography>No documents available.</Typography>;
  }

  return (
    <List>
      {documents.map((doc) => (
        <ListItem key={doc.name}>
          <ListItemIcon>
            <DocumentIcon />
          </ListItemIcon>
          <ListItemText>
            <Link href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default DocumentationSection; 