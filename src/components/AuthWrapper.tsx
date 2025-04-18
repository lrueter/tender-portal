import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import type { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPubKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <SignIn appearance={{
            elements: {
              rootBox: {
                maxWidth: '400px',
                width: '100%'
              }
            }
          }}/>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
};

export default AuthWrapper; 