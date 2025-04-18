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
        <SignIn routing="path" path="/sign-in" />
      </SignedOut>
    </ClerkProvider>
  );
};

export default AuthWrapper; 