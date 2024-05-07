import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN } from "../config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${LOGIN}?user_id=${username}&password=${password}`);
            const userInfo = response.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.access_token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', JSON.stringify(userInfo.access_token));
            setIsLoading(false);
            return true
        } catch (error) {
            Alert.alert("Invalid Login!")
            setIsLoading(false);
            return false
        } 
    };
    

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async() =>{
        try{
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let userToken = await AsyncStorage.getItem('userToken')

            userInfo = JSON.parse(userInfo)

            if (userInfo){
                setUserInfo(userInfo)
                setUserToken(userToken)
            }
            setIsLoading(false)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userInfo, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}