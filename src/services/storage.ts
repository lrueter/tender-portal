import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Document } from '../types';
import { auth } from '../firebase/config';

export const fetchDocumentsFromFolder = async (folderPath: string): Promise<Document[]> => {
  const folderRef = ref(storage, folderPath);
  const result = await listAll(folderRef);
  
  return Promise.all(
    result.items.map(async (item) => ({
      name: item.name,
      url: await getDownloadURL(item)
    }))
  );
};

export const uploadFile = async (
  file: File, 
  folderPath: string,
  options?: { contentType?: string }
): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload files');
  }

  const fileName = `${folderPath}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, fileName);
  
  const arrayBuffer = await file.arrayBuffer();
  await uploadBytes(fileRef, arrayBuffer, {
    contentType: options?.contentType || file.type,
    customMetadata: {
      uploadedBy: auth.currentUser.uid
    }
  });
  
  return await getDownloadURL(fileRef);
}; 