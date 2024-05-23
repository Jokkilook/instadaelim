import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Image, StyleSheet, Text, View } from "react-native";
import { AuthStackScreenList } from "../stacks/AuthStack";
import * as firebase from "firebase/auth"; //cheat sheet
import { auth } from "../firebaseConfig";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MainStackScreenList } from "../stacks/MainStack";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeContainer = styled(SafeAreaView)`
  background-color: white;
`;

const Header = styled(View)`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LogoImage = styled(Image)`
  width: 150px;
  height: 30px;
`;

const AddButton = styled(TouchableOpacity)``;

const Scroll = styled(ScrollView)``;

const DUmmyItem = styled(View)`
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  background-color: orange;
`;

// https://icons.expo.fyi/Index 아이콘 가져오는 사이트
//es6f
//function : function & arrow function
export default () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const goToCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  //design screen
  return (
    <SafeContainer>
      <Header>
        <LogoImage source={require("../assets/instaDaelim_title.png")} />
        <AddButton onPress={goToCreatePost}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </AddButton>
      </Header>
      <Scroll>
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
        <DUmmyItem />
      </Scroll>
    </SafeContainer>
  );

  // //navigation hook + typescript 주로 useXXX() 로 이름지어짐
  // const navigation = useNavigation();

  // //디테일로 이동하는 함수
  // //export = public. 안써도 됌
  // const moveTo = () => {
  //   //navigation.navigate("Detail");
  // };

  // const signOut = async () => {
  //   await firebase.signOut(auth);
  // };
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
