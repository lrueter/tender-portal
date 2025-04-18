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
          minHeight: '100vh',
          padding: '1rem'
        }}>
          <SignIn appearance={{
            elements: {
              rootBox: {
                maxWidth: '400px',
                width: '100%'
              },
              card: {
                border: '1px solid #e5e5e5',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }
            }
          }}/>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
};

export default AuthWrapper; 