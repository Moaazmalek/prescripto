import { createContext } from "react";
import { doctors } from "../assets/assets";

interface AppContextType {
    doctors:typeof doctors
    
}
interface AppContextProviderProps {
    children: React.ReactNode;
}
export const AppContext=createContext<AppContextType>({
    doctors:[]
});

const AppContextProvider=({children}:AppContextProviderProps)=>{
   const value:AppContextType={
    doctors

   }
    return(
        <AppContext.Provider value={value}>   
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
