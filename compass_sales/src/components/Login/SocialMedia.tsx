import React from "react";
import { Image, Pressable, Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Colors } from "../../util/Colors";

interface SocialMediaProps {
    title: string,
    onGooglePress?: () => void,
    onFacebookPress?: () => void,
    style?: any
}

export function SocialMedia(props: SocialMediaProps): JSX.Element {
    return (
        <KeyboardAvoidingView behavior="height" enabled={false} style={styles.socialMediaContainer}>
            <View style={[props.style]}>
                <Text style={styles.socialMediaText}>{props.title}</Text>
                <View style={styles.logosContainer}>
                    <Pressable style={styles.logo} android_ripple={{ color: 'grey', foreground: true }} onPress={props.onFacebookPress}>
                        <Image source={require('../../assets/Facebook-logo.png')} />
                    </Pressable>
                    <Pressable style={styles.logo} android_ripple={{ color: 'grey', foreground: true }} onPress={props.onGooglePress}>
                        <Image source={require('../../assets/Google-logo.png')} />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    socialMediaContainer: {
        flex: 1,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    socialMediaText: {
        color: Colors.primary,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        margin: 12,
    },
    logosContainer: {
        flexDirection: 'row',
        gap: 16
    },
    logo: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        borderRadius: 24,
        backgroundColor: 'white',
        overflow: 'hidden',
        elevation: 1
    }
});