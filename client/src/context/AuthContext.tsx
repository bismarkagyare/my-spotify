import { createContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setTokens: (access_token: string, refresh_token: string) => void
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  const setTokens = (access_token: string, refresh_token: string) => {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, setTokens, logout}}>
      {children}
    </AuthContext.Provider>
  )
}