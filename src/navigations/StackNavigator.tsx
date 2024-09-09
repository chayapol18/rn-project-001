
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../pages/HomeScreen';
import AboutScreen from '../pages/AboutScreen';
import TodoListScreen from '../pages/TodoListScreen';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator 
      initialRouteName="Home"
      // screenOptions={({ route, navigation }) => {

      // }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="About" component={AboutScreen} options={{ headerBackVisible: false}} />
      <HomeStack.Screen 
        name="TodoList" 
        component={TodoListScreen} 
        options={({ route, navigation }) => {
          return {
            headerShown: false,
          };
        }}
      />
    </HomeStack.Navigator>
  )
}