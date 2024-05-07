import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import WelcomeScreen from './WelcomeScreen';
import TermsAndConditionsScreen from './TermsAndConditionsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    
    return (
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
            <Stack.Screen name="Signup" options={{headerShown: false}} component={SignupScreen} />
            <Stack.Screen name="Terms and Privacy Policies" options={{headerShown: true}} component={TermsAndConditionsScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;
