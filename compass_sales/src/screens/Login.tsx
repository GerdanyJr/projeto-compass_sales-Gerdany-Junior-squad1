import React from "react";
import { StyleSheet, View } from "react-native";

import { InputField } from "../components/Login/InputField";
import { SubmitButton } from "../components/Login/SubmitButton";
import { RedirectButton } from "../components/Login/RedirectButton";
import { SocialMedia } from "../components/Login/SocialMedia";
import { LoginHeader } from "../components/Login/LoginHeader";
import { GoBack } from "../components/UI/GoBack";
import { signIn } from "../util/http/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface LoginInput {
    email: string,
    password: string
}

export function Login({ navigation }: { navigation: any }): JSX.Element {
    const {
        control,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    function handleRedirectClick() {
        navigation.navigate('ForgotPassword');
        reset({
            name: "",
            email: "",
            password: ""
        });
    }

    const handleSubmitButton: SubmitHandler<LoginInput> = async (input) => {
        const data = await signIn(input.email, input.password);
    }
    return (
        <View style={styles.container}>
            <GoBack style={styles.goBackButton} />
            <LoginHeader title="Login" />
            <View style={styles.inputContainer}>
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
                title="Forgot your password?"
                icon={require('../assets/arrow.png')}
                onPress={handleRedirectClick}
                style={styles.redirect}
            />
            <SubmitButton
                title="Login"
                onPress={handleSubmit(handleSubmitButton)}
                style={styles.submitButton}
            />
            <SocialMedia
                title="or login with social account"
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
    goBackButton: {
        position: 'absolute',
        marginVertical: 24,
        marginHorizontal: 12
    },
    inputContainer: {
        marginTop: 62
    },
    redirect: {
        marginTop: 4
    },
    submitButton: {
        marginTop: 32
    },
});