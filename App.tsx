import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './src/screens/Login';
import { SignUp } from './src/screens/SignUp';
import { ForgotPassword } from './src/screens/ForgotPassword';
import { AuthContext, AuthContextProvider } from './src/store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home } from './src/screens/Home';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor='#F9F9F9' />
        <RootStack />
      </View>
    </AuthContextProvider>
  );
}

function RootStack(): JSX.Element {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (storedToken && user) {
        authCtx.authenticate(JSON.parse(user), storedToken);
      }
    }
    getToken();
  }, []);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthenticateStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function AuthenticateStack(): JSX.Element {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function checkIsFirstTime() {
      const storedIsFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (storedIsFirstTime) {
        authCtx.setIsFirstTime(JSON.parse(storedIsFirstTime));
      }
    }
    checkIsFirstTime();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={authCtx.isFirstTime ? 'SignUp' : 'Login'}>
      <Stack.Screen component={SignUp} name='SignUp' />
      <Stack.Screen component={Login} name='Login' />
      <Stack.Screen component={ForgotPassword} name='ForgotPassword' />
    </Stack.Navigator>
  );
}

function AuthenticatedStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name='Home' />
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
