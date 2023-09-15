import React from "react";
import { StyleSheet, View } from "react-native";

import { LoginHeader } from "../components/Login/LoginHeader";


export function SignUp() {
    return (
        <View style={styles.container}>
            <LoginHeader title="Sign Up" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 106,
        paddingHorizontal: 16
    }
});