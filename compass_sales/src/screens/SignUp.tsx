import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { InputField } from "../components/Login/InputField";
import { SubmitButton } from "../components/Login/SubmitButton";
import { RedirectButton } from "../components/Login/RedirectButton";
import { SocialMedia } from "../components/Login/SocialMedia";
import { LoginHeader } from "../components/Login/LoginHeader";
import { signUp } from "../util/http/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { onGoogleButtonPress } from "../util/http/googleAuth";

import { Input } from "../types/interfaces/input";
import { AuthContext } from "../store/AuthContext";
import { onFacebookButtonPress } from "../util/http/facebookAuth";

export function SignUp({ navigation }: { navigation: any }): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
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
        setIsLoading(true);
        const response = await signUp(input.email, input.password, input.name);
        if (response) {
            navigation.navigate('Login');
        }
        setIsLoading(false);
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
        setIsLoading(true);
        const response = await onGoogleButtonPress();
        if (response) {
            const token = await response.user.getIdToken();
            authCtx.authenticate(response.user, token);
        }
        setIsLoading(false);
    }

    async function handleFacebookLogin() {
        setIsLoading(true);
        const response = await onFacebookButtonPress();
        if (response) {
            const token = await response.user.getIdToken();
            authCtx.authenticate(response.user, token);
        }
        setIsLoading(false);
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
                isLoading={isLoading}
                style={styles.submitButton}
            />
            <SocialMedia
                title="or sign up with social account"
                onGooglePress={handleGoogleLogin}
                onFacebookPress={handleFacebookLogin}
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