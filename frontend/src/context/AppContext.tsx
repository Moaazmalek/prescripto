import { createContext } from "react";
import { doctors } from "../assets/assets";

interface AppContextType {
    doctors:typeof doctors,
    currencySymbole:string
}
interface AppContextProviderProps {
    children: React.ReactNode;
}
export const AppContext=createContext<AppContextType>({
    doctors:[],
    currencySymbole:"$"
});

const AppContextProvider=({children}:AppContextProviderProps)=>{
    const currencySymbole=`$`
   const value:AppContextType={
    doctors,
    currencySymbole

   }
    return(
        <AppContext.Provider value={value}>   
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
