
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeIcon from '../assets/svg/home-icon.svg'
import SettingIcon from '../assets/svg/setting-icon.svg'

import SettingScreen from '../pages/SettingScreen';
import { HomeStackScreen } from './StackNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const index = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

          <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
          
                if (route.name === 'Home') {
                  return focused ? <HomeIcon width={25} height={25} /> : <HomeIcon width={25} height={25} />;
                } else if (route.name === 'Setting') {
                  return focused ? <SettingIcon width={35} height={35} /> :  <SettingIcon width={35} height={35} />;
                }
                
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} 
              options={({ route, navigation }) => {
              return {
                  tabBarLabel: 'Home',
                  headerShown: false,
                };
              }}
            />
            <Tab.Screen name="Setting" component={SettingScreen} />
          </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default index