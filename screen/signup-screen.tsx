import { useState } from "react";
import {
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
import { createUserWithEmailAndPassword } from "firebase/auth";

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

const UserName = styled(UserID)``;

const UserPW = styled(UserID)``;

const Footer = styled(View)`
  margin-top: 15px;
`;

const SignupButton = styled(TouchableOpacity)`
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

const BGImgDir = require("../assets/instaDaelim_background.jpg"); //이미지파일 저장 경로
const LogoImgDir = require("../assets/instaDaelim_title.png"); //이미지파일 저장 경로

// resizeMode 를 쓰면 이미지 비율 유지 가능

export default () => {
  //기능 코드

  //Email(ID), PW ==> state : 리액트에서 스테이트는 계속해서 변형이 되는 상태.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //onChange Text : 사용자 입력에 따라 변경된 인풋 이벤트(e)를 받아와 실행
  const onChangeText = (
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
      case "name":
        setName(inputText);
        break;
    }
  };

  //서버에 계정 정보를 보내는 함수 -파이어베이스
  //서버와 통신하기 때문에 비동기로 선언해야함
  const onSubmit = async () => {
    //계정정보
    //1.Id
    //2.Pw
    //3.Name

    name;
    email;
    password;
    console.log(`name: ${name} email: ${email} password: ${password}`);

    //파이어베이스로 보내기
    await createUserWithEmailAndPassword(auth, email, password);
  };

  //화면 디자인 코드
  return (
    <Container source={BGImgDir}>
      <SiginBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>{`Welcome! Nice to meet you\nCreate Your Account`}</Title>
        <InputField>
          <UserName
            placeholder="name"
            value={name}
            onChange={(e) => onChangeText(e, "name")}
            keyboardType="default"
            returnKeyType="done"
          />
          <UserID
            placeholder="Email"
            value={email}
            onChange={(e) => onChangeText(e, "email")}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <UserPW
            placeholder="Password"
            value={password}
            onChange={(e) => onChangeText(e, "password")}
            keyboardType="visible-password"
            returnKeyType="done"
          />
        </InputField>
        <Footer>
          <SignupButton onPress={onSubmit}>
            <SigninTitle>Sign Up</SigninTitle>
          </SignupButton>
        </Footer>
      </SiginBox>
    </Container>
  );
};
