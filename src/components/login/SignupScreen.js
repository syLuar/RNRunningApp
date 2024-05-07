import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useState } from "react";
import { useEffect} from "react";
import { Image, SafeAreaView, StyleSheet, Text,TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { apple, google, sso } from '../../assets/index';
import CheckBox from "../utilities/Checkbox";
import { REGISTER } from "../../config";


const SignupScreen = () =>{

    const [agree, setAgree] = useState(false);
    const [hidden1, setHidden1] = useState(true);
    const [hidden2, setHidden2] = useState(true);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [agreeWarning, setAgreeWarning] = useState(false);
    const [emailWarning, setEmailWarning] = useState(false);
    const [usernameWarning, setUsernameWarning] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState(false);
    const [password2Warning, setPassword2Warning] = useState(false);

    const navigation = useNavigation();

    const handleTermsPress = () => {
        navigation.navigate('Terms and Privacy Policies'); 
    };

    const validateEmail = (email) =>{
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (regex.test(email) === false) {
            return false;
        }
        else {
            return true;
        }
    }

    const validatePassword = (password, password2) =>{
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let valid = true
        if (!regex.test(password)){
            setPasswordWarning(true)
            valid = false
        } 
        if (password !== password2){
            setPassword2Warning(true)
            valid = false
        }
        return valid
    }

    const register = async(agree, email, username, password, password2) =>{
        try {
            const isEmailValid = validateEmail(email);
            const isPasswordValid = validatePassword(password, password2);
            let valid = true

            if (!agree){
                setAgreeWarning(true)
                valid = false
            }

            if (!isEmailValid){
                setEmailWarning(true)
                valid = false
            }

            if (!isPasswordValid){
                valid = false
            }

            if (!valid){
                return false
            } else {
                setAgreeWarning(false)
                setUsernameWarning(false)
                setEmailWarning(false)
                setPasswordWarning(false)
                setPassword2Warning(false)

                const user = {
                    "id": username,
                    "email": email,
                    "password": password,
                }
    
                const res = await axios.post(REGISTER, user);
                const data = await res.data;
                if (data.message === "User created successfully"){
                    return true
                } else {
                    setUsernameWarning(true)
                    return false
                }   
            }

        } catch(error) {
            console.error("Sign up failed:", error);
            throw error;
        }
        
    }
   
    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name={"arrow-back"} size={36} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.signupHeader}>
                Sign Up
            </Text>
            <Text style={styles.subtitle}>
                Create an account to access all the features of <Text style={styles.purpleText}>RunAnyWhere!</Text>
            </Text>

            <View>
                <Text style={styles.purpleUnderline}>
                    Email Address
                </Text>
                <View style={styles.textInput}>
                    <Ionicons name="mail" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        style={styles.passwordField}
                    />
            </View>
                {emailWarning && <Text style={styles.warningText}>Invalid email.</Text>}
                
                <Text style={styles.purpleUnderline}>
                    User Name
                </Text>
                <View style={styles.textInput}>
                    <Ionicons name="person-circle-sharp" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput
                        placeholder="User Name"
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize="none"
                        style={styles.passwordField}
                    />
            </View>
            {usernameWarning && <Text style={styles.warningText}>Username is taken.</Text>}
                <Text style={styles.purpleUnderline}>
                    Password
                </Text>
                
                <View style={styles.textInput}>
                <Ionicons name="lock-closed" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput 
                        style={styles.passwordField}
                        placeholder="Password" 
                        secureTextEntry={hidden1}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize={"none"}
                    />
                    <TouchableOpacity onPress={()=>setHidden1(!hidden1)}>
                        <Ionicons name={hidden1?"eye-off":"eye"} size={20}/>
                    </TouchableOpacity>
                </View>
                {passwordWarning && <Text style={styles.warningText}>Password must contain at least 8 characters, an uppercase, a lowercase, a digit, and a special character.</Text>}
                
                <Text style={styles.purpleUnderline}>
                    Confirm Password
                </Text>
                <View style={styles.textInput}>
                <Ionicons name="checkmark-circle" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput 
                        style={styles.passwordField}
                        placeholder="Confirm Password" 
                        secureTextEntry={hidden2}
                        onChangeText={(text) => setPassword2(text)}
                        autoCapitalize={"none"}
                    />
                    <TouchableOpacity onPress={()=>setHidden2(!hidden2)}>
                        <Ionicons name={hidden2?"eye-off":"eye"} size={20}/>
                    </TouchableOpacity>
                </View>
                {password2Warning && <Text style={styles.warningText}>Passwords do not match.</Text>}
                <View style={{alignItems:"center"}}>
                    <View style={styles.terms}>
                        <CheckBox onPress={() => setAgree(!agree)} isChecked={agree} />
                        <Text>
                            I agree to all the{' '}<Text style={styles.purpleText} onPress={() => navigation.navigate('Terms and Privacy Policies')}> Terms and Privacy Policies</Text>
                        </Text>

                    </View>
                    {agreeWarning && <Text style={styles.warningTermsText}>Please accept the terms and conditions.</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            register(agree, email, username, password, password2).then((res)=>{
                                if (res){
                                    Alert.alert("Account created successfully")
                                } else {
                                    Alert.alert("Account already exists!")
                                }
                            })
                        }}
                    >
                        <Text style={styles.registerText}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, marginLeft:35, marginRight:35, marginBottom:-2}}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'grey', marginHorizontal: 10 }} />
                <Text style={styles.text}>
                    Or Sign Up with ...
                </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'grey', marginHorizontal: 10 }} />
            </View>    
            <View style={styles.thirdPartyContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={google} style={styles.googleIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={apple} style={styles.appleIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={sso} style={styles.ssoIcon}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.thirdPartyContainer}>
                <Text>
                    Already have an account? <Text style={styles.purpleText} onPress={()=>navigation.navigate('Login')}>Login now!</Text>
                </Text>    
            </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    text: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    signupHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        marginLeft: 30,
        fontFamily: 'Baskerville-Bold'
    },
    subtitle:{
        color: 'grey',
        fontSize: 12,
        marginTop: 7,
        marginLeft: 30,
        marginRight: 25,
        marginBottom: 0,
    },
    registerText: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Arial'
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
    warningText: {
        fontSize:12,
        marginLeft: 16,
        color: 'red',
        marginLeft: 40,
        marginRight: 40,
        marginTop: -14,
    },
    warningTermsText:{
        fontSize: 12,
        color: 'red', 
        marginLeft: 30, 
        marginRight: 30,
        marginTop: -2,
        marginBottom: 0,
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
        marginTop: 15,
    },
    passwordField: {
        flex: 1,
    },
    forgotPassword: {
        textAlign: 'right',
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#9360E3',
        margin: 5,
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
        marginBottom:-10
    },
    terms: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
    },
    thirdPartyContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    iconContainer: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f8f8ff',
        width: 75,
        height: 70,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    googleIcon: {
        width: 28,
        height: 26,
    },
    appleIcon: {
        width: 24,
        height: 29,
    },
    ssoIcon: {
        width: 28,
        height: 28,
    },
    icon: {
        marginRight: 10,
        color:"rgba(0, 0, 0, 0.5)"
    },
    arrowIcon:{
        marginLeft: 10,
        marginBottom: -5,
    }
});

export default SignupScreen


