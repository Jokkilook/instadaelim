import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import detail from "./detail";
import { useContext } from "react";

//es6f
//function : function & arrow function
export default () => {
  //navigation hook 주로 useXXX() 로 이름지어짐
  const navigation = useNavigation();

  //디테일로 이동하는 함수
  //export = public. 안써도 됌
  const moveTo = () => {
    navigation.navigate("DETAIL");
  };

  //design screen
  return (
    <View style={style.container}>
      <Text>Home Screen.</Text>
      <Button title="Go to Detail" onPress={moveTo} />
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
