import { useState, useEffect } from 'react';
import { 
  Grid,
  Dialog,
  DialogContent,
  CircularProgress,
  Alert,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { fetchDocumentsFromFolder } from '../services/storage';
import { Document } from '../types';

const PictureGallerySection = () => {
  const [pictures, setPictures] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Document | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadPictures = async () => {
      try {
        const pics = await fetchDocumentsFromFolder('pictures');
        setPictures(pics);
        setError(null);
      } catch (err) {
        console.error('Error fetching pictures:', err);
        setError('Failed to load pictures. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPictures();
  }, []);

  const handleImageClick = (picture: Document) => {
    setSelectedImage(picture);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (pictures.length === 0) {
    return <Typography>No pictures available.</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {pictures.map((picture) => (
          <Grid item xs={12} sm={6} md={4} key={picture.name}>
            <Box
              onClick={() => handleImageClick(picture)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  '& .image-overlay': {
                    opacity: 1,
                  },
                },
              }}
            >
              <img
                src={picture.url}
                alt={picture.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  display: 'block',
                }}
              />
              <Box
                className="image-overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  padding: '16px',
                  color: 'white',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '0 0 4px 4px',
                }}
              >
                <Typography variant="subtitle2">{picture.name}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PictureGallerySection; 