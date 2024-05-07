import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Image} from "react-native"
import { welcome } from '../../assets/index';
import RunAnyWhereLogo from '../../assets/welcome/RunAnyWhereLogo.png'

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={welcome} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={RunAnyWhereLogo} style={styles.logo} />
                    <Text style={styles.slogan}>
                        Elevate Your Running Experience!
                    </Text>
                    <Text style={styles.slogan2}>
                        Simulate & Optimise
                    </Text>
                    <Text style={styles.slogan2}>
                        Your Next Running Routes
                    </Text>
                </View>

            </SafeAreaView>
            <View style={styles.menu}>
                <Text style={styles.startNow}>
                    Start Now!!
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={styles.signupButton}>
                        <Text style={styles.text}>
                            CREATE AN ACCOUNT
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.loginButton}>
                        <Text style={styles.text}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
    );
};
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        opacity: 0.95
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        flex: 0.9,
        aspectRatio: 1,
        marginTop: 40,
    },
    slogan:{
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#663399',
        fontFamily: 'Futura-CondensedMedium',
        marginBottom: 10,
        marginTop:-5
    },
    slogan2:{
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Baskerville-SemiBoldItalic',
        marginBottom:10,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Arial',
      },
    menu: {
        backgroundColor: 'rgba(0,0,0,0.72)',
        flex: 0.8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 10,
    },
    startNow:{
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Baskerville-Bold',
        marginTop: 45
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'center'
    },
    signupButton: {
        backgroundColor: '#9360E3',
        borderRadius: 15,
        margin: 5,
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 1.5},
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 10,
        marginBottom:10,
        marginTop:30
    },
    loginButton: {
        backgroundColor: '#429CC5',
        borderRadius: 15,
        margin: 5,
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 10,
    },
});

export default WelcomeScreen