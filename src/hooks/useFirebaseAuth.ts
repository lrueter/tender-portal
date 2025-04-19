import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export const useFirebaseAuth = () => {
  const { getToken } = useAuth();
  const [isFirebaseAuthed, setIsFirebaseAuthed] = useState(false);

  useEffect(() => {
    const authenticateFirebase = async () => {
      try {
        // Get token from Clerk
        const token = await getToken();
        if (!token) return;

        // Exchange Clerk token for Firebase token
        const response = await fetch('/api/get-firebase-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to get Firebase token');
        
        const { firebaseToken } = await response.json();
        
        // Sign in to Firebase
        const auth = getAuth();
        await signInWithCustomToken(auth, firebaseToken);
        
        setIsFirebaseAuthed(true);
      } catch (error) {
        console.error('Firebase authentication failed:', error);
        setIsFirebaseAuthed(false);
      }
    };

    authenticateFirebase();
  }, [getToken]);

  return { isFirebaseAuthed };
}; 