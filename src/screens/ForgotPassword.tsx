import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { InputField } from "../components/Login/InputField";
import { SubmitButton } from "../components/Login/SubmitButton";
import { LoginHeader } from "../components/Login/LoginHeader";
import { Colors } from "../util/Colors";
import { GoBack } from "../components/UI/GoBack";
import { passwordReset } from "../util/http/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ForgotPassword {
    email: string
}

export function ForgotPassword({ navigation }: { navigation: any }): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit
    } = useForm<ForgotPassword>({
        defaultValues: {
            email: ""
        },
    });

    const handleSubmitButton: SubmitHandler<ForgotPassword> = async (input) => {
        setIsLoading(true);
        await passwordReset(input.email);
        setIsLoading(false);
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <GoBack style={styles.goBackButton} />
            <LoginHeader title="Forgot password" />
            <View style={styles.inputContainer}>
                <Text style={styles.instructionText}>
                    Please, enter your email address. You will receive a link to create a new password via email.
                </Text>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    rules={{
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    }}
                    render={({ field, fieldState, formState }) => (
                        <InputField
                            label="Email"
                            icon={fieldState.invalid ? require('../assets/Error.png') : require('../assets/Vector.png')}
                            showIcon={formState.isSubmitted}
                            errorMessage="Not a valid email"
                            error={fieldState.invalid}
                            onChangeText={(enteredText) => field.onChange(enteredText)}
                            value={field.value}
                        />
                    )}
                />
            </View>
            <SubmitButton
                title="Send"
                onPress={handleSubmit(handleSubmitButton)}
                style={styles.submitButton}
                isLoading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 104,
        paddingHorizontal: 16
    },
    goBackButton: {
        position: 'absolute',
        marginVertical: 24,
        marginHorizontal: 12
    },
    instructionText: {
        color: Colors.primary,
        fontFamily: 'Roboto-Medium',
        lineHeight: 20,
        fontSize: 16
    },
    inputContainer: {
        marginTop: 62,
        gap: 8
    },
    submitButton: {
        marginTop: 32
    }
});