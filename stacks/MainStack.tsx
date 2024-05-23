import { createStackNavigator } from "@react-navigation/stack";
import home from "../screen/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./Tabs";
import createPost from "../screen/create-post";

//이동할 스크린 StackNavigator : type 지정
export type MainStackScreenList = {
  Tabs: undefined;
  CreatePost: undefined;
};

//StackNavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

//BottomTabNavigator 사용
//const Stack = createBottomTabNavigator<MainStackScreenList>();

// const : 재할당 불가 / let : 재할당 가능 / var : 재할당 가능, 선언 순서에 상관없이

export default () => {
  //Stack 안에서 이동할 스크린들 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"CreatePost"} component={createPost} />
    </Stack.Navigator>
  );
};
