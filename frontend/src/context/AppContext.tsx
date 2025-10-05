import { createContext, useContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { get } from "react-hook-form";
import { AuthContext } from "./AuthContext";

interface AppContextType {
  doctors: typeof doctors;
  currencySymbole: string;
  backendUrl: string;
}
interface AppContextProviderProps {
  children: React.ReactNode;
}
export const AppContext = createContext<AppContextType>({
  doctors: [],
  currencySymbole: "$",
  backendUrl: "",
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const {token}=useContext(AuthContext)
  const [doctors, setDoctors] = useState([]);
  const currencySymbole = `$`;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value: AppContextType = {
    doctors,
    currencySymbole,

    backendUrl,
  };

  useEffect(() => {
    if(!token) return;
    const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success){
        setDoctors(data.doctors);
      }
      console.log("TRYING FETCHING DOCTORS")
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

    getAllDoctors();
  }, [token]);


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
