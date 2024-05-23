import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../screen/home";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screen/profile";

//Tab 에서 이동 가능한 화면 리스트
type TabStackList = {
  Main: undefined;
  Profile: undefined;
};

const Stack = createBottomTabNavigator<TabStackList>();

export default () => {
  //페이지 이름에 따라 아이콘 이름 반환
  const getIconName = (pageName: keyof TabStackList) => {
    switch (pageName) {
      //메인
      case "Main":
        return "apps-sharp";
      //프로필
      case "Profile":
        return "person";
      //기타
      default:
        return "alert-circle";
    }
  };

  return (
    <Stack.Navigator
      //()=>({}) 는
      screenOptions={(route) => ({
        tabBarIcon: ({ focused }) => {
          const pageName = route.route.name;
          const iconName = getIconName(pageName);
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? "#1274f4" : "darkgrey"}
            />
          );
        },
        tabBarActiveTintColor: "#1274f4",
        tabBarInactiveTintColor: "darkgrey",
      })}
    >
      <Stack.Screen
        name="Main"
        component={home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
