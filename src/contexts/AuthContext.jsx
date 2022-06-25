import React, { useContext, useState, useEffect } from "react";
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        //firebase method to create a user, returns a promise
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        //firebase method to check login of email and password, returns a promise
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = (email, password) => {
        //firebase method to check login of email and password, returns a promise
        return auth.signOut()
    }

    const resetPassword = (email) => {
        //firebase method to reset users pass by sending them an email
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        //run on mount, firebase builtin method, set user login state, unsubscribe on unmount of component, set state back to null
        const unsubscribe = auth.onAuthStateChanged(user => {
            //on load set current user and switch loading to false
            setCurrentUser(user);
            setLoading(false);
            
        })
        return unsubscribe;
    }, [])
    
    //props for entire app to have access to
    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword
    }

  return (
    <AuthContext.Provider value={value}>
        {/* only render children and pass current user when firebase is not loading */}
        {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContext)
}