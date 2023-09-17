import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        return;
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

    return signInWithCredential(auth, facebookCredential);
}