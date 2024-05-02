import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

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
const JoinDate = styled(Text)`
  font-size: 20px;
  font-weight: 400;
`;
const ProfileImage = styled(Image)`
  width: 100px;
  height: 150px;
  margin-right: 10px;
  background-color: red;
  border-radius: 5px;
`;

const CustomButton = styled(TouchableOpacity)``;

export default () => {
  return (
    <Container>
      <Info>
        <CustomButton>
          <ProfileImage source={require("../assets/splash.png")} />
        </CustomButton>
        <Data>
          <Name>끼룩</Name>
          <JoinDate>2024. 12. 14</JoinDate>
        </Data>
      </Info>
    </Container>
  );
};
