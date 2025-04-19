import { useState, useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { storage } from '../firebase/config';
import { ref, getBytes } from 'firebase/storage';

const ProjectSection = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const markdownRef = ref(storage, 'markdown/markdown_example.md');
        
        // Get the bytes directly instead of using fetch
        const bytes = await getBytes(markdownRef);
        const content = new TextDecoder().decode(bytes);
        
        setMarkdownContent(content);
        setError(null);
      } catch (error) {
        console.error('Error fetching markdown content:', error);
        setError('Failed to load project description. Please make sure the file exists in Firebase Storage.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownContent();
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
    <div className="markdown-content">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default ProjectSection; 