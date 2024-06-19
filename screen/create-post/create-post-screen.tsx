import {
  Alert,
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
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../../stacks/MainStack";

//기기 화면 너비 높이 구하기
// {}를 써서 Dimensions 가 반환하는 여러 값에 접근하고 :를 써서 별칭을 붙여줌
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
//라인당 위치시킬 내 앨범 이미지 개수
const numOfItemPerLine = 3;
//내가 선택한 이미지의 크기
const mainPhotoSize = WIDTH * 0.75;
//내가 선택한 이미지 왼쪽 여백

const Container = styled(View)``;

const Title = styled(Text)`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const SelectedPostScroll = styled(ScrollView)`
  background-color: white;
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

const CustomHeader = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  color: blue;
  font-size: 20px;
  margin-right: 15px;
`;

//받을 타입 props 지정
type Props = {
  album: MediaLibrary.Asset[];
  mainPhotos: MediaLibrary.Asset[];
  loading: boolean;
  updateMainPhotos: (photos: MediaLibrary.Asset[]) => void;
};

export default ({ album, mainPhotos, loading, updateMainPhotos }: Props) => {
  //네비게이션 훅
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const goToDetail = () => {
    //Move : CreatePostDetail
    //Params : mainPhotos (selected photos)
    if(mainPhotos.length==0){
      Alert.alert("Select the Image", "", [
        {
          onPress: () => {
            
          },
        },
      ]);
      return;
    }
    navigation.navigate("CreatePostDetail", { photos: mainPhotos });
  };

  //이미지가 선택되었는지?
  const isSelected = (asset: MediaLibrary.Asset) => {
    if (!mainPhotos) return;
   
    //전달 받은 asset이 mainPhotos 안에 존재한다면
    const findIndex = mainPhotos?.findIndex((photo) => {
      return photo.id === asset.id;
    });

    //a. 선택되었다 true
    if (findIndex !== -1) {
      return true;
    }
    //전달 받은 asset이 mainPhotos 안에 존재하지 않는다면
    //b. 선택안되었다. false
    else {
      return false;
    }
  };
  //이미지를 선택
  const selectPhoto = (asset: MediaLibrary.Asset) => {
    //선택한 이미지가 , 이미 내가 선택한 이미지인지 안닌지
    //-mainPhotos : 내가 선택한 이미지 리스트
    //-asset : 내가 선택한 이미지
    //-foundIndex : 만약에 같은 이미지라면 번호 할당 없으면 -1 할당
    const foundIndex = mainPhotos?.findIndex((photo) => {
      return photo === asset;
    });

    // b. 이미 선택한 이미지인 경우 (foundIndex가 존재하고, -1보다 큰 경우)
    //원래 첫번째 선택된 요소는 취소가 안됐는데 foundIndex 대신 foundIndex !== null 로 바꾸니까 작동함.
    if (foundIndex!==null && foundIndex !== -1 ) {
      // mainPhoto 이미지 삭제

      // 후 삭제 된 배열을 새롭게 갱신하여 반영
      const newRemovedPhotos = [...mainPhotos];
      newRemovedPhotos?.splice(foundIndex, 1);
      updateMainPhotos(newRemovedPhotos);
    }
    // mainPhoto 이미지 추가
    // a. 내가 선택하지 않은, 새로운 이미지인 경우,
    else {
      //mainPhoto 이미지 추가
      //기존 선택 이미지 리스트에 새로운 이미지를 (맨 마지막에) 추가
      const newPhotoList = [...mainPhotos, asset];
      updateMainPhotos(newPhotoList);
    }
  };

  //useState hook의 기능
  //1. 변화하는 value
  //2. value 저장
  //3. 화면 새로고침

  //헤더 커스텀 CSS
  useLayoutEffect(() => {
    //헤더를 변경할 수 있는 옵션을 설정해줌
    // 오른쪽 네비게이션 헤더 변경
    navigation.setOptions({
      headerRight: () => {
        return (
          <CustomHeader onPress={goToDetail}>
            <HeaderTitle>Next</HeaderTitle>
          </CustomHeader>
        );
      },
    });
  }, [mainPhotos]);

  //헤더 제외한 영역 CSS
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
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
      <Title>Recent ▼</Title>
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
                  // <View
                  //   style={{ width: 10, height: 10, backgroundColor: "black" }}
                  // />
                ) : null}
              </SelectedCircle>
            </Media>
          );
        })}
      </AlbumPhotoSCroll>
    </Container>
  );
};
