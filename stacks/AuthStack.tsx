import { createStackNavigator } from "@react-navigation/stack";
import signinScreen from "../screen/signin-screen";
import signupScreen from "../screen/signup-screen";

//AuthStack에서 이동할 스크린 타입
export type AuthStackScreenList = {
  SignIn: undefined;
  SignUp: undefined;
};

//StackNavigator 생성
const Stack = createStackNavigator<AuthStackScreenList>();

//Stack안에 이동할 페이지 만들어 그룹화
export default () => {
  //리액트 네이티브에서 tsx파일 하나하나가 컴포넌트이다.

  //Stack 안에 이동할 페이지 만들어 그룹화
  // -로그인 화면
  // -회원가입 화면
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={signinScreen} />
      <Stack.Screen name="SignUp" component={signupScreen} />
    </Stack.Navigator>
  );
};
