import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, StyleSheet, Text, View } from "react-native";
import { AuthStackScreenList } from "../stacks/AuthStack";
import * as firebase from "firebase/auth"; //cheat sheet
import { auth } from "../firebaseConfig";

//es6f
//function : function & arrow function
export default () => {
  //navigation hook + typescript 주로 useXXX() 로 이름지어짐
  const navigation = useNavigation();

  //디테일로 이동하는 함수
  //export = public. 안써도 됌
  const moveTo = () => {
    //navigation.navigate("DETAIL");
  };

  const signOut = async () => {
    await firebase.signOut(auth);
  };

  //design screen
  return (
    <View style={style.container}>
      <Text>Home Screen.</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

//css style
const style = StyleSheet.create({
  container: {
    // 왼 중 오 -> 가운데 정렬
    alignItems: "center",
    // 위 중 아래 -> 가운데 정렬
    justifyContent: "center",
    // 크기 : 화면 전체
    flex: 1,
    backgroundColor: "white",
  },
});
