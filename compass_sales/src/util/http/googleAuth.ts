import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from './auth';
import { GoogleAuthProvider, linkWithCredential, signInWithCredential } from "firebase/auth";

GoogleSignin.configure({
    webClientId: '278341264373-6gm7nft3fvcv8336uba86mf17v0n5vds.apps.googleusercontent.com',
});

export async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);

    return signInWithCredential(auth, googleCredential);
}