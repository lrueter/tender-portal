import { useState, useCallback } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const QuoteUploadSection = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <Box>
      <Typography gutterBottom>
        Please upload your quote as a PDF file (max {MAX_FILE_SIZE / 1024 / 1024}MB):
      </Typography>

      <Paper
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          mt: 2,
          p: 3,
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : 'grey.300',
          borderRadius: 1,
          backgroundColor: dragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px'
        }}
      >
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="quote-file-upload"
          type="file"
          onChange={handleChange}
          disabled={uploading}
        />
        <label htmlFor="quote-file-upload" style={{ width: '100%', textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Upload sx={{ fontSize: 48, color: 'grey.500' }} />
          </Box>
          <Typography variant="body1" gutterBottom>
            {dragActive ? 'Drop your PDF here' : 'Drag and drop your PDF here, or click to select'}
          </Typography>
          <Button
            variant="contained"
            component="span"
            disabled={uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Uploading...
              </>
            ) : (
              'Select File'
            )}
          </Button>
        </label>
      </Paper>

      {message && (
        <Alert severity={message.type} sx={{ mt: 2 }}>
          {message.text}
        </Alert>
      )}
    </Box>
  );
};

export default QuoteUploadSection; 