import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from './firebaseConfig';
import { Alert } from "react-native";

export const auth = getAuth(app);

export async function signUp(email: string, password: string, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: displayName });
        return userCredential.user;
    } catch (error: any) {
        Alert.alert(`${error.code})}`);
    }
}