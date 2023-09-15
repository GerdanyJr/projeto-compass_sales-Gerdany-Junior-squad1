import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './firebaseConfig';
import { Alert } from "react-native";

const auth = getAuth(app);

export async function signUp(email: string, password: string, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: displayName });
        return userCredential.user;
    } catch (error: any) {
        Alert.alert(`${error.code})}`);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        Alert.alert(`${error.code})}`);
    }
}