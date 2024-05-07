import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import { google, apple, sso, frame} from '../../assets/index';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


const LoginScreen = () =>{
    const {login} = useContext(AuthContext)

    const [hidden, setHidden] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name={"arrow-back"} size={36} style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <Image source={frame} style={styles.logo} />
            </View>
            <Text style={styles.loginHeader}>
                Login (Sign In)
            </Text>
            <Text style={styles.subtitle}>
                Hello! Welcome Back to <Text style={styles.purpleText}>RunAnyWhere!</Text>
            </Text>
            
            <View>
                <Text style={styles.purpleUnderline}>
                    User Name
                </Text>

                <View style={styles.textInput}>
                    <Ionicons name="person-circle-sharp" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput
                        placeholder="User Name"
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize={"none"}
                        style={styles.passwordField}
                    />
            </View>
                <Text style={styles.purpleUnderline}>
                    Password
                </Text>
                <View style={styles.textInput}>
                <Ionicons name="lock-closed" size={24} color="#9360E1" style={styles.icon} />
                    <TextInput 
                        placeholder="Password" 
                        secureTextEntry={hidden}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize={"none"}
                        style={styles.passwordField}
                    />
                    <TouchableOpacity onPress={()=>setHidden(!hidden)}>
                        <Ionicons name={hidden?"eye-off":"eye"} size={20}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.forgotPassword} onPress={()=>navigation.navigate('Signup')}>
                    Forgot Password?
                </Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => login(username, password)}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, marginLeft:35, marginRight:35, marginBottom:-2}}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'grey', marginHorizontal: 10 }} />
                <Text style={styles.text}>
                    Or Continue with ...
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
            <View style={styles.registerContainer}>
                <Text>
                    Don't have an account? <Text style={styles.purpleText} onPress={()=>navigation.navigate('Signup')}>Register now!</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        aspectRatio: 1,
        marginBottom: 20,
    },
    text: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    loginHeader: {
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
        marginBottom: 15,
    },
    loginText: {
        fontSize: 16,
        fontWeight: '500',
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
    warningTermsText:{
        fontSize: 12,
        color: 'red', 
        marginLeft: 30, 
        marginRight: 30,
        marginTop: -2,
        marginBottom: 0,
    },
    passwordField: {
        flex: 1,
    },
    forgotPassword: {
        textAlign: 'right',
        marginRight: 16,
        color: '#9360E3',
        fontWeight: 'bold',
        marginTop: -5,
        marginBottom: 10,
        marginRight:35
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'center'
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
    },
    thirdPartyContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40
    },
    iconContainer: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f8f8ff',
        width: 75,
        height: 70,
        marginTop: 20,
        marginBottom: 20,
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
});

export default LoginScreen