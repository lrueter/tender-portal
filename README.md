# Tender Portal

A web application for managing tender documentation and quote submissions. Built with React, TypeScript, Material-UI, and Firebase Storage.

## Features

- 📄 Documentation Management
  - View and download tender-related documents
  - Supports PDF and other document formats
  - Organized file structure

- 💼 Quote Submission
  - Upload quotes as PDF files
  - Maximum file size: 10MB
  - Drag-and-drop interface
  - Automatic file validation

- 📝 Project Information
  - Markdown-based project description
  - Dynamic content updates
  - Clean and responsive layout

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: Material-UI (MUI)
- **Storage**: Firebase Storage
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Build Tool**: Vite

## Setup

1. Clone the repository
```bash
git clone [repository-url]
cd Stromlaufplan2QRCode
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Firebase Configuration

The application uses Firebase for authentication and storage. Make sure to:
1. Set up a Firebase project
2. Enable Authentication service
3. Configure Storage rules
4. Update CORS configuration

## Security

- Environment variables for sensitive data
- Firebase Security Rules for storage access
- CORS configuration for API security
- Gitignore patterns for sensitive files

## Build & Deployment

The project uses Vite for building and can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` directory to your hosting service

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License

Copyright (c) 2024 [Your Name or Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 