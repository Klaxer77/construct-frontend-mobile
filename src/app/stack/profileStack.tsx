import ProfileScreen from "@/screens/profileStackScreens/profileScreen/profileScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="profileMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ gestureEnabled: false }} name="profileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
};