import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from './auth';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Alert } from 'react-native';

GoogleSignin.configure({
    webClientId: '278341264373-6gm7nft3fvcv8336uba86mf17v0n5vds.apps.googleusercontent.com',
});

export async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);

        return signInWithCredential(auth, googleCredential);
    } catch (error: any) {
        Alert.alert("Error ", error.message);
    }
}