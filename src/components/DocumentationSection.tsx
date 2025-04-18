import { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Link,
  Alert 
} from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

interface Document {
  key: string;
  url: string;
}

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const s3Client = new S3Client({
          region: import.meta.env.VITE_AWS_REGION,
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
          }
        });

        const command = new ListObjectsV2Command({
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
          Prefix: 'documentation/'
        });

        const response = await s3Client.send(command);
        
        if (response.Contents) {
          const docs = response.Contents.map(item => ({
            key: item.Key!,
            url: `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${item.Key}`
          }));
          setDocuments(docs);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError('Failed to load documents. Please try again later.');
      }
    };

    fetchDocuments();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <List>
      {documents.map((doc) => (
        <ListItem key={doc.key}>
          <ListItemIcon>
            <PictureAsPdf />
          </ListItemIcon>
          <ListItemText>
            <Link href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.key.split('/').pop()}
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default DocumentationSection; 