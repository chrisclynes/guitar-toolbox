import React, { useContext, useState, useEffect } from "react";
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    const signup = (email, password) => {
        //firebase method to create a user, retursn a promise
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        //run on mount, firebase builtin method, set user login state, unsubscribe on unmount of component, set state back to null
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe;
    }, [])
    
    //props for entire app to have access to
    const value = {
        currentUser,
        signup
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContext)
}