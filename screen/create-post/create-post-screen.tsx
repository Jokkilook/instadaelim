import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import LoadingScreen from "../loading-screen";
import { Ionicons } from "@expo/vector-icons";

//기기 화면 너비 높이 구하기
// {}를 써서 Dimensions 가 반환하는 여러 값에 접근하고 :를 써서 별칭을 붙여줌
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
//라인당 위치시킬 내 앨범 이미지 개수
const numOfItemPerLine = 3;
//내가 선택한 이미지의 크기
const mainPhotoSize = WIDTH * 0.75;
//내가 선택한 이미지 왼쪽 여백

const Container = styled(View)``;

const Title = styled(Text)``;

const SelectedPostScroll = styled(ScrollView)`
  background-color: yellow;
  width: ${WIDTH}px;
  height: ${WIDTH}px;
`;

const PhotoSelected = styled(View)`
  width: ${mainPhotoSize}px;
  height: ${mainPhotoSize}px;
  margin-right: 10px;
`;

const PhotoSelectedImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AlbumPhotoSCroll = styled(ScrollView)``;

const Media = styled(TouchableOpacity)`
  width: ${WIDTH / numOfItemPerLine}px;
  height: ${WIDTH / numOfItemPerLine}px;

  border-width: 1px;
`;

const AlbumImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

//선택되었는지 여부를 나타내는 circle
const SelectedCircle = styled(View)`
  background-color: white;
  border-radius: 100px;
  border-width: 0.5px;
  position: absolute;
  width: 25%;
  height: 25%;
  right: 0px;
  margin: 5px;
  justify-content: center;
  align-items: center;
`;

//받을 타입 props 지정
type Props = {
  album: MediaLibrary.Asset[] | undefined;
  mainPhotos: MediaLibrary.Asset[] | undefined;
  loading: boolean;
};

export default ({ album, mainPhotos, loading }: Props) => {
  //이미지가 선택되었는지?
  const isSelected = (asset: MediaLibrary.Asset) => {
    if (!mainPhotos) return;
    //전달 받은 asset이 mainPhotos 안에 존재한다면
    const findIndex = mainPhotos?.findIndex((photo) => {
      return photo.id === asset.id;
    });

    //a. 선택되었다 true
    if (findIndex > -1) {
      return true;
    }
    //전달 받은 asset이 mainPhotos 안에 존재하지 않는다면
    //b. 선택안되었다. false
    else {
    }
  };
  //이미지를 선택
  const selectPhoto = (asset: MediaLibrary.Asset) => {
    // a. 내가 선택하지 않은, 새로운 이미지인 경우,
    // mainPhoto 이미지 추가
    // b. 이미 선택한 이미지인 경우
    // mainPhoto 이미지 삭제
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Title>Selected Photo</Title>
      <SelectedPostScroll
        horizontal={true}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {mainPhotos?.map((selected) => {
          return (
            <PhotoSelected>
              <PhotoSelectedImage source={{ uri: selected.uri }} />
            </PhotoSelected>
          );
        })}
      </SelectedPostScroll>
      <Title>Album Photo</Title>
      <AlbumPhotoSCroll
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {album?.map((asset) => {
          //에셋이 선택된 상태인지?
          const result = isSelected(asset);
          return (
            <Media onPress={() => selectPhoto(asset)}>
              <AlbumImage source={{ uri: asset.uri }} />
              <SelectedCircle>
                {result ? (
                  <Ionicons name="checkmark-outline" size={25} />
                ) : null}
              </SelectedCircle>
            </Media>
          );
        })}
      </AlbumPhotoSCroll>
    </Container>
  );
};
