import React, { useContext } from 'react';
import { Button, Text, View } from "react-native";

import { AuthContext } from "../store/AuthContext";

export function Home(): JSX.Element {
    const authCtx = useContext(AuthContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>Welcome {authCtx.user?.displayName}</Text>
            <Button title="Logout" onPress={() => authCtx.logout()} />
        </View>
    )
}