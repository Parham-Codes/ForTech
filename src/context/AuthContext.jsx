import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user , setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    })

    useEffect(() => {
        localStorage.setItem("user" , JSON.stringify(user))
    } , [user])

    const login = (userData) => {
        if (!userData) {
            return;
        }
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    const register = (userData) => {
        if (!userData) {
            return;
        }
        setUser(userData)
    }

    return(
        <AuthContext.Provider value={{user , login , logout , register}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)
