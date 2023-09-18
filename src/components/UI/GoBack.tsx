import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Image, Pressable } from "react-native";

interface GoBackProps {
    onPress: () => void,
    style?:any
} 

export function GoBack(props:GoBackProps): JSX.Element {
    const navigation = useNavigation();
    return (
        <Pressable style={props.style} onPress={props.onPress}>
            <Image source={require("../../assets/Go-back.png")} />
        </Pressable>
    )
}