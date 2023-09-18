import React from 'react';

import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../util/Colors';

interface RedirectButtonProps {
    title: string,
    icon: any,
    style?: any,
    onPress?: () => void 
}

export function RedirectButton(props: RedirectButtonProps): JSX.Element {
    return (
        <Pressable style={[styles.forgotPasswordContainer, props.style]} onPress={props.onPress}>
            <Text style={styles.forgot}>
                {props.title} <Image source={props.icon} />
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    forgotPasswordContainer: {
        alignItems: 'flex-end'
    },
    forgot: {
        fontFamily: 'Roboto-Medium',
        color: Colors.primary
    },
});