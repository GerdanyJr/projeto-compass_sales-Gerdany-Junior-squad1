import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../store/AuthContext";
import { SubmitButton } from '../components/Login/SubmitButton';

export function Home(): JSX.Element {
    const authCtx = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/Home_Background.png')} style={styles.image}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text}>Hello, {authCtx.user?.displayName}</Text>
                    <View>
                        <Text style={styles.title}>Compass Sales</Text>
                        <SubmitButton title='Check' style={styles.checkButton} onPress={authCtx.logout} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        height: '65%',
        width: '100%'
    },
    headerContainer: {
        justifyContent: 'space-between',
        height: '65%',
        paddingHorizontal: 16,
        paddingVertical: 48,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: 'white',
    },
    title: {
        fontSize: 54,
        fontFamily: 'Roboto-Bold',
        width: '70%',
        color: 'white',
        paddingBottom: 18
    },
    checkButton: {
        width: '50%'
    }
});