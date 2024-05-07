import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthStack from '../components/login/AuthStack';
import AppStack from '../components/home/AppStack';
import { AuthContext } from '../context/AuthContext';

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext)

    if(isLoading){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

  return (
    <NavigationContainer>
        {userToken == null ?
            <AuthStack />:<AppStack />
        }
    </NavigationContainer>
  )
}

export default AppNav