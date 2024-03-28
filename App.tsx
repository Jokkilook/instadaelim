import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screen/home';
import Detail from './screen/detail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './screen/home';
import detail from './screen/detail';
import singin from './screen/signin-screen';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='SIGNIN' component={singin}></Stack.Screen>
      <Stack.Screen name='HOME' component={home}></Stack.Screen>
      <Stack.Screen name='DETAIL' component={detail}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//stack navigation : 이동할 화면을 쌓아놓는다.
//let 재할당 o
//const 재할당 x