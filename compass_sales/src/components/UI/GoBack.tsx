import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Image, Pressable } from "react-native";

interface GoBackProps {
    style?:any
} 

export function GoBack(props:GoBackProps): JSX.Element {
    const navigation = useNavigation();
    return (
        <Pressable style={props.style} onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/Go-back.png")} />
        </Pressable>
    )
}