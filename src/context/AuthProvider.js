import { createContext, useState, useContext, useMemo } from "react";
const useAuth = createContext();

export function UserAuth() {
    return useContext(useAuth)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userValue = useMemo(() => ({
        user,
        setUser
    }), [user, setUser])

    return (
        <useAuth.Provider value={userValue}>
            {children}
        </useAuth.Provider>
    )
}