import { storage } from '../firebase/config';
import { ref, uploadString } from 'firebase/storage';

const uploadMarkdownExample = async () => {
  const content = `# Project Description
This is an example markdown file.

## Features
- Feature 1
- Feature 2
- Feature 3
`;

  try {
    const markdownRef = ref(storage, 'markdown/markdown_example.md');
    await uploadString(markdownRef, content);
    console.log('Markdown file uploaded successfully');
  } catch (error) {
    console.error('Error uploading markdown:', error);
  }
};

uploadMarkdownExample(); 