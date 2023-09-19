import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function Shop(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Shop page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: 'black'
    }
});