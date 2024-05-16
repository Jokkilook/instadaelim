import { User } from "firebase/auth";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { MyUser } from "../screen/profile/profile-container";
import { defaultImage } from "../utils/utils";

const Container = styled(View)``;
const Info = styled(View)`
  flex-direction: row;
`;
const Data = styled(View)`
  justify-content: center;
`;
const Name = styled(Text)`
  font-size: 35px;
  font-weight: bold;
`;
const Email = styled(Text)`
  font-size: 27px;
  color: #4b4b4b;
`;
const JoinDate = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  color: #4b4b4b;
`;
const ProfileImage = styled(Image)`
  width: 100px;
  height: 150px;
  margin-right: 10px;
  background-color: red;
  border-radius: 5px;
`;

const CustomButton = styled(TouchableOpacity)``;

type Props = {
  user: MyUser | undefined;
  onEditImage: () => void;
};

export default ({ user, onEditImage }: Props) => {
  return (
    <Container>
      <Info>
        <CustomButton onPress={onEditImage}>
          <ProfileImage source={defaultImage(user?.photoURL)} />
        </CustomButton>
        <Data>
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          <JoinDate>{user?.creationTime}</JoinDate>
        </Data>
      </Info>
    </Container>
  );
};
