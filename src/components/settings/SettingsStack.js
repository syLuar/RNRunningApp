import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../home/ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import EmergencyContactScreen from './EmergencyContactScreen';
import TermsAndConditionsScreen from '../login/TermsAndConditionsScreen'

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="profile" 
                options={{ headerShown: false }} 
                component={ProfileScreen} 
            />
            <Stack.Screen 
                name="Edit" 
                options={{ headerTitle: "" }} 
                component={EditProfileScreen} 
            />
            <Stack.Screen 
                name="Change" 
                options={{ headerTitle: "" }} 
                component={ChangePasswordScreen} 
            />
            <Stack.Screen 
                name="Emergency" 
                options={{ headerTitle: "" }} 
                component={EmergencyContactScreen} 
            />
            <Stack.Screen 
                name="Terms" 
                options={{ headerTitle: "" }} 
                component={TermsAndConditionsScreen} 
            />
        </Stack.Navigator>
    )
}

export default SettingsStack;
