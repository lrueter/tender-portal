import { useState, useEffect } from 'react';
import { 
  ImageList, 
  ImageListItem, 
  ImageListItemBar,
  CircularProgress,
  Alert,
  Box,
  Typography
} from '@mui/material';
import { fetchDocumentsFromFolder } from '../services/storage';
import { Document } from '../types';

const PictureGallerySection = () => {
  const [pictures, setPictures] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} gap={8}>
      {pictures.map((picture) => (
        <ImageListItem key={picture.name}>
          <img
            src={picture.url}
            alt={picture.name}
            loading="lazy"
            style={{ 
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
          <ImageListItemBar
            title={picture.name}
            position="bottom"
            sx={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              '& .MuiImageListItemBar-title': {
                color: 'white',
                fontSize: '0.875rem'
              }
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PictureGallerySection; 