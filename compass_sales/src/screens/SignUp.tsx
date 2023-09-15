import React from "react";
import { StyleSheet, View } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { LoginHeader } from "../components/Login/LoginHeader";
import { InputField } from "../components/Login/InputField";
import { RedirectButton } from "../components/Login/RedirectButton";
import { SubmitButton } from "../components/Login/SubmitButton";
import { Input } from "../types/interfaces/Input";


export function SignUp({ navigation }: { navigation: any }) {
    const {
        control,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const handleSubmitButton: SubmitHandler<Input> = async (input) => {

    }

    function handleRedirectClick() {
        navigation.navigate('Login');
        reset({
            name: "",
            email: "",
            password: ""
        });
    }

    async function handleGoogleLogin() {
    }

    return (
        <View style={styles.container}>
            <LoginHeader title="Sign Up" />
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 3
                    }}
                    render={({ field, fieldState, formState }) => (
                        <InputField
                            label="Name"
                            icon={fieldState.invalid ? require('../assets/Error.png') : require('../assets/Vector.png')}
                            showIcon={formState.isSubmitted}
                            errorMessage="Not a valid name"
                            error={fieldState.invalid}
                            onChangeText={(enteredText) => field.onChange(enteredText)}
                            value={field.value}
                        />
                    )}
                />
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
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 4,
                    }}
                    render={({ field, fieldState, formState }) => (
                        <InputField
                            label="Password"
                            icon={fieldState.invalid ? require('../assets/Error.png') : require('../assets/Vector.png')}
                            showIcon={formState.isSubmitted}
                            errorMessage="Not a valid password"
                            error={fieldState.invalid}
                            onChangeText={(enteredText) => field.onChange(enteredText)}
                            value={field.value}
                            secureTextEntry
                        />
                    )}
                />
            </View>
            <RedirectButton
                title="Already have an account?"
                icon={require('../assets/arrow.png')}
                onPress={handleRedirectClick}
                style={styles.redirect}
            />
            <SubmitButton
                title="Sign up"
                onPress={handleSubmit(handleSubmitButton)}
                style={styles.submitButton}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 106,
        paddingHorizontal: 16
    },
    inputContainer: {
        marginTop: 62,
    },
    redirect: {
        marginTop: 16
    },
    submitButton: {
        marginTop: 32
    },
});