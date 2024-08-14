import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, useSession } from '@clerk/clerk-react';
import type { UserResource } from '@clerk/types';

interface AuthContextType {
  currentUser: UserResource | null | undefined;
  userPublicData: unknown | null | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isSignedIn } = useAuth();
  const { session } = useSession();
  const [currentUser, setCurrentUser] = useState<UserResource | null | undefined>(null);
  const [userPublicData, setUserPublicData] = useState<unknown | null | undefined>(null);

  useEffect(() => {
    if (isSignedIn) {
      setCurrentUser(session?.user);
      setUserPublicData(session?.publicUserData);
    } else {
      setCurrentUser(null);
      setUserPublicData(null);
    }
  }, [isSignedIn, session]);

  return (
    <AuthContext.Provider value={{ currentUser, userPublicData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
