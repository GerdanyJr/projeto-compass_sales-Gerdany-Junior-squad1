import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Login } from './src/screens/Login';
import { SignUp } from './src/screens/SignUp';
import { ForgotPassword } from './src/screens/ForgotPassword';
import { AuthContext, AuthContextProvider } from './src/store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home } from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Shop } from './src/screens/Shop';
import { Bag } from './src/screens/Bag';
import { Favorites } from './src/screens/Favorites';
import { Profile } from './src/screens/Profile';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' translucent />
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
  const BottomTabs = createBottomTabNavigator();
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen component={Home} name='Home' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='bed-outline' color={color} size={size} /> }} />
      <BottomTabs.Screen component={Shop} name='Shop' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='cart-outline' color={color} size={size} /> }} />
      <BottomTabs.Screen component={Bag} name='Bag' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='bag-outline' color={color} size={size} /> }} />
      <BottomTabs.Screen component={Favorites} name='Favorites' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='heart-outline' color={color} size={size} /> }} />
      <BottomTabs.Screen component={Profile} name='Profile' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='person-outline' color={color} size={size} /> }} />
    </BottomTabs.Navigator>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  }
});
