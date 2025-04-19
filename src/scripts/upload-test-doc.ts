import { storage } from '../firebase/config';
import { ref, uploadBytes } from 'firebase/storage';

const uploadTestDocument = async () => {
  try {
    // Create a simple PDF-like content (this is just for testing)
    const content = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // PDF magic numbers
    
    const docRef = ref(storage, 'documentation/test-document.pdf');
    await uploadBytes(docRef, content, {
      contentType: 'application/pdf'
    });
    console.log('Test document uploaded successfully');
  } catch (error) {
    console.error('Error uploading test document:', error);
  }
};

uploadTestDocument(); 