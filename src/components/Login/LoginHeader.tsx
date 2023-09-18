import React from "react";

import { StyleSheet, Text } from "react-native";

interface LoginHeaderProps {
    title: string
}

export function LoginHeader(props: LoginHeaderProps): JSX.Element {
    return (
        <Text style={styles.login}>{props.title}</Text>
    )
}

const styles = StyleSheet.create({
    login: {
        fontSize: 34,
        fontFamily: 'Roboto-Bold',
        color: 'black'
    },
});