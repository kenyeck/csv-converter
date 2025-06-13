import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { login as loginUser, logout as logoutUser } from 'api/api';
import { ApiResult } from 'types/api';
import { User } from 'types/user';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<ApiResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) : Promise<ApiResult> => {
    const result = await loginUser(username, password);
    if (result.status === 200) {
      setUser(result.data.user);
    }
    // todo: update ApiResult to return correct type for data (user, error, etc.)
    return result;

  };

  const logout = async () => {
    await logoutUser(user?.username!);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
