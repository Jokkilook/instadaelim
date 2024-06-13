import { useEffect, useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { MainStackScreenList } from "../../stacks/MainStack";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { assetToBlob } from "../../utils/utils";

const Container = styled(View)``;

const Title = styled(Text)``;

const Information = styled(View)`
  flex-direction: row;
  padding: 15px;
`;

const Photos = styled(Image)`
  width: 120px;
  height: 120px;
  background-color: rebeccapurple;
`;

const CaptionBox = styled(View)`
  margin-left: 15px;
`;

const InputCaption = styled(TextInput)``;

const Button = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  background-color: red;
`;

// & 을 써서 네이티브스택스크린 프롭도 받으면서 내가 지정하는 것도 받을 수 있음
type Props = NativeStackScreenProps<MainStackScreenList> & {};

export default ({ route: { params } }: Props) => {
  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  //텍스트 인풋 useStateHook
  const [caption, setCaption] = useState("");
  //Create Post 화면으로부터 온 업도르 이미지 - useState Hook
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

  //텍스트 변경 함수
  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    //텍스트 받아오기
    const text = e.nativeEvent.text;
    setCaption(text);
  };

  //게시물 데이터를 파이어베이스 서버에 업로드
  const onSubmit = async () => {
    //로그인 체크
    const user = auth.currentUser;

    if (!user) return;
    //데이터 서버로 전송
    //1. 캡션
    //1-1. 도큐먼트 + 기타 데이터 추가
    const doc = await addDoc(collection(db, "posts"), {
      caption: caption,
      createAt: new Date(),
      userId: auth.currentUser?.uid,
      userName: auth.currentUser?.displayName,
      likes: [],
      comments: [],
    });
    //2. 내가 선택한 이미지
    const photoUrls = [];
    for (const photo of photos) {
      //2-2. 업로드 경로 설정
      const uploadPath = `posts/$${user.uid}/${doc.id}/${photo.id}`;
      //2-1. 스토리지에 이미지 추가
      const location = ref(storage, uploadPath);
      //2-3. 이미지 blob 데이터로 변환
      const blob = await assetToBlob(photo.uri);
      //2-4. 변환된 이미지 업로드
      const uploadResult = await uploadBytesResumable(location, blob);
      //2-5. 다운로드 url 반환
      const photoUrl = getDownloadURL(uploadResult.ref);

      photoUrls.push(photoUrl);
    }

    //1-2. 사진 업데이트
    await updateDoc(doc, { photoUrls: photoUrls });

    console.log("DONE");
  };

  //페이지 렌더될 때 params 데이터 가져오기
  useEffect(() => {
    setPhotos(params?.photos);
  }, []);

  return (
    <Container>
      <Information>
        <Photos source={{ uri: photos[0]?.uri }} />
        <CaptionBox>
          <Title>캡션</Title>
          <InputCaption
            onChange={(e) => {
              onChangeText(e);
            }}
            placeholder="Input Caption..."
            placeholderTextColor={"#B1B1B1"}
            multiline={true}
          />
        </CaptionBox>
      </Information>
      <Button onPress={onSubmit} />
    </Container>
  );
};
