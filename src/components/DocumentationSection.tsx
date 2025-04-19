import { useState, useEffect } from 'react';
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { CircularProgress, Alert } from '@mui/material';

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Array<{ name: string; url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        console.log('Fetching documents...');
        const documentsRef = ref(storage, 'documents');
        console.log('Documents ref:', documentsRef);
        
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
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <h2>Documentation</h2>
      {documents.length === 0 ? (
        <p>No documents found in the documents folder</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.name}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentationSection; 