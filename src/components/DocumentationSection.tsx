import { useState, useEffect } from 'react';
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { CircularProgress, Alert } from '@mui/material';

const DocumentationSection = () => {
  const [documents, setDocuments] = useState<Array<{ name: string; url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documentsRef = ref(storage, 'documents');
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

    fetchDocuments();
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      const storageRef = ref(storage, `documents/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      setDocuments(prev => [...prev, { name: file.name, url }]);
      setError(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <h2>Documentation</h2>
      {documents.length === 0 ? (
        <p>No documents found</p>
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