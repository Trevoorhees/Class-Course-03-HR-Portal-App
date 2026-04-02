import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('hrPortalCurrentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hrPortalCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hrPortalCurrentUser');
    }
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      login: (user) => setCurrentUser(user),
      logout: () => setCurrentUser(null),
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
