import React, { useRef, useState } from 'react';

import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View, Animated, Easing } from 'react-native';
import { Colors } from '../../util/Colors';

interface InputFieldProps {
    label: string,
    icon: ImageSourcePropType,
    showIcon: boolean,
    error: boolean,
    value: string,
    errorMessage?: string,
    secureTextEntry?: boolean,
    onChangeText?: (enteredText: string) => void,
}

export function InputField(props: InputFieldProps): JSX.Element {
    const [labelStyles, setLabelStyles] = useState(styles.label);
    const [errorLabelStyles, setErrorLabelStyles] = useState(styles.errorLabel);
    const transY = useRef(new Animated.Value(0));

    const handleFocus = () => {
        setLabelStyles(styles.focusedLabel);
        setErrorLabelStyles(styles.errorFocusedLabel);
        animateTransform(-15);
    }

    const handleBlur = () => {
        if (props.value.length === 0) {
            animateTransform(0);
            setLabelStyles(styles.label);
            setErrorLabelStyles(styles.errorLabel);
        }
    }

    const transX = transY.current.interpolate({
        inputRange: [-40, -15],
        outputRange: [-20, 0],
        extrapolate: 'clamp'
    });

    const animateTransform = (toValue: number) => {
        Animated.timing(transY.current, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease
        }).start();
    }

    return (
        <>
            <View style={[styles.inputContainer, props.error && styles.errorInput]}>
                <View>
                    <Animated.Text style={[labelStyles, { transform: [{ translateY: transY.current }, { translateX: transX }] }, props.error && errorLabelStyles]}>
                        {props.label}
                    </Animated.Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={props.onChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={props.value}
                        secureTextEntry={props.secureTextEntry}
                    />
                </View>
                {props.showIcon && <Image source={props.icon} />}
            </View>
            <Text style={styles.errorMessage}>{props.error && props.errorMessage}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderRadius: 4,
        height: 64,
        paddingTop: 8,
        elevation: 2
    },
    label: {
        position: 'absolute',
        color: Colors.secondary400,
        fontFamily: 'Roboto-medium',
        fontSize: 16,
    },
    focusedLabel: {
        position: 'absolute',
        color: Colors.secondary400,
        fontFamily: 'Roboto-medium',
        fontSize: 14,
    },
    errorLabel: {
        color: Colors.error,
        fontFamily: 'Roboto-medium',
        fontSize: 16,
    },
    errorFocusedLabel: {
        color: Colors.error,
        fontFamily: 'Roboto-medium',
        fontSize: 14,
    },
    input: {
        color: Colors.secondary600,
        fontFamily: 'Roboto-medium',
        minWidth: '90%',
        maxWidth: '90%',
        padding: 0,
        fontSize: 16,
    },
    errorInput: {
        borderColor: Colors.error,
        borderWidth: 1,
        borderRadius: 4,
        elevation: 0
    },
    errorMessage: {
        color: Colors.error,
        paddingHorizontal: 16,
        fontSize: 12,
        fontFamily: 'Roboto-Medium',
        marginBottom: 4
    }
});