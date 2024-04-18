import { createStackNavigator } from "@react-navigation/stack";
import home from "../screen/home";
import detail from "../screen/detail";

//이동할 스크린 StackNavigator : type 지정
export type MainStackScreenList = {
  Home: undefined;
  Detail: undefined;
};

//StackNavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

// const : 재할당 불가 / let : 재할당 가능 / var : 재할당 가능, 선언 순서에 상관없이

export default () => {
  //Stack 안에서 이동할 스크린들 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Detail" component={detail} />
    </Stack.Navigator>
  );
};
