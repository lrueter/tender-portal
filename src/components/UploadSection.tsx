import { useState, useCallback } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { uploadFile } from '../services/storage';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const UploadSection = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user] = useAuthState(auth);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpload = async (file: File) => {
    try {
      if (!user) {
        throw new Error('Please sign in to upload files');
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setMessage({ 
          type: 'error', 
          text: `File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
        });
        return;
      }

      // Validate file type based on selected tab
      if (tabValue === 0 && file.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Please upload a PDF file' });
        return;
      }
      if (tabValue === 1 && !file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please upload an image file' });
        return;
      }

      setUploading(true);
      setMessage(null);

      const folderPath = tabValue === 0 ? 'documentation' : 'pictures';
      await uploadFile(file, folderPath, {
        contentType: file.type
      });
      
      setMessage({ type: 'success', text: 'File uploaded successfully!' });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred during upload');
      }
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
      handleUpload(file);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <Box>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="PDF Upload" />
        <Tab label="Picture Upload" />
      </Tabs>

      <Typography gutterBottom>
        {tabValue === 0 
          ? `Please upload your PDF file (max ${MAX_FILE_SIZE / 1024 / 1024}MB):`
          : `Please upload your image file (max ${MAX_FILE_SIZE / 1024 / 1024}MB):`
        }
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
          accept={tabValue === 0 ? "application/pdf" : "image/*"}
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleChange}
          disabled={uploading}
        />
        <label htmlFor="file-upload" style={{ width: '100%', textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Upload sx={{ fontSize: 48, color: 'grey.500' }} />
          </Box>
          <Typography variant="body1" gutterBottom>
            {dragActive 
              ? `Drop your ${tabValue === 0 ? 'PDF' : 'image'} here` 
              : `Drag and drop your ${tabValue === 0 ? 'PDF' : 'image'} here, or click to select`
            }
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

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default UploadSection; 