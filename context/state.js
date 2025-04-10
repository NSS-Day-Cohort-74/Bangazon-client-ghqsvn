import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/router"

// Creates our context object.
const AppContext = createContext();

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    const authRoutes = ['/login', '/register']
    if (token) {
      if (!authRoutes.includes(router.pathname)) {
        getUserProfile().then((profileData) => {
          if (profileData) {
            setProfile(profileData)
          }
        })
      }
    }
  }, [token])

  return (
    // The value prop stores functions and variables in context object. 
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

// Encapsulates React hook, useContext, and context object in a custom hook
export function useAppContext() {
  return useContext(AppContext);
}
