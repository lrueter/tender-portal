import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as dotenv from 'dotenv';
import { storage } from '../services/firebase';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY!,
  }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function migrateFiles() {
  try {
    // List all files in S3
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.VITE_AWS_BUCKET_NAME!,
    });

    const s3Files = await s3Client.send(listCommand);
    
    if (!s3Files.Contents) {
      console.log('No files found in S3');
      return;
    }

    console.log(`Found ${s3Files.Contents.length} files to migrate`);

    // Migrate each file
    for (const file of s3Files.Contents) {
      if (!file.Key) continue;

      console.log(`Migrating ${file.Key}...`);

      // Get file from S3
      const getCommand = new GetObjectCommand({
        Bucket: process.env.VITE_AWS_BUCKET_NAME!,
        Key: file.Key,
      });

      const s3Response = await s3Client.send(getCommand);
      
      if (!s3Response.Body) {
        console.log(`Failed to get content for ${file.Key}`);
        continue;
      }

      // Convert stream to buffer
      const chunks = [];
      for await (const chunk of s3Response.Body as any) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Upload to Firebase
      const storageRef = ref(storage, file.Key);
      await uploadBytes(storageRef, fileBuffer, {
        contentType: s3Response.ContentType || 'application/octet-stream'
      });

      console.log(`Successfully migrated ${file.Key}`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrateFiles();

const uploadMarkdownExample = async () => {
  const content = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // PDF magic numbers
  
  try {
    const markdownRef = ref(storage, 'markdown/markdown_example.md');
    await uploadBytes(markdownRef, content, {
      contentType: 'text/markdown'
    });
    console.log('Markdown file uploaded successfully');
  } catch (error) {
    console.error('Error uploading markdown:', error);
  }
};

uploadMarkdownExample(); 