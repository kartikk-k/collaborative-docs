import React, { createContext, useState, useEffect } from "react";
import supabaseClient from "../config/supabaseClient";
import { AuthContextType } from "../typings";



const AuthContext = createContext<AuthContextType>({
    isAuthenticated: undefined,
})

export default AuthContext



interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        getUser()
    }, [])

    // get user if previously logged in
    const getUser = async () => {
        // console.log("getting user")
        // return setIsAuthenticated(false)
        try {
            const { data, error } = await supabaseClient.auth.getUser()

            setTimeout(() => {
                if (!data.user) return setIsAuthenticated(false)
                else return setIsAuthenticated(true)
            }, 2000)

        } catch (err: any) {
            console.log(err)
            return setIsAuthenticated(false)
        }
    }


    const contextData = {
        isAuthenticated: isAuthenticated,
    }

    return <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>

}