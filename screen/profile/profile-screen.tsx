import { Text, View, ScrollView } from "react-native";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";
import { User } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const SignoutBtn = styled(TouchableOpacity)`
  background-color: #e1e1e1;
  border-radius: 4px;
  padding: 5px 10px;
`;

const SignoutTItle = styled(Text)`
  color: #7c7c7c;
  text-align: center;
`;

//매개변수 양이 많아지면 타입 변수를 따로 만들어서 여기에 넣어준다.
type Props = {
  user: User | null;
  onSignout: () => void;
  onEditImage: () => void;
};

//es6f
//function : function & arrow function
export default ({ user, onSignout, onEditImage }: Props) => {
  //design screen
  return (
    <ScrollBox>
      <Header>
        <ProfileInfo user={user} onEditImage={onEditImage} />
      </Header>
      <Body>
        <SignoutBtn onPress={onSignout}>
          <SignoutTItle>Sign Out</SignoutTItle>
        </SignoutBtn>
      </Body>
    </ScrollBox>
  );
};
