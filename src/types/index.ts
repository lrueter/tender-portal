export interface Document {
  name: string;
  url: string;
}

export interface UploadMessage {
  type: 'success' | 'error';
  text: string;
} 