import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"; 
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { SETTINGS } from "../../config";
import { Feather } from '@expo/vector-icons';

const EditProfileScreen = () =>{
    const {userInfo,userToken} = useContext(AuthContext)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');


    const saveDetails = async(firstName, lastName, location, contact) =>{
        /*
        await axios.put(`${SETTINGS}/${userInfo.username}`, 
            {
                "firstName": firstName,
                "lastName": lastName,
                "location": location,
                "contactNumber": contact             
            }, //update user profile
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        */
            await axios({
                method: 'put',
                url: `${SETTINGS}/${userInfo.username}`,
                data: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "location": location,
                    "contactNumber": contact   
                },
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              })
    }

    

    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Edit/Update Your Profile</Text>
            <View style={styles.form}>
                <Text style={styles.purpleUnderline}>
                    First Name
                </Text>
                <View style={styles.textInput}>
                <Ionicons name="person" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(text) => setFirstName(text)}
                        autoCapitalize={"none"}
                        style={styles.field}
                    />
                </View>

                <Text style={styles.purpleUnderline}>
                    Last Name
                </Text>
                <View style={styles.textInput}>
                    <Feather name="user" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput 
                        placeholder="Last Name" 
                        onChangeText={(text) => setLastName(text)}
                        autoCapitalize={"none"}
                        style={styles.field}
                    />
                </View>

                <Text style={styles.purpleUnderline}>
                    Location
                </Text>
                <View style={styles.textInput}>
                    <Ionicons name="location" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput 
                        placeholder="Locaton" 
                        onChangeText={(text) => setLocation(text)}
                        autoCapitalize={"none"}
                        style={styles.field}
                    />
                </View>

                <Text style={styles.purpleUnderline}>
                    Contact Number
                </Text>
                <View style={styles.textInput}>
                <Ionicons name="call" size={24} color="#9360E1" padding={5} style={styles.icon} />
                    <TextInput 
                        placeholder="Contact Number" 
                        onChangeText={(text) => setContact(text)}
                        autoCapitalize={"none"}
                        style={styles.field}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>saveDetails(firstName, lastName, location, contact).then(Alert.alert("Saved successfully"))}
                    >
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
});

export default EditProfileScreen