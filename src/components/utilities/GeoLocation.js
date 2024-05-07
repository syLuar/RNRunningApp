import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
    getLocation();
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location.",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getLocation();
    }
  }
}

function getLocation() {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

const sendLocationToServer = async (latitude, longitude) => {
    const response = await fetch('http://<your_server_ip>:8000/location/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    });
  
    if (!response.ok) {
      console.error("Failed to send location");
    }
  
    const data = await response.json();
    console.log(data);
  };
  