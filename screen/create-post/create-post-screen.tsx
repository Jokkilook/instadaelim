import { Dimensions, ScrollView, Text, View } from "react-native";
import styled from "styled-components";

//기기 화면 너비 높이 구하기
// {}를 써서 Dimensions 가 반환하는 여러 값에 접근하고 :를 써서 별칭을 붙여줌
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const numOfItemPerLine = 4;

const Container = styled(View)``;

const Title = styled(Text)``;

const SelectedPostScroll = styled(ScrollView)`
  background-color: yellow;
  width: ${WIDTH}px;
  height: ${WIDTH}px;
`;

const DummySelected = styled(View)`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  background-color: blue;
`;

const AlbumPhotoSCroll = styled(ScrollView)``;

const DummyAlbum = styled(View)`
  width: ${WIDTH / numOfItemPerLine}px;
  height: ${WIDTH / numOfItemPerLine}px;

  border-width: 4px;
  background-color: purple;
`;

export default () => {
  return (
    <Container>
      <Title>Selected Photo</Title>
      <SelectedPostScroll
        horizontal={true}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <DummySelected />
        <DummySelected />
        <DummySelected />
      </SelectedPostScroll>
      <Title>Album Photo</Title>
      <AlbumPhotoSCroll
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
      </AlbumPhotoSCroll>
    </Container>
  );
};
