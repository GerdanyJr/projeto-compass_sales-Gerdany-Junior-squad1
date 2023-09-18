import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { InputField } from "../components/Login/InputField";
import { SubmitButton } from "../components/Login/SubmitButton";
import { RedirectButton } from "../components/Login/RedirectButton";
import { SocialMedia } from "../components/Login/SocialMedia";
import { LoginHeader } from "../components/Login/LoginHeader";
import { GoBack } from "../components/UI/GoBack";
import { signIn } from "../util/http/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../store/AuthContext";
import { onGoogleButtonPress } from "../util/http/googleAuth";
import { onFacebookButtonPress } from "../util/http/facebookAuth";

interface LoginInput {
    email: string,
    password: string
}

export function Login({ navigation }: { navigation: any }): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const {
        control,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function resetFields() {
        reset({
            email: "",
            password: ""
        });
    }

    function handleRedirectClick() {
        navigation.navigate('ForgotPassword');
        resetFields();
    }

    const handleSubmitButton: SubmitHandler<LoginInput> = async (input) => {
        setIsLoading(true);
        const response = await signIn(input.email, input.password);
        if (response) {
            const token = await response.user.getIdToken();
            authCtx.authenticate(response.user, token);
        }
        setIsLoading(false);
        resetFields();
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
                isLoading={isLoading}
            />
            <SocialMedia
                title="or login with social account"
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