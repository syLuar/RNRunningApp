import React from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import { StyleSheet, TextInput,TouchableOpacity, Pressable, View, Button, Text, Image, Dimensions, Touchable } from 'react-native';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import axios from "axios";
import { ROUTE } from "../../config";
import { AuthContext } from '../../context/AuthContext';
import  TimerApp from "./timerApp";
import * as Location from "expo-location";
import { Feather } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Checkbox from '../utilities/Checkbox'


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function RoutesScreen() {

    const {userInfo,userToken} = React.useContext(AuthContext);
    //console.log(userToken);
    //console.log(userInfo);

    const [agree, setAgree] = useState(false);

    const locationNTU = {
      latitude: 1.3483,
      longitude: 103.6831,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const [startingPoint, setStartingPoint] = React.useState({"latitude": 1.3485971625954045, "longitude": 103.68233638828144});
    const [endPoint, setEndPoint] = React.useState({"latitude": 1.3497177506157445, "longitude": 103.68497425931214});
    const [distance, setDistance] = React.useState('');
    const [decodedRoutes, setDecodedRoutes] = useState([{"latitude": 1.3485971625954045, "longitude": 103.68233638828144}]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);


    //console.log(currentLocation);
    //console.log(initialRegion);

    const endSamePoint = () => {
      setEndPoint(startingPoint);
      setAgree(false); // Uncheck the checkbox when the end point is set to the same as the starting point
    }

    const handleStartingPointChange = (coordinate) => {
      setStartingPoint(coordinate);
      setAgree(false); // Uncheck the checkbox when the starting point is changed
    }

    const handleEndPointChange = (coordinate) => {
      setEndPoint(coordinate);
      setAgree(false); // Uncheck the checkbox when the end point is changed
    }
    
    //function to send starting point and distance to backend and get routes coordinates
    const findRoute = async (startingPoint,endPoint,distance) => {
        // Make a POST request to the API endpoint
        const startLatitude = startingPoint.latitude;
        const startLongitude = startingPoint.longitude;
        const endLatitude = endPoint.latitude;
        const endLongitude = endPoint.longitude;

        await axios.post(`${ROUTE}?startLatitude=${startLatitude}&startLongitude=${startLongitude}&endLatitude=${endLatitude}&endLongitude=${endLongitude}&distance=${distance}&user_id=${userInfo.username}`,
        {}, //empty body
        { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then((res) => {
          //console.log(res.data);
          const resData = res.data;
          const firstHalf = resData.suggested_route.startMid.routes[0].polyline.encodedPolyline;
          const secondHalf = resData.suggested_route.midEnd.routes[0].polyline.encodedPolyline;

          //to display the routes on the map by setting marker and polyline
          const decodePolyline = require('decode-google-map-polyline');
          const fistHalfDecoded = decodePolyline(firstHalf);
          const secondHalfDecoded = decodePolyline(secondHalf);
          
          const combinedPath = fistHalfDecoded.concat(secondHalfDecoded);
          //console.log(combinedPath);
          
          const decodedRoutes = combinedPath.map(item => {
              return { latitude: item.lat, longitude: item.lng };
          });
          setDecodedRoutes(decodedRoutes);
          //console.log(decodedRoutes);
        
        })
        .catch((error)=>{
            console.log(error)
        })
 
    }
    
    const clearRoute = () => {
      setDecodedRoutes([{"latitude": 1.3485971625954045, "longitude": 103.68233638828144}]);
    }

    //function for user to confirm and navigate to startRun screen
    useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);


    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={locationNTU} 
            //when users click on the map, it will log the coordinates
            onPress={ (event) => console.log(event.nativeEvent.coordinate) }> 
        
        {currentLocation && (
            
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
              >
                <Image
                  source={require('../../assets/welcome/RunAnyWhereLogo.png')}
                  style={{ width: 50, height: 50 }}
                />
              </Marker>
         
            
          )}

        <Marker draggable
          coordinate = {startingPoint}
          pinColor = {"blue"} 
          title={"Starting Point"}
          onDragEnd={(event) => handleStartingPointChange(event.nativeEvent.coordinate)}/>


        <Marker draggable
          coordinate = {endPoint}
          pinColor = {"red"}
          title={"End Point"}
          onDragEnd={(event) => handleEndPointChange(event.nativeEvent.coordinate)}/>

        <Polyline
            coordinates={decodedRoutes}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#9360e3',
            ]}
            strokeWidth={3}
            />

          </MapView>

        <View style={styles.searchBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.purpleText}>Distance</Text>
            <TextInput
                placeholder='ex. 1.2'
                style={styles.searchBoxLabel}
                onChangeText={(text) => setDistance(text)}
            />
            <View style={styles.rowSpacer} />
            <Text style={styles.purpleText}>(km)</Text>
        </View>
        <View
              style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth,}}
        />
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 50 }}>
              <Checkbox isChecked={agree} onPress={() => { setAgree(!agree); if (!agree) endSamePoint(); setAgree(!agree); }} />
              <Button onPress={endSamePoint} title="Stop at the same location" color="#9360e3" />
          </View>

          <Text style={styles.noteForUser}>*Move the pin to change location after unchecking the box</Text>
          <View
              style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth,}}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.searchButton} onPress={()=>findRoute(startingPoint,endPoint,distance)} >
              <View style={styles.buttonContent}>
                  <Text style={styles.searchButtonText}>Find Route(s)</Text>
                  <View style={styles.rowSpacer} />
                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} style={{margin:1}} />
                </View>   
              </TouchableOpacity>   

              <TouchableOpacity style={styles.searchButton} onPress={clearRoute}>
                <View style={styles.buttonContent}>
                  <Text style={styles.searchButtonText}>Clear Route</Text>
                  <View style={styles.rowSpacer} />
                  <FeatherIcon color="#C6C6C6" name="delete" size={20} style={{margin:1}} />
                </View>
            </TouchableOpacity>   
          </View> 
        </View> 

        <TimerApp />

      </View>
    );
}

const styles = StyleSheet.create({
  timerAppContainer: {
    backgroundColor: 'black',
    // Other styles for the timer app container
  },
  container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
  },
  purpleText:{
    fontSize: 18,
    color: '#9360E3',
    fontWeight: 'bold',
    marginLeft: 10, 
    padding: 5,
    flexDirection: 'row', 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
},
  noteForUser:{
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
    color: '#989898',
  },
  searchBoxLabel:{
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold', 
    padding: 5,
    marginLeft: 10, 
    textAlign: 'left', 
    textAlignVertical: 'center', 
  },
  searchBox:{
      position: 'absolute',
      backgroundColor: '#fff',
      top: 50,
      width: '90%',
      padding: 15,
      borderRadius: 20,
      marginTop: 10,
      borderColor: 'grey',
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 1.84,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 2,
  },
  title:{
      fontSize: 17,
      color: 'black',
      fontWeight: 'bold', 
      padding: 5,
      marginLeft: 10, 
      textAlign: 'left', 
      textAlignVertical: 'center', 
  },
  finalLocationButton:{
    backgroundColor: '#9360e3',
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
},
  buttonContent: {
    flexDirection: 'row',
    marginLeft:18,
  },
  searchButton:{
      backgroundColor: '#9360e3',
      padding: 10,
      marginTop: 10,
      width: '48.5%',
      alignSelf: 'center',
      alignItems: 'center', // Center the content horizontally
      justifyContent: 'center', // Center the content vertically
      alignItems: 'center',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2.84,
  },
  searchButtonText:{
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold', 
      marginRight:2,
      marginLeft:-2,
  },
  map: {
      flex: 1, 
      width: '100%',
      height: '100%',
  },
});
