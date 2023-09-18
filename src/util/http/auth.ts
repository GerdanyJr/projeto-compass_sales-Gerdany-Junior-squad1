import * as firebaseAuth from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, initializeAuth } from "firebase/auth";
import { app } from './firebaseConfig';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const errorMessage = (message:string) => {
    return message.split('/')[1].split('-').join(' ').split(')')[0];
}

export const auth = initializeAuth(app, {
    persistence: reactNativePersistence(AsyncStorage)
});

export async function signUp(email: string, password: string, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: displayName });
        return userCredential.user;
    } catch (error: any) {
        Alert.alert("Error ",`${errorMessage(error.message)}`);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        Alert.alert("Error ",`${errorMessage(error.message)}`);
    }
}

export async function passwordReset(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        Alert.alert("Error ",`${errorMessage(error.message)}`);
    }
}

export async function emailPasswordLogout() {
    try {
        signOut(auth);
    } catch (error: any) {
        Alert.alert("Error ",`${errorMessage(error.message)}`);
    }
}