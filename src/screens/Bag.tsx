import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function Bag(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bag page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    text: {
        color: 'black'
    }
});