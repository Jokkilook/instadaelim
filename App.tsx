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
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import * as firebase from "firebase/auth";
import LoadingScreen from "./screen/loading-screen";

const Stack = createStackNavigator();

export default function App() {
  //user info
  const [user, setUser] = useState<firebase.User | null>();
  //loading state
  const [loading, setLoading] = useState(true);

  //userEffect의 라이프사이클
  // 1. 화면이 맨 처음 표시될 때 1번
  // 2. 화면이 닫힐 때 1번
  // 3. 특정 조건이 변경될 때마다 매번.
  // 위 셋중 1번(1은 default이기 때문)은 항상(required) 2,3번은 optional 이다.

  //App.tsx가 실행될 때 with useEffect 훅 사용
  useEffect(() => {
    //유저가 로그인 되었는지 안되었는지, 항시 체크 // | 는 왼편이 null일때 오른편 할당
    auth.onAuthStateChanged((userState: firebase.User | null) => {
      console.log("1. 앱이 실행됨.");
      //로그인 여부에 따라 그룹을 각각 보여줌
      //a. 로그인 되어있음
      if (userState) {
        console.log("2-1. 로그임 됨");
        setUser(userState);
      }
      //b. 로그인 안되어있음
      else {
        console.log("2-2. 로그인 안됨");
        setUser(null);
      }
      //로그인 여부 파악 끝나면 로딩 off
      setLoading(false);
    });
  }, []);

  const loadingProgress = <LoadingScreen />;
  const authProcess = auth.currentUser ? <MainStack /> : <AuthStack />;

  return (
    //Main스택은 로그인 된 상태의 이동할 스크린 모음
    //Auth스택은 로그인 안된 상태의 이동할 스크린 모음
    <NavigationContainer>
      {/* 현재 로그인된 유저가 존재하는 경우 ? 메인화면 그룹 : 인증화면 그룹*/}
      {loading ? loadingProgress : authProcess}
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
