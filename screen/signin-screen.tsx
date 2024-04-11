import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useNavigation } from "@react-navigation/native";

const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
  flex: 1;
`; //스타일 컴포넌트를 사용할 수 있는 기본 템플릿

//styled component 를 설치해서 "`"으로 쉽게  css 설정 가능 확장기능의 vscode-styled-component 로 문자열을 변수처럼 쉽게 입력할 수 있게 했

const Title = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  color: #771667;
  margin-bottom: 10px;
`;

const SiginBox = styled(View)`
  background-color: white;
  width: 80%;
  height: 60%;
  padding: 20px;
  border-radius: 30px;
`;

const LogoImg = styled(Image)`
  width: 100%;
  height: 30%;
`;
//텍스트 인풋 (id/pw)
const InputField = styled(View)`
  padding: 3px;
`;
const UserID = styled(TextInput)`
  background-color: #efeded;
  margin-bottom: 7px;
  font-size: 20px;
  padding: 5px 12px;
  border-radius: 10px;
`;
const UserPW = styled(UserID)``;

const Footer = styled(View)`
  margin-top: 15px;
`;

const SigninButton = styled(TouchableOpacity)`
  background-color: royalblue;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
`;

const SigninTitle = styled(Text)`
  color: white;
  font-size: 15px;
`;

const CreationGuide = styled(Text)`
  color: #acacac;
  text-align: center;
`;

const CreateAccount = styled(Text)`
  color: royalblue;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 10px;
`;

const ErrorMessage = styled(Text)`
  color: #f02d2d;
  font-size: 14px;
`;

const BGImgDir = require("../assets/instaDaelim_background.jpg"); //이미지파일 저장 경로
const LogoImgDir = require("../assets/instaDaelim_title.png"); //이미지파일 저장 경로

// resizeMode 를 쓰면 이미지 비율 유지 가능

export default () => {
  //기능 코드

  //Email(ID), PW ==> state : 리액트에서 스테이트는 계속해서 변형이 되는 상태.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const goToSignUp = () => navigation.navigate("SIGNUP");
  const goToHome = () => navigation.navigate("HOME");

  //onChange Text : 사용자 입력에 따라 변경된 인풋 이벤트(e)를 받아와 실행
  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string
  ) => {
    //1. 'e'에 담겨있는 사용자의 입력 텍스트를 가져온다
    const inputText = e.nativeEvent.text;

    //2. 입력 텍스트를 email, password state 에 저장한다.
    //2-1. 입력 텍스트가 email 이라면
    //2-2. 입력 텍스트가 password 라면
    switch (type) {
      case "email":
        setEmail(inputText);
        break;
      case "password":
        setPassword(inputText);
        break;
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (email === "" || password === "") {
        setError("Please input user info");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      Alert.alert("Sign in Successed!", "", [
        {
          onPress: () => {
            goToHome();
          },
        },
      ]);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
        console.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //화면 디자인 코드
  return (
    <Container source={BGImgDir}>
      <SiginBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>Welcome my Instadaelim app!!</Title>
        <InputField>
          <UserID
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e, "email")}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <UserPW
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e, "password")}
            keyboardType="visible-password"
            returnKeyType="done"
          />
          <ErrorMessage>{error}</ErrorMessage>
        </InputField>
        <Footer>
          <CreationGuide>Already have account?</CreationGuide>
          <CreateAccount onPress={goToSignUp}>Create Account</CreateAccount>
          <SigninButton onPress={onSubmit}>
            <SigninTitle>{loading ? "loading..." : "Sign in"}</SigninTitle>
          </SigninButton>
        </Footer>
      </SiginBox>
    </Container>
  );
};
