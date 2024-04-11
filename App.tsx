import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screen/home";
import Detail from "./screen/detail";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import home from "./screen/home";
import detail from "./screen/detail";
import signin from "./screen/signin-screen";
import signup from "./screen/signup-screen";
import "react-native-gesture-handler";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  //user info
  const [user, setUser] = useState();

  //App.tsx가 실행될 때 with useEffect 훅 사용
  useEffect(() => {
    //유저가 로그인 되었는지 안되었는지, 항시 체크
    auth.onAuthStateChanged((userState) => {
      //로그인 여부에 따라 그룹을 각각 보여줌
      //a. 로그인 되어있음
      if (userState) {
        setUser(userState);
      }
      //b. 로그인 안되어있음
      else {
        setUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {/* 현재 로그인된 유저가 존재하는 경우 ? 메인화면 그룹 : 인증화면 그룹*/}

      {auth.currentUser ? (
        <Stack.Navigator>
          <Stack.Screen name="SIGNIN" component={signin}></Stack.Screen>
          <Stack.Screen name="SIGNUP" component={signup}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="HOME" component={home}></Stack.Screen>
          <Stack.Screen name="DETAIL" component={detail}></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//stack navigation : 이동할 화면을 쌓아놓는다.
//let 재할당 o
//const 재할당 x
