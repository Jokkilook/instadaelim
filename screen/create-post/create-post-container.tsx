import { useEffect, useState } from "react";
import CreatePostScreen from "./create-post-screen";
import * as MediaLibrary from "expo-media-library";
import { Linking } from "react-native";

export default () => {
  //0. 데이터 로딩
  const [loading, setLoading] = useState(true);
  //1. 불러온 사진 앨범 저장할 리스트
  const [album, setAlbum] = useState<MediaLibrary.Asset[]>();
  //2. 선택한 사진들 저장할 리스트
  const [mainPhotos, setMainPhotos] = useState<MediaLibrary.Asset[]>();

  const getAlbumPhotos = async () => {
    //1. 권한 설정
    const permission = await MediaLibrary.requestPermissionsAsync();
    //1-1. 권한 거부
    if (permission.status === MediaLibrary.PermissionStatus.DENIED) {
      //ㄴ 권한 승인 요청
      Linking.openSettings();
      return;
    } else if (
      permission.status === MediaLibrary.PermissionStatus.UNDETERMINED
    ) {
      await MediaLibrary.requestPermissionsAsync();
      return;
    }
    //1-2. 권한 허가
    //2. 앨범 데이터 가져오기 (개수)
    const { assets } = await MediaLibrary.getAssetsAsync({ first: 30 });
    setAlbum(assets);
    // - 선택 사진 리스트 초기값 설정
    const photo = [assets[0]];
    setMainPhotos(photo);

    //로딩 종료
    setLoading(false);
  };

  // Create Post 페이지 집입 시 "한 번" 실행 (초기화)
  //이 컨테이너 컴포넌트가 실행이 됐을 때, uesEffect 를 한 번 실행
  useEffect(() => {
    // - 사진 앨범 데이터들 가져오기
    getAlbumPhotos();
  }, []);

  return (
    <CreatePostScreen album={album} mainPhotos={mainPhotos} loading={loading} />
  );
};
