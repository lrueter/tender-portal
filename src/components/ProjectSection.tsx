import { useState, useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const ProjectSection = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const s3Client = new S3Client({
          region: import.meta.env.VITE_AWS_REGION,
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
          }
        });

        // First, list the contents of the markdown folder to find the file
        const listCommand = new ListObjectsV2Command({
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
          Prefix: 'markdown/'
        });

        const listResponse = await s3Client.send(listCommand);
        
        if (!listResponse.Contents || listResponse.Contents.length === 0) {
          throw new Error('No markdown files found in the markdown folder');
        }

        // Find the first markdown file
        const markdownFile = listResponse.Contents.find(file => 
          file.Key?.toLowerCase().endsWith('.md')
        );

        if (!markdownFile?.Key) {
          throw new Error('No markdown file found');
        }

        console.log('Found markdown file:', markdownFile.Key); // Debug log

        const command = new GetObjectCommand({
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
          Key: markdownFile.Key
        });

        const response = await s3Client.send(command);
        
        if (response.Body) {
          const reader = response.Body.getReader();
          const decoder = new TextDecoder('utf-8');
          let content = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            content += decoder.decode(value);
          }
          
          setMarkdownContent(content);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching markdown content:', error);
        setError('Failed to load project description. Please make sure the markdown file exists in the S3 bucket.');
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