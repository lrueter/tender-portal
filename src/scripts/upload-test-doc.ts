import { storage } from '../firebase/config';
import { ref, uploadString } from 'firebase/storage';

const uploadTestDocument = async () => {
  try {
    const docRef = ref(storage, 'documents/test-doc.txt');
    await uploadString(docRef, 'This is a test document');
    console.log('Test document uploaded successfully');
  } catch (error) {
    console.error('Error uploading test document:', error);
  }
};

uploadTestDocument(); 