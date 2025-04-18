import { useState } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const QuoteUploadSection = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Please upload a PDF file' });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setMessage({ 
        type: 'error', 
        text: `File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      // Convert file to ArrayBuffer
      const fileBuffer = await file.arrayBuffer();

      const s3Client = new S3Client({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        }
      });

      const fileName = `quotes/${Date.now()}-${file.name}`;
      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: 'application/pdf'
      });

      await s3Client.send(command);
      setMessage({ type: 'success', text: 'Quote uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage({ type: 'error', text: 'Failed to upload quote. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Typography gutterBottom>
        Please upload your quote as a PDF file (max {MAX_FILE_SIZE / 1024 / 1024}MB):
      </Typography>

      <Box sx={{ mt: 2 }}>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="quote-file-upload"
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        <label htmlFor="quote-file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
            disabled={uploading}
          >
            Upload Quote
          </Button>
        </label>
      </Box>

      {message && (
        <Alert severity={message.type} sx={{ mt: 2 }}>
          {message.text}
        </Alert>
      )}
    </Box>
  );
};

export default QuoteUploadSection; 