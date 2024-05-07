import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native"
import { SETTINGS } from "../../config";
import axios from "axios";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { AuthContext } from '../../context/AuthContext';

const ChangePasswordScreen = () =>{   
    const {userInfo,userToken} = React.useContext(AuthContext);

    const [hidden1, setHidden1] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState(false);
    const [password2Warning, setPassword2Warning] = useState(false);

    const changePassword = async (newPassword) => {
        await axios.put(`${SETTINGS}/${userInfo.username}/change-password?new_password=${newPassword}&userid=${userInfo.username}`, 
        {}, //empty body
        {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(() => {})
    };

    const validatePassword = (newPassword, confirmedNewPassword) =>{
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let valid = true
        if (!regex.test(newPassword)){
            setPasswordWarning(true)
            valid = false
        } 
        if (newPassword !== confirmedNewPassword){
            setPassword2Warning(true)
            valid = false
        }
        return valid
    }

    const updatePassword = async(newPassword, confirmedNewPassword) =>{
        try {
            const isPasswordValid = validatePassword(newPassword, confirmedNewPassword);
            let valid = true

            if (!isPasswordValid){
                valid = false
            }

            if (!valid){
                return false
            } else {
                setPasswordWarning(false)
                setPassword2Warning(false)
                }
            }
            catch(error) {
                console.error("Change Password Failed", error);
                throw error;
            };}

    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Change Your Password</Text>
            <View style={styles.form}>
                <Text style={styles.purpleUnderline}>
                    New Password
                </Text>
                <View style={styles.textInput}>
                <Ionicons name="lock-closed" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput
                        placeholder="New Password"
                        onChangeText={(text) => setNewPassword(text)}
                        autoCapitalize={"none"}
                        secureTextEntry={hidden1}
                        style={styles.field}
                    />
                    <TouchableOpacity onPress={()=>setHidden1(!hidden1)}>
                            <Ionicons name={hidden1?"eye-off":"eye"} padding={6} size={20}/>
                    </TouchableOpacity>
                </View>
                {passwordWarning && <Text style={styles.warningText}>Password must contain at least 8 characters, an uppercase, a lowercase, a digit, and a special character.</Text>}


                <Text style={styles.purpleUnderline}>
                        Confirmed New Password
                    </Text>
                <View style={styles.textInput}>
                <Ionicons name="lock-closed" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput
                        placeholder="Confirmed New Password"
                        onChangeText={(text) => setConfirmedNewPassword(text)}
                        autoCapitalize={"none"}
                        secureTextEntry={hidden2}
                        style={styles.field}
                    />
                    <TouchableOpacity onPress={()=>setHidden2(!hidden2)}>
                            <Ionicons name={hidden2?"eye-off":"eye"} padding={6} size={20}/>
                    </TouchableOpacity>
                </View>
                {password2Warning && <Text style={styles.warningText}>Passwords do not match.</Text>}

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{changePassword(newPassword)}}>
                        <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    form:{
        flexDirection: 'column',
        justifyContent: 'center',
      },
    header:{
        margin:35,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 30,
        fontFamily: 'Futura-CondensedMedium',
      },
      textInput: {
        backgroundColor: '#f8f8ff',
        borderColor: '#e6e6fa',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 5,
        marginTop: 5,
        marginLeft: 35,
        marginRight: 35,
        marginBottom:18,
    },
    field: {
        flex: 1,
    },
    purpleText: {
        color: '#9360E3',
        fontWeight: 'bold',
    },
    purpleUnderline:{
        color: '#9360E3',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 40,
        textDecorationLine: 'underline',
        marginTop: 6,
    },
    saveText: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial'
    },
    button:{
      backgroundColor: '#9360E3',
      margin: 10,
      width: 300,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 3.84,
      elevation: 10,
    },
    buttonContainer: {
      margin: 12,
      alignItems: 'center'
      },
    warningText: {
        fontSize:12,
        marginLeft: 16,
        color: 'red',
        marginLeft: 40,
        marginRight: 40,
        marginTop: -14,
    },
})

export default ChangePasswordScreen
