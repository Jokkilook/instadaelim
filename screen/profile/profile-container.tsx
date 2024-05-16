import { useEffect, useState } from "react";
import ProfileScreen from "./profile-screen";
import { auth, storage } from "../../firebaseConfig";
import { User, signOut, updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { assetToBlob } from "../../utils/utils";

export type MyUser = {
  name: string | null;
  email: string | null;
  creationTime: string | undefined;
  photoURL: string | null;
};

export default () => {
  // 1. 데이터를 불러오고, 가공하고, 수정한다.
  const [user, setUser] = useState<MyUser>();

  //프로필 이미지 변경 함수
  const onEditImage = async () => {
    //0. 이미지 앨범 접근 권한 설정
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //0-a 거절하면

    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      //다시 한번 권한을 설정할 수 있도록 안내 or 유도
      return Alert.alert("알림", "사진에 접근하려면 권한을 설정해주세요.", [
        {
          text: "확인",
          style: "default",
          //기기 환경 설정을 연다.
          onPress: () => Linking.openSettings(),
        },
        {},
      ]);
    } else if (
      permission.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      //다시 한번 권한 허가 알림창 열기
      return await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    //0-b 허용하면
    //1. 이미지 고르기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    //2. 이미지 고른 후 파이어베이스에 업데이트
    //2-a. 이미지가 정상적으로 선택된 경우

    if (!result.canceled && auth.currentUser != null) {
      //firebase에 저장할 위치 설정
      //1. 유저아이디
      const userId = auth.currentUser.uid;
      //2. 저장 경로
      const path = `profiles/${userId}`;
      const firebasePath = ref(storage, path);
      //firebase 업로드
      //0. 내가 선택한 이미지의 경로 가져오기
      const localUri = result.assets[0].uri;
      //1. 이미지를 blob으로 변환
      const blob = await assetToBlob(localUri);
      //2. 변환된 데이터를 firebase에 업로드
      const uploadTask = await uploadBytes(firebasePath, blob);
      //3. firebase에 업로드된 이미지의 url 가져오기
      const photoURL = await getDownloadURL(uploadTask.ref);
      //스크린에서 나의 프로필 바뀐 이미지로 새로고침
      //1. 서버에서 나의 프로필 이미지 업데이트
      //매개변수 이름과 사용되는 변수 이름이 같으면 그냥 하나만 써도 된다 var : var <=이렇게 안쓰고 var 만 써도 됌
      await updateProfile(auth.currentUser, { photoURL });
      //2. 로컬화면에서 나의 프로필 이미지 갱신
      setUser({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        creationTime: auth.currentUser.metadata.creationTime,
        photoURL,
      });
    }
    //2-b 이미지가 선택되지 않은 경우
  };

  //로그아웃 함수
  const onSingout = async () => {
    signOut(auth);
  };

  //파이어스토어에서 유저정보를 불러온다.
  const getUserData = () => {
    //a. 유저정보 로딩
    const user = auth.currentUser;
    //b. 유저정보가 있으면 유저정보 저장
    //(!user) : user 가 null이 아니면이라는 뜻
    if (user !== null) {
      setUser({
        name: user.displayName,
        email: user.email,
        creationTime: user.metadata.creationTime,
        photoURL: user.photoURL,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 2. 가공한 데이터를 Presenter에 넘겨준다.
  return (
    <ProfileScreen
      user={user}
      onSignout={onSingout}
      onEditImage={onEditImage}
    />
  );
};
