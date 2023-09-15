import React, { useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './src/screens/SignUp';


const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <RootStack />
    </View>
  );
}

function RootStack(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthenticateStack />
    </NavigationContainer>
  );
}

function AuthenticateStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SignUp} name='SignUp' />
    </Stack.Navigator>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  }
});
