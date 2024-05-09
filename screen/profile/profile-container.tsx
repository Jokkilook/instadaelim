import { useEffect, useState } from "react";
import ProfileScreen from "./profile-screen";
import { auth } from "../../firebaseConfig";
import { User, signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export default () => {
  // 1. 데이터를 불러오고, 가공하고, 수정한다.
  const [user, setUser] = useState<User | null>(null);

  //프로필 이미지 변경 함수
  const onEditImage = async () => {
    //0. 이미지 앨범 접근 권한 설정
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //0-a 거절하면

    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      //다시 한번 권한을 설정할 수 있도록 안내 or 유도
      Alert.alert("알림", "사진에 접근하려면 권한을 설정해주세요.", [
        {
          text: "확인",
          style: "default",
          onPress: () => Linking.openSettings(),
        },
        {},
      ]);
    } else if (
      permission.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      //다시 한번 권한 허가 알림창 열기
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    //0-b 허용하면
    //1. 이미지 고르기
    //2. 이미지 고른 후 파이어베이스에 업데이트
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
      setUser(user);
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
