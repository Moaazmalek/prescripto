import axios from 'axios'
import { createContext, useEffect, useState,type ReactNode} from 'react'
import { useNavigate } from 'react-router';
export const AuthContext = createContext<AuthContextType >({
    user: null,
    loading: true,
    logout: () => {},
    setUser: () => {},
    login: async (token:string) => {},
    token: "",
    setToken: () => {}
});
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    image?: string;

}
interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    login: (token:string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token?: string; 
    setToken?: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("atoken");
    console.log("TOKEN IS :",token);
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("USER DATA:",res.data.user);
           setUser(res.data.user)
            setToken(token);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login=async(token:string)=> {
    localStorage.setItem("atoken",token)
    try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.user || res.data);
    navigate("/");
  } catch (err) {
    console.error("Error fetching user after login:", err);
  }
  }

  const logout = () => {
    localStorage.removeItem("atoken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading,login, logout,token,setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

