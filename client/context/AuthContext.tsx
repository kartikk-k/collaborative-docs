import React, { createContext, useState, useEffect } from "react";
import supabaseClient from "../config/supabaseClient";
import { AuthContextType, UserDataType } from "../typings";



const AuthContext = createContext<AuthContextType>({
    isAuthenticated: undefined,
    userData: null
})

export default AuthContext



interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
    const [userData, setUserData] = useState<UserDataType | null>(null)

    useEffect(() => {
        getUser()
    }, [])

    // get user if previously logged in
    const getUser = async () => {
        // console.log("getting user")
        // return setIsAuthenticated(false)
        try {
            const { data, error } = await supabaseClient.auth.getUser()

            if (data.user?.aud === "authenticated") {
                setUserData({
                    id: data.user.id,
                    name: data.user.identities![0].identity_data!.full_name! || data.user.email!.split("@")[0],
                    email: data.user.email!,
                    isAuthenticated: true,
                })
                setIsAuthenticated(true)

            } else {
                return setIsAuthenticated(false)
            }

        } catch (err: any) {
            console.log(err)
            return setIsAuthenticated(false)
        }
    }


    const contextData = {
        isAuthenticated: isAuthenticated,
        userData: userData,
    }

    return <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>

}