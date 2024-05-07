import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"; 

// Screens
import AnalysisScreen from "./AnalysisScreen";
import EventsScreen from "./EventsScreen";
import PlansScreen from "./PlansScreen";
import SettingsStack from "../settings/SettingsStack";
import RoutesScreen from "./RoutesScreen";

// Screen Names
const analysisName = "Analysis"
const plansName = "Plans"
const routesName = "Routes"
const eventsName = "Events"
const profileName = "Profile"

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
      <Tab.Navigator 
          initialRouteName={routesName}
          screenOptions={({ route }) => ({
              "headerShown": false,
              "tabBarActiveTintColor": "#885ad1",
              "tabBarInactiveTintColor": "grey",
              "tabBarLabelStyle": {
                  "fontSize": 10,
                  top:10
              },
              "tabBarStyle": [
                  {
                      display: "flex",
                      position: "absolute",
                      paddingTop:15,
                      bottom: 25,
                      left: 20,
                      right: 20,
                      elevation: 0,
                      borderRadius: 25,
                      height: 90,
                      backgroundColor: "#262626",
                      borderColor: "#cfcfcf",
                      borderWidth: 1
                  },
                  null
              ],
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
    
                if (rn === plansName) {
                  iconName = focused ? 'accessibility' : 'accessibility-outline';
                } else if (rn === analysisName) {
                  iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                } else if (rn === routesName) {
                  iconName = focused ? 'map' : 'map-outline';
                } else if (rn === eventsName) {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (rn === profileName) {
                  iconName = focused ? 'person' : 'person-outline';
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
              },
          })}
      >
          <Tab.Screen name={analysisName} component={AnalysisScreen}/>
          <Tab.Screen name={routesName} component={RoutesScreen}/>
          <Tab.Screen name={profileName} component={SettingsStack}/>
      </Tab.Navigator>

    )
}

export default AppStack