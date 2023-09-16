import React from "react";

import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../util/Colors";

interface SubmitButton {
    title: string,
    onPress?: (...args: any) => void,
    style?: any
}

export function SubmitButton(props: SubmitButton): JSX.Element {
    return (
        <Pressable style={[styles.buttonContainer, props.style]}
            onPress={props.onPress}
            android_ripple={{ color: '#C62000', foreground: true }}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.buttonCollor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        padding: 14,
        overflow: 'hidden',
    },
    buttonText: {
        fontFamily: 'Roboto-Bold',
        color: '#FFFFFF',
        textTransform: 'uppercase'
    }
});