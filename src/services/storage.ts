import { storage } from './firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Document } from '../types';

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
  const fileName = `${folderPath}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, fileName);
  
  const arrayBuffer = await file.arrayBuffer();
  await uploadBytes(fileRef, arrayBuffer, {
    contentType: options?.contentType || file.type
  });
  
  return await getDownloadURL(fileRef);
}; 