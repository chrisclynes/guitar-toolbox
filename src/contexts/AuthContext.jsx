import React, { useContext, useState, useEffect } from "react";
import { auth, db } from '../firebase';
import {  doc, serverTimestamp, updateDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password, username) => {
        //firebase method to create a user, then setup a document with the user id and data for that user
        return auth.createUserWithEmailAndPassword(email, password).then((value) => {
            setDoc(doc(db, "UserData", value.user.uid), {
                user: {
                    username: username,
                    email: email,
                },
                tasks: [
                    {
                    id: 0,
                    task: "Major Scale",
                    time: 10, 
                    description: "Practice alternate picking using the major scale",
                    },
                ]           
            }) 
        });
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

    const updateEmail = (email) => {
        return currentUser.updateEmail(email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    const addPractice = async (values) => {
        const tasksRef = doc(db, "UserData", currentUser.uid)
        updateDoc(tasksRef, {
                tasks: arrayUnion(
                    {
                        id: values.id,
                        task: values.task,
                        time: values.time, 
                        description: values.description,
                        },
                )
            })      
    }

   const removePractice = async (values) => {
        const tasksRef = doc(db, "UserData", currentUser.uid)
        updateDoc(tasksRef, {
                tasks: arrayRemove(
                    {
                        id: values.id,
                        task: values.task,
                        time: values.time, 
                        description: values.description,
                        },
                )
            })         
    }

    useEffect(() => {
        //run on mount, firebase built-in method, set user login state, unsubscribe on unmount of component, set state back to null
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
        resetPassword,
        updateEmail,
        updatePassword,
        addPractice,
        removePractice
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