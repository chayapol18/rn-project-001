/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import tw from 'twrnc';

import { useRecoilState, useRecoilValue } from 'recoil';
// import { userData } from '../store';/
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../store/userDataSlice'
import type { RootState } from '../store'

const { height, width } = Dimensions.get('window');

const HomeScreen = ({navigation}: any) =>{
  // const [value, setValue] = useRecoilState(userData);
  const user = useSelector((state: RootState) => state.user)
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          padding: width * 0.04267,
        }}>
          {/* <Text style={tw`text-black font-bold text-[28px]`}>Home</Text> */}
          <View style={tw`pb-3`}>
            <Text>This is test application</Text>
            <Text>create by {user.name}, age : {user.age}</Text>
          </View>
          <TouchableOpacity 
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: width * 0.02133,
              alignItems: "center",
              marginVertical: width * 0.03200
            }}
          >
            <View>
              <Text>Custom button</Text>
            </View>
          </TouchableOpacity>
          <View style={{
            marginBottom: width * 0.03200
          }}>
            <Button
              title="Go to About page"
              onPress={() => navigation.navigate('About', { name: "Leo" })}
            ></Button>
          </View>
          <Button
            title="Go to Todo list page"
            onPress={() => navigation.navigate('TodoList', { name: "Leo" })}
          ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
