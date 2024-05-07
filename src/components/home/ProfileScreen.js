    import React, { useContext,useState, useEffect } from "react";
    import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
    import { AuthContext } from "../../context/AuthContext";
    import FeatherIcon from 'react-native-vector-icons/Feather';
    import RunAnyWhereLogo from '../../assets/welcome/RunAnyWhereLogo.png';
    import { Feather } from '@expo/vector-icons';
    import { MaterialIcons } from '@expo/vector-icons';
    import axios from "axios";
    import { SETTINGS } from "../../config";
    import { Ionicons } from "@expo/vector-icons"; 

    const ProfileScreen = ({navigation}) => {
        const { userInfo, userToken, logout } = useContext(AuthContext);

        const [firstName, setFirstName] = useState('-');
        const [lastName, setLastName] = useState('-');
        const [location, setLocation] = useState('Singapore');
        const [contact, setContact] = useState('-');

        const getDetails = async() =>{
            try{
                const res = await axios.get(`${SETTINGS}/${userInfo.username}`, 
                {
                    headers: {Authorization: `Bearer ${userToken}`}
                })
                const details = res.data
                //if no details are present, the profile is not created yet

                if (details.message == "Pls create a profile first"){
                    /*
                    await axios.post(`${SETTINGS}/${userInfo.username}`, 
                        {}, //empty body
                        {
                            headers: {Authorization: `Bearer ${userToken}`}
                        })
                    */
                    await axios({
                            method: 'post',
                            url: `${SETTINGS}/${userInfo.username}`,
                            data: {
                                "firstName": "-",
                                "lastName": "-",
                                "location": "Singapore",
                                "contactNumber": "-"   
                            },
                            headers: {
                            Authorization: `Bearer ${userToken}`,
                            },
                        })
                }
                else{
                    setFirstName(details.firstName);
                    setLastName(details.lastName);
                    setLocation(details.location);
                    setContact(details.contactNumber);
                }
                
            } catch(error) {
                console.error(error);
            }   
        }

        useEffect(() => {
            getDetails();
        }   , []);  
        /*
        const MINUTE_MS = 2000
        useEffect(() => {
            const interval = setInterval(() => {
                getDetails();
            }, MINUTE_MS)
        }, []);
        */

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.profile}>
                    <View style={styles.profileAvatarWrapper}>
                        <TouchableOpacity style={styles.iconContainer} onPress={()=>getDetails()}>
                            <Image source={RunAnyWhereLogo} style={styles.profilePicture} />
                        </TouchableOpacity>
                        <View style={styles.profileAction}>
                            <FeatherIcon
                                color="#fff"
                                name="edit-3"
                                size={15}
                            />
                        </View>
                    </View>
                    <Text style={styles.profileName}>{userInfo.username}</Text>
                    <View style={styles.profileContainer}>    
                        <View style={styles.profileDetailsContainer}>
                            <Ionicons name="person" size={17} color="#989898" marginRight={8}/>
                            <Text style={styles.profileDetails}>Name: {firstName} {lastName}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Ionicons name="location" size={17} color="#989898" marginRight={8}/>
                            <Text style={styles.profileDetails}>Location: {location}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Ionicons name="call" size={17} color="#989898" marginRight={8}/>
                            <Text style={styles.profileDetails}>Contact: {contact}</Text>
                        </View>          
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Edit')}>
                            <View style={styles.buttonContent}>
                                <Feather name="edit" size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Edit / Update Profile</Text>
                                <View style={styles.rowSpacer} />
                                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{marginRight: 10}} />
                            </View>
                        </TouchableOpacity> 
                        
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Change')}>
                            <View style={styles.buttonContent}>
                                <Feather name="lock" size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Change Password</Text>
                                <View style={styles.rowSpacer} />
                                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{marginRight: 10}} />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Emergency')}>
                            <View style={styles.buttonContent}>
                                <Feather name="phone" size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Emergency Contact</Text>
                                <View style={styles.rowSpacer} />
                                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{marginRight: 10}} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Terms')}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="description" size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Terms and Privacy Policies</Text>
                                <View style={styles.rowSpacer} />
                                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{marginRight: 10}} />
                            </View>
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.button} onPress={() => { logout() }}>
                            <View style={styles.buttonContent}>
                                <Feather name="log-out" size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Logout</Text>
                                <View style={styles.rowSpacer} />
                                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{marginRight: 10}} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 70,
            padding: 30,
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
        },
        profile: {
            padding: 15,
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginBottom: 5,
            marginTop: 8,
            borderWidth: 2, 
            borderColor: 'white', 
            margin:20,
        },
        
        profileAvatarWrapper: {
            position: 'relative',
        },
        profilePicture: {
            width: 140,
            height: 140,
            borderRadius: 20,
            borderWidth: 1, 
            borderColor: '#e6e6fa',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
        },
        profileAction: {
            position: 'absolute',
            right: -5,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 20,
            backgroundColor: '#007bff',

        },
        profileName: {
            marginBottom: 10,
            fontSize: 19,
            fontWeight: '600',
            color: '#414d63',
            textAlign: 'center',
        },
        profileDetails: {
            marginTop: 5,
            fontSize: 14,
            color: '#989898',
            textAlign: 'left',
        },
        buttonContainer: {
            margin: 10,
            // backgroundColor: 'white',
            borderRadius: 20,
        },
        button: {
            backgroundColor: '#9360E3',
            margin: 15,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2.84,
            elevation: 10,
            marginBottom: 0,
        },
        buttonText: {
            fontSize: 15,
            fontWeight: '800',
            textAlign: 'left', 
            color: 'white',
            fontFamily: 'Arial',
        },
        buttonContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start', 
        },
        icon: {
            marginLeft: 20,
            marginRight: 12,
            padding: 10,
            color: 'white',
        },
        profileContainer: {
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'left',
        },
        profileDetailsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rowSpacer: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
        },
    });

    export default ProfileScreen;
