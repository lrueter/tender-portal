import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut 
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOut = () => firebaseSignOut(auth);

  return { user, signIn, signOut };
}; 