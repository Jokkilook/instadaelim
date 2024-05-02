import { Text, View, ScrollView } from "react-native";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";

const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
const Header = styled(View)`
  height: 200px;
  bottom: -20px;
  z-index: 99;
  padding: 0px 30px;
  justify-content: flex-end;
`;
const Body = styled(View)`
  height: 500px;
  background-color: lightgrey;
`;

//es6f
//function : function & arrow function
export default () => {
  //design screen
  return (
    <ScrollBox>
      <Header>
        <ProfileInfo />
      </Header>
      <Body></Body>
    </ScrollBox>
  );
};
